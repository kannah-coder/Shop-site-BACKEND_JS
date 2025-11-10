const BACKEND_URL = "http://localhost:3000";

function goToProducts(category) {
  window.location.href = `products.html?category=${category}`;
}

let allProducts = [];
let filteredByCategory = [];

// 🧩 Fetch all products from backend
async function fetchProducts() {
  const res = await fetch(`${BACKEND_URL}/api/products`);
  return await res.json();
}

// 🧩 Fetch cart items
async function fetchCart() {
  const res = await fetch(`${BACKEND_URL}/api/cart`);
  return await res.json();
}

// 🧩 Initialize page
async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");
  allProducts = await fetchProducts();

  filteredByCategory = category
    ? allProducts.filter(p => p.category === category)
    : allProducts;

  const categoryTitle = document.getElementById("category-title");
  if (categoryTitle)
    categoryTitle.textContent = `${category || "All"} Products`;

  renderProducts(filteredByCategory);
  renderCart();
}

// 🛍 Render products
function renderProducts(list) {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = "";
  list.forEach(product => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${BACKEND_URL}/${product.image}" alt="${product.name}">
      <p><strong>${product.name}</strong></p>
      <p>Brand: ${product.brand}</p>
      <p>Category: ${product.category}</p>
      <p>Cost: ₹${product.cost}</p>
      <button onclick="addToCart('${product.name}', ${product.cost}, '${product.image}')">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// 🧭 Sorting + filtering
function sortProducts() {
  const v = document.getElementById("sort-select").value;
  if (v === "name") filteredByCategory.sort((a, b) => a.name.localeCompare(b.name));
  if (v === "price-asc") filteredByCategory.sort((a, b) => a.cost - b.cost);
  if (v === "price-desc") filteredByCategory.sort((a, b) => b.cost - a.cost);
  renderProducts(filteredByCategory);
}

function filterProducts() {
  const v = document.getElementById("filter-select").value;
  filteredByCategory =
    v === "all" ? allProducts : allProducts.filter(p => p.brand === v);
  renderProducts(filteredByCategory);
}

// 🛒 Add to Cart (via backend)
async function addToCart(name, price, image) {
  await fetch(`${BACKEND_URL}/api/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, image })
  });
  renderCart();
}

// 🧾 Decrement item
async function decrementItem(name) {
  await fetch(`${BACKEND_URL}/api/cart/decrement`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  renderCart();
}

// 🧺 Render cart
async function renderCart() {
  const cart = await fetchCart();
  const cartTable = document.getElementById("cart-items");
  if (!cartTable) return;

  cartTable.innerHTML = "";
  if (cart.length === 0) {
    cartTable.innerHTML = `<tr><td colspan="6">🛒 Cart is empty</td></tr>`;
    return;
  }

  cart.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${BACKEND_URL}/${item.image}" class="cart-img"></td>
      <td>${item.name}</td>
      <td>${item.brand || "-"}</td>
      <td>₹${item.price}</td>
      <td>${item.quantity}</td>
      <td>₹${item.totalPrice}</td>
    `;
    row.addEventListener("click", () => decrementItem(item.name));
    cartTable.appendChild(row);
  });
}

window.onload = init;
