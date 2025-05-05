document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = 'login.html';
  const res = await fetch('/api/favorites', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const { favorites } = await res.json();
  const list = document.getElementById('favItems');
  list.innerHTML = '';
  favorites.forEach(fav => {
    const div = document.createElement('div');
    div.textContent = fav.product.name;
    const btn = document.createElement('button');
    btn.textContent = 'Kaldır';
    btn.addEventListener('click', async () => {
      const r = await fetch('/api/favorites/' + fav.product._id, {
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
