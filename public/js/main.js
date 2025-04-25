const socket = io();
const orderForm = document.getElementById('orderForm');
const confirmation = document.getElementById('confirmation');

orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const item = document.getElementById('item').value;
  const quantity = document.getElementById('quantity').value;
  
  const orderData = { id: new Date().getTime(), item, quantity, status: 'New' };
  
  socket.emit('placeOrder', orderData);
  
  confirmation.innerHTML = `<div class="alert alert-success">Your order for ${item} (Qty: ${quantity}) has been placed successfully!</div>`;
  orderForm.reset();
});
