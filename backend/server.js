require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

//middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://socialmediapp-frontend.netlify.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//root to handle url
app.get("/", (req, res) => {
  res.send("Welcome to the Social Media App Backend!");
});

//MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "social_media_app",
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

//API routes
app.use("/api/users", userRoutes);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
