document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';
  const res = await fetch('/api/cart', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const { items } = await res.json();
  const list = document.getElementById('cartItems');
  list.innerHTML = '';
  items.forEach(i => {
    const div = document.createElement('div');
    div.textContent = `${i.product.name} - ${i.quantity} adet`;
    const btn = document.createElement('button');
    btn.textContent = 'Kaldır';
    btn.addEventListener('click', async () => {
      const r = await fetch('/api/cart/' + i.product._id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (r.ok) div.remove();
      else alert('Silinemedi');
    });
    div.appendChild(btn);
    list.appendChild(div);
  });
});
