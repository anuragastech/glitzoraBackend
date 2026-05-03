const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS (ONLY ONCE)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// static images
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/products", require("./routes/ProductRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));