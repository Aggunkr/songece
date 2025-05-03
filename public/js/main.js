document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  document.querySelectorAll('#login-link, #register-link').forEach(el => el.classList.toggle('hidden', !!token));
  document.getElementById('profile-link').classList.toggle('hidden', !token);
  document.getElementById('cart-link').classList.toggle('hidden', !token);
  document.getElementById('favorites-link').classList.toggle('hidden', !token);
  // cart count
  if (token) {
    fetch('/api/cart', { headers: { Authorization: token } })
      .then(r => r.json()).then(c => {
        const count = c.items.reduce((s,i)=>s+i.quantity,0);
        document.getElementById('cart-count').textContent = count;
      });
  }
});