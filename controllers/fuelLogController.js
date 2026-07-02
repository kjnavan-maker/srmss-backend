const FuelLog = require("../models/FuelLog");

exports.getFuelLogs = async (req, res) => {
  try {
    const fuelLogs = await FuelLog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fuelLogs.length,
      data: fuelLogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fuel logs",
      error: error.message,
    });
  }
};

exports.getFuelLogCount = async (req, res) => {
  try {
    const count = await FuelLog.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to count fuel logs",
      error: error.message,
    });
  }
};

exports.createFuelLog = async (req, res) => {
  try {
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
        message:
          "Bus number, fuel type, liters, cost, and filled date are required",
      });
    }

    const fuelLog = await FuelLog.create({
      busNo,
      fuelType,
      liters,
      cost,
      filledDate,
      odometerReading,
      driverName,
    });

    res.status(201).json({
      success: true,
      message: "Fuel log added successfully",
      data: fuelLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add fuel log",
      error: error.message,
    });
  }
};

exports.updateFuelLog = async (req, res) => {
  try {
    const fuelLog = await FuelLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!fuelLog) {
      return res.status(404).json({
        success: false,
        message: "Fuel log not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fuel log updated successfully",
      data: fuelLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update fuel log",
      error: error.message,
    });
  }
};

exports.deleteFuelLog = async (req, res) => {
  try {
    const fuelLog = await FuelLog.findByIdAndDelete(req.params.id);

    if (!fuelLog) {
      return res.status(404).json({
        success: false,
        message: "Fuel log not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fuel log deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete fuel log",
      error: error.message,
    });
  }
};