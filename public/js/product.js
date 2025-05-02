const API = 'https://aggun-ecommerce-api.onrender.com';
async function loadDetail(){
  const id = new URLSearchParams(location.search).get('id');
  const res = await fetch(`${API}/api/products/${id}`);
  const p = await res.json();
  document.getElementById('productDetail').innerHTML = `
    <div class="row">
      <div class="col-md-6"><img src="${p.imageUrl}" class="img-fluid" alt=""></div>
      <div class="col-md-6">
        <h2>${p.name}</h2><p>${p.description}</p><h4>${p.price}₺</h4>
        <button class="btn btn-primary" onclick="addToCart('${p._id}')">Sepete Ekle</button>
      </div>
    </div>`;
}
loadDetail();
