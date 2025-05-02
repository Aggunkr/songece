const API = 'https://aggun-ecommerce-api.onrender.com';
async function loadCart(){
  const token=localStorage.getItem('token');
  const res=await fetch(`${API}/api/cart`,{headers:{'Authorization':'Bearer '+token}});
  const items=await res.json();
  const list=items.map(i=>`
    <div class="list-group-item d-flex justify-content-between">
      ${i.product.name} x ${i.quantity}
      <span>${i.product.price * i.quantity}₺</span>
    </div>`).join('');
  document.getElementById('cartItems').innerHTML = list;
}
document.getElementById('checkoutBtn').addEventListener('click',async()=>{
  const token=localStorage.getItem('token');
  const res=await fetch(`${API}/api/orders`,{method:'POST',headers:{'Authorization':'Bearer '+token}});
  const data=await res.json();
  alert(data.msg||'Sipariş oluşturuldu');
});
loadCart();
