
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const cartCount = document.getElementById('cart-count');

  if (token) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    fetch('/api/cart', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    .then(res => res.json())
    .then(data => {
      cartCount.textContent = data.items.length;
    });
  } else {
    logoutBtn.style.display = 'none';
  }

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.reload();
  });
});
