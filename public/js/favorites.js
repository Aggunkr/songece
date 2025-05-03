const token = localStorage.getItem('token');
if(!token){alert('Giriş yapın'); location.href='login.html';}
async function loadFavorites() {
  const res = await fetch('/api/favorites',{headers:{Authorization:token}});
  const favs = await res.json();
  const container = document.getElementById('favorites-list'); container.innerHTML='';
  favs.forEach(p=>{
    const card=document.createElement('div'); card.className='product-card';
    card.innerHTML=`
      <img src="${p.imageUrl}" class="product-image">
      <div class="p-4">
        <h3>${p.name}</h3>
        <p>${p.price} ₺</p>
        <a href="product.html?id=${p._id}" class="btn-primary bg-blue-600 text-white hover:bg-blue-700">Detay</a>
      </div>
    `;
    container.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded',loadFavorites);