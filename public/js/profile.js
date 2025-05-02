const API = 'https://aggun-ecommerce-api.onrender.com';
async function loadProfile(){
  const token=localStorage.getItem('token');
  const res=await fetch(`${API}/api/users/profile`,{headers:{'Authorization':'Bearer '+token}});
  const u=await res.json();
  const f=document.getElementById('profileForm');
  f.username.value=u.username; f.email.value=u.email;
}
document.getElementById('profileForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const token=localStorage.getItem('token');
  const res=await fetch(`${API}/api/users/profile`,{
    method:'PUT',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
    body:JSON.stringify({ username:e.target.username.value,email:e.target.email.value,password:e.target.password.value})
  });
  alert((await res.json()).msg||'Güncellendi');
});
loadProfile();
