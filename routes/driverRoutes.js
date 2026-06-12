const express = require("express");

const router = express.Router();

let drivers = [
  {
    id: 1,
    name: "Kamal Perera",
    licenseNo: "B1234567",
    phone: "0771234567",
    assignedRoute: "138 Pettah - Homagama",
    status: "Available",
  },
  {
    id: 2,
    name: "S. Kumar",
    licenseNo: "B7654321",
    phone: "0769876543",
    assignedRoute: "100 Pettah - Panadura",
    status: "On Duty",
  },
];

// Get all drivers
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: drivers.length,
    data: drivers,
  });
});

// Add new driver
router.post("/", (req, res) => {
  const { name, licenseNo, phone, assignedRoute, status } = req.body;

  if (!name || !licenseNo || !phone) {
    return res.status(400).json({
      success: false,
      message: "Driver name, license number, and phone are required",
    });
  }

  const newDriver = {
    id: drivers.length + 1,
    name,
    licenseNo,
    phone,
    assignedRoute: assignedRoute || "Not assigned",
    status: status || "Available",
  };

  drivers.push(newDriver);

  res.status(201).json({
    success: true,
    message: "Driver added successfully",
    data: newDriver,
  });
});

// Update driver
router.put("/:id", (req, res) => {
  const driverId = Number(req.params.id);
  const driverIndex = drivers.findIndex((driver) => driver.id === driverId);

  if (driverIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  drivers[driverIndex] = {
    ...drivers[driverIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Driver updated successfully",
    data: drivers[driverIndex],
  });
});

// Delete driver
router.delete("/:id", (req, res) => {
  const driverId = Number(req.params.id);
  const driverExists = drivers.some((driver) => driver.id === driverId);

  if (!driverExists) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  drivers = drivers.filter((driver) => driver.id !== driverId);

  res.status(200).json({
    success: true,
    message: "Driver deleted successfully",
  });
});

module.exports = router;