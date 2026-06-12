const express = require("express");

const router = express.Router();

const reportSummary = {
  totalRoutes: 12,
  totalDrivers: 28,
  totalVehicles: 24,
  activeSchedules: 36,
  totalFuelCost: 46400,
  totalMaintenanceCost: 43000,
  activeVehicles: 21,
  vehiclesInMaintenance: 3,
};

const monthlyReports = [
  {
    id: 1,
    month: "June 2026",
    totalTrips: 420,
    completedTrips: 398,
    cancelledTrips: 22,
    fuelCost: 920000,
    maintenanceCost: 180000,
    performance: "Good",
  },
  {
    id: 2,
    month: "May 2026",
    totalTrips: 390,
    completedTrips: 365,
    cancelledTrips: 25,
    fuelCost: 875000,
    maintenanceCost: 210000,
    performance: "Average",
  },
];

// Get report summary
router.get("/summary", (req, res) => {
  res.status(200).json({
    success: true,
    data: reportSummary,
  });
});

// Get monthly reports
router.get("/monthly", (req, res) => {
  res.status(200).json({
    success: true,
    count: monthlyReports.length,
    data: monthlyReports,
  });
});

// Generate report
router.post("/generate", (req, res) => {
  const { reportType, fromDate, toDate } = req.body;

  if (!reportType || !fromDate || !toDate) {
    return res.status(400).json({
      success: false,
      message: "Report type, from date, and to date are required",
    });
  }

  res.status(200).json({
    success: true,
    message: "Report generated successfully",
    data: {
      reportType,
      fromDate,
      toDate,
      generatedAt: new Date().toISOString(),
      summary: reportSummary,
    },
  });
});

module.exports = router;