const express = require("express");

const router = express.Router();

let users = [
  {
    id: 1,
    fullName: "Admin User",
    username: "admin",
    email: "admin@srmss.lk",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    fullName: "Depot Manager",
    username: "manager",
    email: "manager@srmss.lk",
    role: "Depot Manager",
    status: "Active",
  },
];

// Get all users
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// Add new user
router.post("/", (req, res) => {
  const { fullName, username, email, role, status } = req.body;

  if (!fullName || !username || !email || !role) {
    return res.status(400).json({
      success: false,
      message: "Full name, username, email, and role are required",
    });
  }

  const usernameExists = users.some((user) => user.username === username);

  if (usernameExists) {
    return res.status(409).json({
      success: false,
      message: "Username already exists",
    });
  }

  const newUser = {
    id: users.length + 1,
    fullName,
    username,
    email,
    role,
    status: status || "Active",
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User added successfully",
    data: newUser,
  });
});

// Update user
router.put("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: users[userIndex],
  });
});

// Delete user
router.delete("/:id", (req, res) => {
  const userId = Number(req.params.id);
  const userExists = users.some((user) => user.id === userId);

  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  users = users.filter((user) => user.id !== userId);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

module.exports = router;