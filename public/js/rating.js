document.addEventListener('DOMContentLoaded', () => {
  const prodElem = document.getElementById('product-detail');
  if (!prodElem) return;
  const productId = prodElem.dataset.id;
  const starsEl = document.getElementById('stars');
  let selectedScore = 0;

  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.dataset.value = i;
    star.textContent = '☆';
    star.style.fontSize = '2rem';
    star.style.cursor = 'pointer';
    star.addEventListener('click', () => {
      selectedScore = i;
      updateStars();
    });
    starsEl.appendChild(star);
  }

  function updateStars() {
    document.querySelectorAll('#stars .star').forEach(s => {
      s.textContent = (s.dataset.value <= selectedScore) ? '★' : '☆';
    });
  }

  fetch(`/api/rating/${productId}`)
    .then(res => res.json())
    .then(({ avgScore, count }) => {
      document.getElementById('avg-score').textContent = avgScore.toFixed(1);
      document.getElementById('rating-count').textContent = count;
    });

  document.getElementById('submit-rating').addEventListener('click', () => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login.html';
    if (!selectedScore) return alert('Lütfen bir puan seçin!');
    fetch('/api/rating', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ productId, score: selectedScore })
    })
    .then(res => res.json())
    .then(({ avgScore, count }) => {
      document.getElementById('avg-score').textContent = avgScore.toFixed(1);
      document.getElementById('rating-count').textContent = count;
      alert('Puanınız kaydedildi!');
    });
  });
});
