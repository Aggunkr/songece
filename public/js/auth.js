async function login(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'index.html';
    } else {
      alert(data.msg || 'Giriş yapılamadı');
    }
  } catch (err) {
    alert('Hata oluştu: ' + err.message);
  }
}

async function register(event) {
  event.preventDefault();
  const username = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.msg || 'Kayıt başarılı');
      window.location.href = 'login.html';
    } else {
      alert(data.msg || 'Kayıt yapılamadı');
    }
  } catch (err) {
    alert('Hata oluştu: ' + err.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) loginForm.addEventListener('submit', login);
  const registerForm = document.getElementById('registerForm');
  if (registerForm) registerForm.addEventListener('submit', register);
});
