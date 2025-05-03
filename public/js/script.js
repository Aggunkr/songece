// Sayfa yüklendiğinde çalışacak kodlar
document.addEventListener("DOMContentLoaded", () => {
    // Ürünlerin sepete eklenmesi için örnek bir kod
    const addButtons = document.querySelectorAll(".product-item button");
  
    addButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        alert("Ürün sepete eklendi! (Örnek işlem.)");
      });
    });
  });
  