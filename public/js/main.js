document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  const links = ['Login','Register','Logout','Cart','Fav','Profile','Admin'];
  const els = {};
  links.forEach(l => els[l] = document.getElementById('nav' + l));
  function show(el) { if(el) el.style.display = 'inline-block'; }
  function hide(el) { if(el) el.style.display = 'none'; }

  if (token) {
    hide(els.Login); hide(els.Register);
    show(els.Logout); show(els.Cart); show(els.Fav); show(els.Profile);
    try {
      const res = await fetch('/api/users/profile', { headers: { 'Authorization': 'Bearer ' + token } });
      const data = await res.json();
      if (res.ok && data.role === 'admin') show(els.Admin);
      else hide(els.Admin);
    } catch { hide(els.Admin); }
  } else {
    show(els.Login); show(els.Register);
    hide(els.Logout); hide(els.Cart); hide(els.Fav); hide(els.Profile); hide(els.Admin);
  }

  if (els.Logout) els.Logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});
