const Driver = require("../models/Driver");

// Get all drivers
exports.getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: drivers.length,
      data: drivers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch drivers",
      error: error.message,
    });
  }
};

// Add new driver
exports.createDriver = async (req, res) => {
  try {
    const { name, licenseNo, phone, assignedRoute, status } = req.body;

    if (!name || !licenseNo || !phone) {
      return res.status(400).json({
        success: false,
        message: "Driver name, license number, and phone are required",
      });
    }

    const existingDriver = await Driver.findOne({ licenseNo });

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "License number already exists",
      });
    }

    const driver = await Driver.create({
      name,
      licenseNo,
      phone,
      assignedRoute,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Driver added successfully",
      data: driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add driver",
      error: error.message,
    });
  }
};

// Update driver
exports.updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      data: driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update driver",
      error: error.message,
    });
  }
};

// Delete driver
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete driver",
      error: error.message,
    });
  }
};

// Count drivers for dashboard
exports.getDriverCount = async (req, res) => {
  try {
    const count = await Driver.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to count drivers",
      error: error.message,
    });
  }
};