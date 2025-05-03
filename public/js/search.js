document.getElementById('search-btn')?.addEventListener('click',async()=>{
  const q=document.getElementById('search-input').value;
  const res=await fetch('/api/products?search='+encodeURIComponent(q));
  const products=await res.json();
  const container=document.getElementById('search-results'); container.innerHTML='';
  products.forEach(p=>{
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
});