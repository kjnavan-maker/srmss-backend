const express = require("express");

const Route = require("../models/Route");
const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");
const Schedule = require("../models/Schedule");
const FuelLog = require("../models/FuelLog");
const Maintenance = require("../models/Maintenance");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const [
      totalRoutes,
      totalDrivers,
      totalVehicles,
      activeSchedules,
      fuelLogs,
      maintenanceRecords,
      activeVehicles,
      vehiclesInMaintenance,
    ] = await Promise.all([
      Route.countDocuments(),
      Driver.countDocuments(),
      Vehicle.countDocuments(),
      Schedule.countDocuments({ status: { $in: ["Scheduled", "On-time"] } }),
      FuelLog.find(),
      Maintenance.find(),
      Vehicle.countDocuments({ status: "Active" }),
      Vehicle.countDocuments({ status: "Maintenance" }),
    ]);

    const totalFuelCost = fuelLogs.reduce(
      (sum, log) => sum + Number(log.cost || 0),
      0
    );

    const totalMaintenanceCost = maintenanceRecords.reduce(
      (sum, record) => sum + Number(record.cost || 0),
      0
    );

    res.status(200).json({
      success: true,
      data: {
        totalRoutes,
        totalDrivers,
        totalVehicles,
        activeSchedules,
        totalFuelCost,
        totalMaintenanceCost,
        activeVehicles,
        vehiclesInMaintenance,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch report summary",
      error: error.message,
    });
  }
});

router.get("/monthly", async (req, res) => {
  try {
    const schedules = await Schedule.find();
    const fuelLogs = await FuelLog.find();
    const maintenanceRecords = await Maintenance.find();

    const totalTrips = schedules.length;
    const completedTrips = schedules.filter(
      (item) => item.status === "Completed"
    ).length;
    const cancelledTrips = schedules.filter(
      (item) => item.status === "Cancelled"
    ).length;

    const fuelCost = fuelLogs.reduce(
      (sum, log) => sum + Number(log.cost || 0),
      0
    );

    const maintenanceCost = maintenanceRecords.reduce(
      (sum, record) => sum + Number(record.cost || 0),
      0
    );

    const performance =
      totalTrips === 0
        ? "No Data"
        : completedTrips / totalTrips >= 0.8
        ? "Good"
        : "Average";

    res.status(200).json({
      success: true,
      count: 1,
      data: [
        {
          id: 1,
          month: "Current Data",
          totalTrips,
          completedTrips,
          cancelledTrips,
          fuelCost,
          maintenanceCost,
          performance,
        },
      ],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch monthly reports",
      error: error.message,
    });
  }
});

router.post("/generate", async (req, res) => {
  try {
    const { reportType, fromDate, toDate } = req.body;

    if (!reportType || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: "Report type, from date, and to date are required",
      });
    }

    const totalRoutes = await Route.countDocuments();
    const totalDrivers = await Driver.countDocuments();
    const totalVehicles = await Vehicle.countDocuments();
    const activeSchedules = await Schedule.countDocuments();

    res.status(200).json({
      success: true,
      message: "Report generated successfully",
      data: {
        reportType,
        fromDate,
        toDate,
        generatedAt: new Date().toISOString(),
        summary: {
          totalRoutes,
          totalDrivers,
          totalVehicles,
          activeSchedules,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate report",
      error: error.message,
    });
  }
});

module.exports = router;