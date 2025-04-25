const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let orders = [];

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/views/admin.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.emit('allOrders', orders); // Send all current orders to the admin when they connect.

  socket.on('placeOrder', (orderData) => {
    orders.push(orderData);
    io.emit('newOrder', orderData); // Notify the admin about the new order
  });

  socket.on('updateStatus', (statusData) => {
    orders = orders.map(order => {
      if (order.id === statusData.id) {
        order.status = statusData.status;
      }
      return order;
    });
    io.emit('statusUpdate', statusData); // Send status update to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
