// backend/server.js
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import connectDB from "./db.js";
import Product from "./models/Product.js";
import CartItem from "./models/CartItem.js";
 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

connectDB();

// ===============================
//  ROUTES
// ===============================

// 🧩 Seed Products (run once via POST /api/seed)

// app.post('/apiseed',async (req,res)=>{
//       const sampleProducts= [
//       { name: "Apple", cost: 50, brand: "Apple", category: "Fruits", image: "images/apple.jpg" },
//       { name: "Banana", cost: 20, brand: "Banana", category: "Fruits", image: "images/banana.jpg" },
//       { name: "Mango", cost: 70, brand: "Mango", category: "Fruits", image: "images/mango.jpg" },
//       { name: "iPhone", cost: 50000, brand: "Apple", category: "Electronics", image: "images/iphone.jpg" },
//       { name: "Samsung TV", cost: 40000, brand: "Samsung", category: "Electronics", image: "images/tv.jpg" },
//       { name: "T-Shirt", cost: 500, brand: "Nike", category: "Clothing", image: "images/tshirt.jpg" }
//     ];

//     await Product.deleteMany({}); 
//     await Product.insertMany({sampleProducts});
//     await CartItem.deleteMany({});
//     res.json({message:"PRODUCTS ADDED SUCCESSFULLY"});

// });

// app.get('/api/products',async (req,res)=>{

//     const products=await Product.find({});
//     if(!products) return res.status(500).json({message:"CANT GET PRODUCTS"});
//     res.json(products);
     
// });

// app.get('/api/cartitems',async (req,res)=>{

//     const cartitems=await CartItem.find({});
//      res.json(cartitems);
     
// });

// app.post('/api/cart/add',async(req,res)=>{

//     const {name,price,image}=req.body;
//     let item=await CartItem.findOne({name});
//     if(item){

//       item.quantity++;
//       item.totalPrice=item.quantity*item.price;
//       await item.save();
//     }else{
//       const product=await Product.findOne({name});
//       if (!product) return res.status(404).json({ message: "Product not found" });

//         const newItem=new CartItem({
//             name:product.name,
//             price:product.price,
//             image:product.image,
//             quantity:1,
//             totalPrice:product.totalPrice,
//         });
//         await newItem.save();
      

//       const updatedCart=await CartItem.find({});

//       res.json(updatedCart);

//     }
// });

// app.post('/api/cart/decrement',async (req,res)=>{

//     const {name}=req.body;
//     const item=await CartItem.findOne({name});
//     if(!item) return res.status(404).json({message:"NOT FOUND"});
//     item.quantity--;
//     if(item.quantity<=0){
//       await CartItem.deleteOne({name});
//     }
//     else{
//       item.totalPrice=item.quantity*item.price;
//       await item.save();
//     }
//     const updatedCart=await CartItem.find({});
//     res.json(updatedCart);
// });




// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));




app.post("/api/seed", async (req, res) => {
  const sampleProducts = [
    { name: "Apple", cost: 50, brand: "Apple", category: "Fruits", image: "images/apple.jpg" },
    { name: "Banana", cost: 20, brand: "Banana", category: "Fruits", image: "images/banana.jpg" },
    { name: "Mango", cost: 70, brand: "Mango", category: "Fruits", image: "images/mango.jpg" },
    { name: "iPhone", cost: 50000, brand: "Apple", category: "Electronics", image: "images/iphone.jpg" },
    { name: "Samsung TV", cost: 40000, brand: "Samsung", category: "Electronics", image: "images/tv.jpg" },
    { name: "T-Shirt", cost: 500, brand: "Nike", category: "Clothing", image: "images/tshirt.jpg" }
  ];

  await Product.deleteMany({});
  await Product.insertMany(sampleProducts);
  await CartItem.deleteMany({});
  res.json({ message: "✅ Product data seeded successfully, 🧹 Cart cleared successfully" });
});

// 🛍 Get All Products
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// 🛒 Get Cart Items
app.get("/api/cart", async (req, res) => {
  const cartItems = await CartItem.find({});
  res.json(cartItems);
});

// 🛒 Add or Update Cart Item
app.post("/api/cart/add", async (req, res) => {
  const { name, price, image } = req.body;

  let item = await CartItem.findOne({ name });
  if (item) {
    item.quantity += 1;
    item.totalPrice = item.quantity * item.price;
    await item.save();
  } else {
    const product = await Product.findOne({ name });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newItem = new CartItem({
      name: product.name,
      price: product.cost,
      image: product.image,
      quantity: 1,
      totalPrice: product.cost
    });
    await newItem.save();
  }

  const updatedCart = await CartItem.find({});
  res.json(updatedCart);
});

// 🧾 Decrement Cart Item Quantity
app.post("/api/cart/decrement", async (req, res) => {
  const { name } = req.body;

  const item = await CartItem.findOne({ name });
  if (!item) return res.json(await CartItem.find({}));

  item.quantity -= 1;
  if (item.quantity <= 0) {
    await CartItem.deleteOne({ name });
  } else {
    item.totalPrice = item.quantity * item.price;
    await item.save();
  }

  const updatedCart = await CartItem.find({});
  res.json(updatedCart);
});

// ===============================
//  START SERVER
// ===============================
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
