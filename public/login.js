
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/users/login', {
    method: 'POST', headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    if (data.role === 'admin' || data.isAdmin) window.location.href = '/public/admin_panel.html';
    else window.location.href = '/public/index.html';
  } else {
    alert(data.msg || 'Giriş başarısız');
  }
});
