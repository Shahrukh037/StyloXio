/* ---------- PRODUCT DATA ---------- */
const PRODUCTS = [
  { id: 1, name: "Rose Glow Face Serum (30ml)", category: "Cosmetics", price: 349, img: "images/red-roses-serum.jpg" },
  { id: 2, name: "Classic Men White T-Shirt", category: "Clothes", price: 799, img: "images/white-t-shirt.jpg" },
  { id: 3, name: "Aviator Sunglasses", category: "Accessories", price: 1199, img: "images/sunglasses.jpg" },
  { id: 4, name: "Ladies Party Dress", category: "Clothes", price: 1299, img: "images/ladies-party-dress.jpg" },
  { id: 5, name: "Minimalist Watch", category: "Accessories", price: 1599, img: "images/minimal-watch.jpg" }
];

/* ---------- STORAGE KEYS ---------- */
const CART_KEY = 'styloxio_cart';
const ORDERS_KEY = 'styloxio_orders';

/* ---------- STORAGE HELPERS ---------- */
function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e){ return []; } }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }
function getOrders(){ try{ return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch(e){ return []; } }
function saveOrders(orders){ localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }

/* ---------- UPDATE NAV CART COUNT ---------- */
function updateCartCount(){
  const count = getCart().reduce((s,i)=>s + (i.qty||1), 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

/* ---------- ESCAPE HTML ---------- */
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[m])); }

/* ---------- TOAST ---------- */
function showToast(msg){
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style,{
    position:'fixed',right:'18px',bottom:'18px',background:'#0b2a66',color:'#fff',
    padding:'10px 14px',borderRadius:'8px',boxShadow:'0 8px 30px rgba(15,23,42,0.15)',
    zIndex:9999,transition:'opacity 0.5s'
  });
  document.body.appendChild(t);
  setTimeout(()=> t.style.opacity='0',1500);
  setTimeout(()=> t.remove(),2000);
}

/* ---------- VALIDATE PHONE ---------- */
function isValidPhone(phone){ return /^[6-9]\d{9}$/.test(phone); }

/* ---------- RENDER PRODUCTS ---------- */
function renderProductsPage(){
  const grid = document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML='';
  const searchQ = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const filterCat = document.getElementById('filterCategory')?.value || '';
  const list = PRODUCTS.filter(p=>{
    if(filterCat && p.category!==filterCat) return false;
    if(searchQ && !(p.name+p.category).toLowerCase().includes(searchQ)) return false;
    return true;
  });
  list.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML=`
      <img src="${p.img}" alt="${escapeHtml(p.name)}" />
      <div class="p-title">${escapeHtml(p.name)}</div>
      <div class="p-cat">${escapeHtml(p.category)}</div>
      <div class="p-price">₹${p.price}</div>
      <div class="btn-row">
        <button class="btn-primary" data-id="${p.id}" data-action="buy">Buy Now</button>
        <button class="btn-accent" data-id="${p.id}" data-action="add">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll('button[data-action="add"]').forEach(b=>b.addEventListener('click',()=>addToCart(+b.dataset.id)));
  grid.querySelectorAll('button[data-action="buy"]').forEach(b=>{
    b.addEventListener('click',()=>{
      addToCart(+b.dataset.id);
      window.location.href='checkout.html';
    });
  });
}

/* ---------- ADD TO CART ---------- */
function addToCart(productId){
  const product = PRODUCTS.find(p=>p.id===productId);
  if(!product) return showToast('Product not found');
  const cart = getCart();
  const exist = cart.find(i=>i.id===productId);
  if(exist) exist.qty=(exist.qty||1)+1; else cart.push({id:product.id,name:product.name,price:product.price,img:product.img,qty:1});
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

/* ---------- CART PAGE ---------- */
function renderCartPage(){
  const container = document.getElementById('cartContainer');
  if(!container) return;
  const cart = getCart();
  container.innerHTML='';
  if(cart.length===0){
    container.innerHTML='<div class="card" style="padding:20px;text-align:center;color:var(--muted)">Your cart is empty — go to Products to add items.</div>';
    document.getElementById('summaryItems').textContent='0';
    document.getElementById('summaryTotal').textContent='₹0';
    return;
  }
  let subtotal=0;
  cart.forEach((item,idx)=>{
    subtotal+=item.price*(item.qty||1);
    const div=document.createElement('div'); div.className='cart-item';
    div.innerHTML=`
      <img src="${item.img}" alt="${escapeHtml(item.name)}" />
      <div class="ci-meta">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:700">${escapeHtml(item.name)}</div>
          <div style="font-weight:800">₹${item.price}</div>
        </div>
        <div class="small" style="margin-top:6px">Category: ${getCategoryName(item.id)}</div>
        <div style="margin-top:10px;display:flex;align-items:center;justify-content:space-between">
          <div class="qty-controls">
            <button data-idx="${idx}" class="qty-decrease">−</button>
            <div style="padding:6px 10px;border-radius:6px;background:#f1f6ff;margin:0 6px">${item.qty||1}</div>
            <button data-idx="${idx}" class="qty-increase">+</button>
          </div>
          <div>
            <button data-idx="${idx}" class="btn-primary remove-item">Remove</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
  document.getElementById('summaryItems').textContent=cart.reduce((s,i)=>s+(i.qty||1),0);
  document.getElementById('summaryTotal').textContent='₹'+subtotal;
  container.querySelectorAll('.qty-increase').forEach(b=>b.addEventListener('click',()=>changeQty(+b.dataset.idx,+1)));
  container.querySelectorAll('.qty-decrease').forEach(b=>b.addEventListener('click',()=>changeQty(+b.dataset.idx,-1)));
  container.querySelectorAll('.remove-item').forEach(b=>b.addEventListener('click',()=>removeItem(+b.dataset.idx)));
}

