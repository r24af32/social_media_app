const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const User = require("../models/User");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "social_media_app", // Replace with the desired folder name in Cloudinary
    allowed_formats: ["jpg", "png", "gif"], // Allowed file types
  },
});

// Configure multer to use Cloudinary storage
const upload = multer({
  storage,
  limits: { files: 20 }, // Max number of files
});

// Route to handle form submissions
router.post("/", upload.array("images", 20), async (req, res) => {
  try {
    const { name, socialHandle } = req.body;

    if (!name || !socialHandle) {
      return res.status(400).json({ error: "Name and social handle are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    // Extract image URLs
    const images = req.files.map((file) => file.path);

    // Save user to database
    const user = new User({ name, socialHandle, images });
    await user.save();

    res.status(201).json({ message: "User submission successful", user });
  } catch (error) {
    console.error("Error saving user submission:", error);
    res.status(500).json({ error: "Failed to save user submission" });
  }
});


// Route to fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
