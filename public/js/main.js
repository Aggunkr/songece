// public/js/main.js

// Basit DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Örneğin ana sayfada özel bir animasyon ekleyebilirsiniz.
    const hero = document.querySelector('.hero h1');
    if (hero) {
      setTimeout(() => {
        hero.classList.add('animate__animated', 'animate__fadeInDown');
      }, 300);
    }
  });
  