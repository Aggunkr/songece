async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const products = await res.json();
    const container = document.getElementById('product-list');
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.imageUrl}" alt="${p.name}" class="product-image">
        <div class="p-4">
          <h3 class="font-semibold text-lg">${p.name}</h3>
          <p class="mt-2 font-bold">${p.price} ₺</p>
          <a href="product.html?id=${p._id}" class="btn-primary mt-4 inline-block">Detay</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (e) {
    console.error(e);
  }
}
document.addEventListener('DOMContentLoaded', loadProducts);