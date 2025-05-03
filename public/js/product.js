const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const token = localStorage.getItem('token');
async function loadDetail() {
  const res = await fetch(`/api/products/${id}`);
  const p = await res.json();
  const stars = '★'.repeat(p.rating||0) + '☆'.repeat(5-(p.rating||0));
  document.getElementById('product-detail').innerHTML = `
    <h2 class="text-2xl font-bold mb-2">${p.name}</h2>
    <img src="${p.imageUrl}" alt="${p.name}" class="w-full h-64 object-cover rounded-lg mb-4">
    <p class="text-xl font-semibold">${p.price} ₺</p>
    <p class="mt-2">${stars}</p>
    <p class="mt-4">${p.description||''}</p>
  `;
}
async function loadComments() {
  const res = await fetch(`/api/reviews/${id}`);
  const comments = await res.json();
  const ul = document.getElementById('comments-list'); ul.innerHTML='';
  comments.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.user}: ${c.text}`;
    ul.appendChild(li);
  });
}
async function addToCart() {
  if(!token) return alert('Giriş yapın');
  await fetch('/api/cart',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({productId:id})});
  alert('Sepete eklendi'); loadDetail();
}
async function addToFav() {
  if(!token) return alert('Giriş yapın');
  await fetch('/api/favorites',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({productId:id})});
  alert('Favorilere eklendi');
}
async function postComment() {
  if(!token) return alert('Giriş yapın');
  const text = document.getElementById('comment-input').value;
  await fetch(`/api/reviews/${id}`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({text})});
  document.getElementById('comment-input').value=''; loadComments();
}
document.addEventListener('DOMContentLoaded', () => {
  loadDetail(); loadComments();
  document.getElementById('add-cart').onclick=addToCart;
  document.getElementById('add-fav').onclick=addToFav;
  document.getElementById('post-comment').onclick=postComment;
});