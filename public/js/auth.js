const API = 'https://aggun-ecommerce-api.onrender.com';
document.getElementById('loginForm')?.addEventListener('submit', async e => {
  e.preventDefault();
  const res = await fetch(`${API}/api/auth/login`, {
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ email:e.target.email.value, password:e.target.password.value })
  });
  const data = await res.json();
  if(data.token){ localStorage.setItem('token',data.token); location.href='index.html'; }
  else alert(data.msg||'Hata');
});
document.getElementById('registerForm')?.addEventListener('submit',async e=>{
  e.preventDefault();
  const res=await fetch(`${API}/api/auth/register`,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({ username:e.target.username.value,email:e.target.email.value,password:e.target.password.value })
  });
  const data=await res.json();
  alert(data.msg||'Hata'); if(data.msg==='Kayıt başarılı') location.href='login.html';
});
