/* ---------- PRODUCT DATA ---------- */
const PRODUCTS = [
  {
    id: 1,
    name: "Rose Glow Face Serum (30ml)",
    category: "Cosmetics",
    price: 349,
    img: "images/cosmetics/rose-glow-serum.jpg"
  },
  {
    id: 2,
    name: "Classic Men White T-Shirt",
    category: "Clothes",
    price: 799,
    img: "images/clothes/men-white-tshirt.jpg"
  },
  {
    id: 3,
    name: "Aviator Sunglasses",
    category: "Accessories",
    price: 1199,
    img: "images/accessories/aviator-sunglasses.jpg"
  },
  {
    id: 4,
    name: "Ladies Party Dress",
    category: "Clothes",
    price: 1299,
    img: "images/clothes/ladies-party-dress.jpg"
  },
  {
    id: 5,
    name: "Minimalist Watch",
    category: "Accessories",
    price: 1599,
    img: "images/accessories/minimalist-watch.jpg"
  }
];

/* ---------- STORAGE KEYS ---------- */
const CART_KEY = 'styloxio_cart';
const ORDERS_KEY = 'styloxio_orders';

/* ---------- STORAGE HELPERS ---------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function getOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
  catch { return []; }
}
function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

/* ---------- UPDATE NAV CART COUNT ---------- */
function updateCartCount() {
  const count = getCart().reduce((s, i) => s + (i.qty || 1), 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

/* ---------- ESCAPE HTML ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m =>
    ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m])
  );
}

/* ---------- TOAST ---------- */
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed',
    right: '18px',
    bottom: '18px',
    background: '#0b2a66',
    color: '#fff',
    padding: '10px 14px',
    borderRadius: '8px',
    zIndex: 9999
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

/* ---------- RENDER PRODUCTS ---------- */
function renderProductsPage() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const searchQ = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const filterCat = document.getElementById('filterCategory')?.value || '';

  const list = PRODUCTS.filter(p => {
    if (filterCat && p.category !== filterCat) return false;
    if (searchQ && !(p.name + p.category).toLowerCase().includes(searchQ)) return false;
    return true;
  });

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${escapeHtml(p.name)}">
      <div class="p-title">${escapeHtml(p.name)}</div>
      <div class="p-cat">${p.category}</div>
      <div class="p-price">₹${p.price}</div>
      <div class="btn-row">
        <button class="btn-primary" data-id="${p.id}" data-action="buy">Buy Now</button>
        <button class="btn-accent" data-id="${p.id}" data-action="add">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('[data-action="add"]').forEach(b =>
    b.onclick = () => addToCart(+b.dataset.id)
  );
  grid.querySelectorAll('[data-action="buy"]').forEach(b =>
    b.onclick = () => {
      addToCart(+b.dataset.id);
      location.href = 'checkout.html';
    }
  );
}

/* ---------- ADD TO CART ---------- */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const cart = getCart();
  const exist = cart.find(i => i.id === id);
  if (exist) exist.qty++;
  else cart.push({ ...product, qty: 1 });

  saveCart(cart);
  showToast(`${product.name} added to cart`);
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderProductsPage();
});

/* ---------- SEARCH & FILTER ---------- */
document.addEventListener('input', e => {
  if (e.target.id === 'searchInput' || e.target.id === 'filterCategory') {
    renderProductsPage();
  }
});

window.addEventListener('storage', updateCartCount);
