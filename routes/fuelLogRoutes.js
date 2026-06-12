const express = require("express");

const router = express.Router();

let fuelLogs = [
  {
    id: 1,
    busNo: "NB-4587",
    fuelType: "Diesel",
    liters: 80,
    cost: 25600,
    filledDate: "2026-06-12",
    odometerReading: 125400,
    driverName: "Kamal Perera",
  },
  {
    id: 2,
    busNo: "WP-7821",
    fuelType: "Diesel",
    liters: 65,
    cost: 20800,
    filledDate: "2026-06-11",
    odometerReading: 98200,
    driverName: "S. Kumar",
  },
];

// Get all fuel logs
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: fuelLogs.length,
    data: fuelLogs,
  });
});

// Add new fuel log
router.post("/", (req, res) => {
  const {
    busNo,
    fuelType,
    liters,
    cost,
    filledDate,
    odometerReading,
    driverName,
  } = req.body;

  if (!busNo || !fuelType || !liters || !cost || !filledDate) {
    return res.status(400).json({
      success: false,
      message: "Bus number, fuel type, liters, cost, and filled date are required",
    });
  }

  const newFuelLog = {
    id: fuelLogs.length + 1,
    busNo,
    fuelType,
    liters,
    cost,
    filledDate,
    odometerReading: odometerReading || "Not recorded",
    driverName: driverName || "Not recorded",
  };

  fuelLogs.push(newFuelLog);

  res.status(201).json({
    success: true,
    message: "Fuel log added successfully",
    data: newFuelLog,
  });
});

// Update fuel log
router.put("/:id", (req, res) => {
  const fuelLogId = Number(req.params.id);
  const fuelLogIndex = fuelLogs.findIndex((log) => log.id === fuelLogId);

  if (fuelLogIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Fuel log not found",
    });
  }

  fuelLogs[fuelLogIndex] = {
    ...fuelLogs[fuelLogIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Fuel log updated successfully",
    data: fuelLogs[fuelLogIndex],
  });
});

// Delete fuel log
router.delete("/:id", (req, res) => {
  const fuelLogId = Number(req.params.id);
  const fuelLogExists = fuelLogs.some((log) => log.id === fuelLogId);

  if (!fuelLogExists) {
    return res.status(404).json({
      success: false,
      message: "Fuel log not found",
    });
  }

  fuelLogs = fuelLogs.filter((log) => log.id !== fuelLogId);

  res.status(200).json({
    success: true,
    message: "Fuel log deleted successfully",
  });
});

module.exports = router;