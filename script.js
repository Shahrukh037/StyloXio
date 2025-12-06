/* ------------------ PRODUCTS DATA ------------------ */
const products = [
  {
    id: 1,
    name: "Black Hoodie",
    category: "Clothing",
    price: 899,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 1299,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223f417"
  },
  {
    id: 3,
    name: "Royal Perfume",
    category: "Cosmetics",
    price: 699,
    image: "https://images.unsplash.com/photo-1600185365483-26cec9b1df32"
  },
  {
    id: 4,
    name: "Men's Sneakers",
    category: "Footwear",
    price: 1599,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
  }
];

/* ------------------ RENDER PRODUCTS ------------------ */
function renderProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  list.forEach(item => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${item.image}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
  });
}

renderProducts(products);

/* ------------------ CART SYSTEM ------------------ */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(product.name + " added to cart!");
}

function updateCartCount() {
  const btn = document.getElementById("cartCount");
  if (btn) btn.innerText = cart.length;
}

updateCartCount();
