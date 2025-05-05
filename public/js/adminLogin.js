document.getElementById('adminLoginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ username: email, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      // check role
      const profile = await fetch('/api/users/profile', {
        headers: {'Authorization': 'Bearer ' + data.token}
      });
      const info = await profile.json();
      if (profile.ok && info.role === 'admin') {
        window.location.href = 'admin_panel.html';
      } else {
        alert('Yönetici yetkiniz yok.');
        localStorage.removeItem('token');
      }
    } else {
      alert(data.msg || 'Giriş başarısız');
    }
  } catch(err) {
    alert('Hata: ' + err.message);
  }
});