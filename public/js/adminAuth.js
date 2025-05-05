document.getElementById('loadUsers').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  const res = await fetch('/api/admin/users', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const data = await res.json();
  if (res.ok) {
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  } else {
    alert(data.message || 'Kullanıcılar yüklenemedi');
  }
});

document.getElementById('addProduct').addEventListener('click', async () => {
  const token = localStorage.getItem('token');
  const product = { name: 'Yeni Ürün', price: 0 };
  const res = await fetch('/api/admin/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    body: JSON.stringify(product)
  });
  const data = await res.json();
  if (res.ok) {
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  } else {
    alert(data.message || 'Ürün eklenemedi');
  }
});