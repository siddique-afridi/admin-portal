const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

// Example Admin Dashboard route
router.get("/dashboard", auth, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard", user: req.user });
});

module.exports = router;
