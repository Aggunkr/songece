const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const token = localStorage.getItem('token');

async function loadDetail() {
  const res = await fetch(`/api/products/${id}`);
  const p = await res.json();
  document.getElementById('product-detail').innerHTML = `
    <h2>${p.name}</h2><p>${p.price} ₺</p><img src="${p.imageUrl}">
  `;
}

async function addToCart() {
  if (!token) return alert('Lütfen giriş yapın.');
  await fetch('/api/cart', {
    method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization': token },
    body: JSON.stringify({ productId: id })
  });
  alert('Sepete eklendi');
}

async function addToFav() {
  if (!token) return alert('Lütfen giriş yapın.');
  await fetch('/api/favorites', {
    method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization': token },
    body: JSON.stringify({ productId: id })
  });
  alert('Favorilere eklendi');
}

async function loadComments() {
  const res = await fetch(`/api/products/${id}/comments`);
  const comments = await res.json();
  const ul = document.getElementById('comments-list');
  comments.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.user}: ${c.text}`;
    ul.appendChild(li);
  });
}

async function postComment() {
  if (!token) return alert('Lütfen giriş yapın.');
  const text = document.getElementById('comment-input').value;
  await fetch(`/api/products/${id}/comments`, {
    method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization': token },
    body: JSON.stringify({ text })
  });
  loadComments();
}

document.addEventListener('DOMContentLoaded', () => {
  loadDetail();
  loadComments();
  document.getElementById('add-cart').onclick = addToCart;
  document.getElementById('add-fav').onclick = addToFav;
  document.getElementById('post-comment').onclick = postComment;
});
