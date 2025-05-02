const API = 'https://aggun-ecommerce-api.onrender.com';
async function loadOrders(){
  const token=localStorage.getItem('token');
  const res=await fetch(`${API}/api/orders`,{headers:{'Authorization':'Bearer '+token}});
  const list=await res.json();
  document.getElementById('orderList').innerHTML = list.map(o=>`
    <div class="list-group-item">
      #${o._id} — ${new Date(o.createdAt).toLocaleString()} — ${o.total}₺
    </div>`).join('');
}
loadOrders();
