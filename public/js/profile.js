const token = localStorage.getItem('token');
if (!token) location.href = 'login.html';

async function loadProfile() {
  const res = await fetch('/api/users/profile', { headers:{ Authorization: token } });
  const u = await res.json();
  document.getElementById('fullname').textContent = u.name;
  document.getElementById('email').textContent = u.email;
  document.getElementById('address').value = u.address || '';
}

async function saveAddress() {
  const address = document.getElementById('address').value;
  await fetch('/api/users/profile/address', {
    method:'PUT', headers:{ 'Content-Type':'application/json', 'Authorization': token },
    body: JSON.stringify({ address })
  });
  alert('Adres kaydedildi');
}

async function loadOrders() {
  const res = await fetch('/api/orders', { headers:{ Authorization: token } });
  const orders = await res.json();
  const ul = document.getElementById('order-list');
  orders.forEach(o => {
    const li = document.createElement('li');
    li.textContent = `${new Date(o.createdAt).toLocaleDateString()} - ${o.items.length} ürün`;
    ul.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  loadOrders();
  document.getElementById('save-address').onclick = saveAddress;
});
