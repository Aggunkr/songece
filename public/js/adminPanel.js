document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }
  // verify role
  const prof = await fetch('/api/users/profile', { headers: {'Authorization':'Bearer '+token} });
  const info = await prof.json();
  if (!(prof.ok && info.role==='admin')) {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    return;
  }
  
  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });

  // Product form
  document.getElementById('productForm').addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', document.getElementById('prodName').value);
    formData.append('price', document.getElementById('prodPrice').value);
    const fileInput = document.getElementById('prodImage');
    if (fileInput.files[0]) {
      formData.append('image', fileInput.files[0]);
    }
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token },
      body: formData
    });
    const data = await res.json();
    document.getElementById('prodMsg').textContent = res.ok ? 'Ürün eklendi.' : (data.msg || 'Hata');
  });
    const data = await res.json();
    document.getElementById('prodMsg').textContent = res.ok ? 'Ürün eklendi.' : (data.msg || 'Hata');
  });

  // Load users
  document.getElementById('loadUsers').addEventListener('click', async () => {
    const res = await fetch('/api/admin/users', {
      headers: {'Authorization':'Bearer '+token}
    });
    const data = await res.json();
    document.getElementById('usersOutput').textContent = res.ok ? JSON.stringify(data, null, 2) : (data.msg || 'Hata');
  });
});