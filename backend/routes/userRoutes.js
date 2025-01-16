const express = require("express");
const multer = require("multer");
const User = require("../models/User");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// for multiple image
const upload = multer({
  storage,
  limits: { files: 20 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only images are allowed."));
    }
    cb(null, true);
  },
});

// route handle
router.post("/", upload.array("images", 20), async (req, res) => {
  try {
    const { name, socialHandle } = req.body;
    if (!name || !socialHandle) {
      return res.status(400).json({ error: "Name and social handle are required" });
    }

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const user = new User({ name, socialHandle, images });
    await user.save();

    res.status(201).json({ message: "User submission successful", user });
  } catch (error) {
    console.error("Error saving user submission:", error);
    res.status(500).json({ error: "Failed to save user submission" });
  }
});

// route to all sub
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
