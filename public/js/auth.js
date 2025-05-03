// auth.js — login & register handling
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/auth/login', {
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if(data.token) {
    localStorage.setItem('token', data.token);
    location.href = 'index.html';
  } else {
    alert(data.message);
  }
}

async function register() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/auth/register', {
    method:'POST', headers:{ 'Content-Type':'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await res.json();
  if(data.user) {
    alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
    location.href = 'login.html';
  } else {
    alert(data.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  if(loginBtn) loginBtn.onclick = login;
  if(registerBtn) registerBtn.onclick = register;
});
