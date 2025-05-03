async function loadProducts() {
  let url = '/api/products';
  const filter = document.getElementById('filter-input')?.value;
  const sort = document.getElementById('sort-select')?.value;
  const params = new URLSearchParams();
  if(filter) params.append('filter', filter);
  if(sort) params.append('sort', sort);
  if(params.toString()) url += '?' + params.toString();
  const res = await fetch(url);
  const products = await res.json();
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.imageUrl}" alt="${p.name}" class="product-image">
      <div class="p-4">
        <h3>${p.name}</h3>
        <p>${p.price} ₺</p>
        <a href="product.html?id=${p._id}" class="btn-primary bg-blue-600 text-white hover:bg-blue-700">Detay</a>
      </div>
    `;
    container.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  document.getElementById('filter-input')?.addEventListener('input', loadProducts);
  document.getElementById('sort-select')?.addEventListener('change', loadProducts);
});