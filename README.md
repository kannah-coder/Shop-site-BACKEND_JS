 # 🛒 Full Express.js + MongoDB Shopping Cart Backend

This project is a **complete backend for a shopping cart system**, built using **Node.js**, **Express**, and **MongoDB (Mongoose)**. It handles:

✅ Product management (seed, fetch)
✅ Cart management (add, increment, decrement)
✅ Static frontend hosting
✅ Clean and scalable folder structure

Perfect for beginners and intermediate developers learning backend APIs.

---

## 🚀 Features

### ✅ 1. Seed Products (POST `/api/seed`)

Clears database and inserts sample products.

### ✅ 2. Fetch Products (GET `/api/products`)

Returns all available products.

### ✅ 3. Fetch Cart Items (GET `/api/cart`)

Returns all items currently in the cart.

### ✅ 4. Add to Cart (POST `/api/cart/add`)

* If item exists → increases quantity
* If new item → adds to cart with quantity = 1

### ✅ 5. Decrement Cart Item (POST `/api/cart/decrement`)

* Reduces quantity
* Removes item if quantity reaches 0

---

## 📂 Project Structure

```
backend/
│-- server.js
│-- db.js
│-- models/
│     ├── Product.js
│     └── CartItem.js
frontend/
│-- index.html
│-- images/
```

---

## 🔧 Installation & Setup

I HAS NOT PROVIDED node_modules to install it before run this commands in your terminal manually 
-- cd shop-site-ii
-- cd BackEnd 
then this works proper and it executes


### 1️⃣ **Clone the repository**

```
git clone [<your-repo-link>](https://github.com/kannah-coder/Shop-site-BACKEND_JS.git)
 
```

### 2️⃣ **Install dependencies**

```
npm install
```

### 3️⃣ **Setup MongoDB**

Update your `db.js` file with MongoDB URI.

Example:

```
mongoose.connect("mongodb://127.0.0.1:27017/shopDB")
```

### 4️⃣ **Run the server**

```
node server.js
```

Server starts at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### ✅ **POST `/api/seed`**

Seeds the database with default sample product data.

### ✅ **GET `/api/products`**

Returns all products.

### ✅ **GET `/api/cart`**

Returns full cart.

### ✅ **POST `/api/cart/add`**

**Body:**

```
{
  "name": "Apple",
  "price": 50,
  "image": "images/apple.jpg"
}
```

Adds or increments a product.

### ✅ **POST `/api/cart/decrement`**

**Body:**

```
{
  "name": "Apple"
}
```

Decrements quantity or removes item.

---

## 🗄️ Mongoose Models

### ✅ Product Model (`Product.js`)

```
{
  name: String,
  cost: Number,
  brand: String,
  category: String,
  image: String
}
```

### ✅ CartItem Model (`CartItem.js`)

```
{
  name: String,
  price: Number,
  image: String,
  quantity: Number,
  totalPrice: Number
}
```

---

## 🧠 Logic Summary

### ✅ Add Item

* Find by name
* If exists → increase quantity and update total
* Else → insert new cart item

### ✅ Decrement Item

* Reduce quantity
* If quantity becomes 0 → delete item

---

## 📌 Technologies Used

* **Node.js**
* **Express.js**
* **MongoDB & Mongoose**
* **CORS**
* **Static hosting** (frontend in same project)

---

## ✅ Perfect for Beginners

This project helps you learn:

* REST APIs
* MongoDB CRUD
* Express routing
* Backend folder structure
* Cart logic used in real e-commerce apps

---

## 🙌 Author

Made by **Kannah** while learning full backend development.

If you like this project, ⭐ star it on GitHub!
