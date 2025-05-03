document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  document.querySelectorAll('#login-link, #register-link').forEach(el => el.classList.toggle('hidden', !!token));
  document.getElementById('profile-link').classList.toggle('hidden', !token);
});