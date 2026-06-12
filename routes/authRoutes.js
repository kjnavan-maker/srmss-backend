const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    fullName: "System Administrator",
  },
  {
    id: 2,
    username: "manager",
    password: "manager123",
    role: "Depot Manager",
    fullName: "Depot Manager",
  },
  {
    id: 3,
    username: "driver",
    password: "driver123",
    role: "Driver",
    fullName: "Driver User",
  },
];

// Login
router.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Username, password, and role are required",
    });
  }

  const user = users.find(
    (item) =>
      item.username === username &&
      item.password === password &&
      item.role === role
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid login credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "srmss_secret_key",
    { expiresIn: "1d" }
  );

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      fullName: user.fullName,
    },
  });
});

module.exports = router;