/* ---------- CHANGE QTY / REMOVE ---------- */
function changeQty(idx,delta){ const cart=getCart(); if(!cart[idx]) return; cart[idx].qty=(cart[idx].qty||1)+delta; if(cart[idx].qty<=0) cart.splice(idx,1); saveCart(cart); renderCartPage(); }
function removeItem(idx){ const cart=getCart(); if(!cart[idx]) return; cart.splice(idx,1); saveCart(cart); renderCartPage(); showToast('Item removed from cart'); }

/* ---------- CHECKOUT PREVIEW ---------- */
function renderCheckoutPreview(){
  const preview=document.getElementById('previewItems');
  const totalEl=document.getElementById('previewTotal');
  if(!preview) return 0;
  const cart=getCart();
  preview.innerHTML='';
  let total=0;
  cart.forEach(i=>{
    total+=i.price*(i.qty||1);
    const d=document.createElement('div'); d.className='card'; d.style.marginBottom='8px';
    d.innerHTML=`<div style="display:flex;justify-content:space-between"><div>${escapeHtml(i.name)} x ${i.qty||1}</div><div>₹${i.price*(i.qty||1)}</div></div>`;
    preview.appendChild(d);
  });
  totalEl.textContent='₹'+total;
  return total;
}

/* ---------- PLACE ORDER ---------- */
document.addEventListener('DOMContentLoaded',function(){
  updateCartCount();
  if(document.getElementById('productGrid')) renderProductsPage();
  if(document.getElementById('cartContainer')) renderCartPage();
  if(document.getElementById('previewItems')) renderCheckoutPreview();
  if(document.getElementById('ordersContainer')) renderOrdersPage();

  const form=document.getElementById('checkoutForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const name=document.getElementById('custName').value.trim();
      const phone=document.getElementById('custPhone').value.trim();
      const addr=document.getElementById('custAddress').value.trim();
      const method=document.getElementById('paymentMethod').value;
      const cart=getCart();
      if(!name||!phone||!addr||!method){ alert('Please fill all fields'); return; }
      if(!isValidPhone(phone)){ alert('Please enter a valid 10-digit Indian phone number'); return; }
      if(cart.length===0){ alert('Cart is empty'); return; }

      const orderId='ORD'+Date.now();
      const totalAmount = renderCheckoutPreview();
      const totalAmountPaise = totalAmount*100;

      if(method==='cod'){
        saveOrder(orderId,name,phone,addr,cart,'COD');
        localStorage.removeItem(CART_KEY);
        updateCartCount();
        showToast(`Order placed! ID: ${orderId} (COD)`);
        setTimeout(()=>window.location.href='index.html',1000);
      } else if(method==='online'){
        const options={
          key:'rzp_live_1DP5mmOlF5G5ag', // Razorpay sandbox key
          amount:totalAmountPaise,
          currency:'INR',
          name:'Styloxio',
          description:'Purchase from Styloxio',
          prefill:{name:name,email:'',contact:phone},
          theme:{color:'#0b2a66'},
          handler:function(response){
            saveOrder(orderId,name,phone,addr,cart,'Online');
            localStorage.removeItem(CART_KEY);
            updateCartCount();
            showToast(`Payment successful! Order ID: ${orderId} (Demo)`);
            setTimeout(()=>window.location.href='index.html',1200);
          },
          modal:{ondismiss:()=>showToast('Payment cancelled!')}
        };
        new Razorpay(options).open();
      }
    });
  }
});

/* ---------- SAVE ORDER ---------- */
function saveOrder(id,name,phone,addr,items,paymentType){
  const order={id,customer:name,phone,address:addr,items,paymentType,date:new Date().toISOString()};
  const orders=getOrders();
  orders.push(order);
  saveOrders(orders);
}

/* ---------- ORDERS PAGE ---------- */
function renderOrdersPage(){
  const container=document.getElementById('ordersContainer');
  if(!container) return;
  const orders=getOrders();
  container.innerHTML='';
  if(orders.length===0){ container.innerHTML='<div class="card" style="padding:20px;text-align:center;color:var(--muted)">No orders yet.</div>'; return; }
  orders.slice().reverse().forEach(o=>{
    const div=document.createElement('div'); div.className='card'; div.style.marginBottom='10px';
    let itemsHtml=o.items.map(i=>`${escapeHtml(i.name)} x ${i.qty||1}`).join('<br>');
    div.innerHTML=`
      <div style="display:flex;justify-content:space-between">
        <div><strong>Order ID:</strong> ${o.id}<br><strong>Name:</strong> ${escapeHtml(o.customer)}<br><strong>Phone:</strong> ${o.phone}<br><strong>Payment:</strong> ${o.paymentType}<br><strong>Date:</strong> ${new Date(o.date).toLocaleString()}</div>
        <div style="text-align:right"><strong>Items:</strong><br>${itemsHtml}</div>
      </div>
    `;
    container.appendChild(div);
  });
}

/* ---------- CATEGORY HELPER ---------- */
function getCategoryName(productId){ const p=PRODUCTS.find(x=>x.id===productId); return p?p.category:''; }

/* ---------- SEARCH & FILTER ---------- */
document.addEventListener('input',function(e){
  if(e.target && e.target.id==='searchInput') renderProductsPage();
  if(e.target && e.target.id==='filterCategory') renderProductsPage();
});

/* ---------- SYNC CART COUNT ON STORAGE CHANGE ---------- */
window.addEventListener('storage',updateCartCount);
