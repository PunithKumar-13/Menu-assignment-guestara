// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); // replaces body-parser

// Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/items", itemRoutes);



// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Menu backend running" });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
