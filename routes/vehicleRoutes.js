const express = require("express");

const router = express.Router();

let vehicles = [
  {
    id: 1,
    busNo: "NB-4587",
    model: "Ashok Leyland",
    capacity: 54,
    assignedRoute: "138 Pettah - Homagama",
    status: "Active",
    lastService: "2026-05-20",
  },
  {
    id: 2,
    busNo: "WP-7821",
    model: "Tata LP 1512",
    capacity: 50,
    assignedRoute: "100 Pettah - Panadura",
    status: "Maintenance",
    lastService: "2026-05-10",
  },
];

// Get all vehicles
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: vehicles.length,
    data: vehicles,
  });
});

// Add new vehicle
router.post("/", (req, res) => {
  const { busNo, model, capacity, assignedRoute, status, lastService } = req.body;

  if (!busNo || !model || !capacity) {
    return res.status(400).json({
      success: false,
      message: "Bus number, model, and capacity are required",
    });
  }

  const newVehicle = {
    id: vehicles.length + 1,
    busNo,
    model,
    capacity,
    assignedRoute: assignedRoute || "Not assigned",
    status: status || "Active",
    lastService: lastService || "Not recorded",
  };

  vehicles.push(newVehicle);

  res.status(201).json({
    success: true,
    message: "Vehicle added successfully",
    data: newVehicle,
  });
});

// Update vehicle
router.put("/:id", (req, res) => {
  const vehicleId = Number(req.params.id);
  const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === vehicleId);

  if (vehicleIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  }

  vehicles[vehicleIndex] = {
    ...vehicles[vehicleIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Vehicle updated successfully",
    data: vehicles[vehicleIndex],
  });
});

// Delete vehicle
router.delete("/:id", (req, res) => {
  const vehicleId = Number(req.params.id);
  const vehicleExists = vehicles.some((vehicle) => vehicle.id === vehicleId);

  if (!vehicleExists) {
    return res.status(404).json({
      success: false,
      message: "Vehicle not found",
    });
  }

  vehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);

  res.status(200).json({
    success: true,
    message: "Vehicle deleted successfully",
  });
});

module.exports = router;