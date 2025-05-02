const API = 'https://aggun-ecommerce-api.onrender.com';
async function loadProducts(){
  const res=await fetch(`${API}/api/products`);
  const list=await res.json();
  document.getElementById('productList').innerHTML=list.map(p=>`
    <div class="col-md-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.imageUrl}" class="card-img-top" alt="">
        <div class="card-body d-flex flex-column">
          <h5>${p.name}</h5>
          <p class="flex-grow-1">${p.description}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="text-primary fs-5">${p.price}₺</span>
            <button class="btn btn-sm btn-outline-primary" onclick="addToCart('${p._id}')">Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>`).join('');
}
function addToCart(id){
  const token=localStorage.getItem('token');
  fetch(`${API}/api/cart`,{
    method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body:JSON.stringify({ productId:id, quantity:1 })
  }).then(r=>r.json()).then(a=>alert(a.msg||'Eklendi'));
}
loadProducts();
