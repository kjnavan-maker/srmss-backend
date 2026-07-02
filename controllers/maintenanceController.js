const Maintenance = require("../models/Maintenance");

exports.getMaintenanceRecords = async (req, res) => {
  try {
    const records = await Maintenance.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch maintenance records",
      error: error.message,
    });
  }
};

exports.getMaintenanceCount = async (req, res) => {
  try {
    const count = await Maintenance.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to count maintenance records",
      error: error.message,
    });
  }
};

exports.createMaintenanceRecord = async (req, res) => {
  try {
    const {
      busNo,
      issueType,
      description,
      reportedDate,
      serviceDate,
      cost,
      status,
    } = req.body;

    if (!busNo || !issueType || !reportedDate) {
      return res.status(400).json({
        success: false,
        message: "Bus number, issue type, and reported date are required",
      });
    }

    const record = await Maintenance.create({
      busNo,
      issueType,
      description,
      reportedDate,
      serviceDate,
      cost,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Maintenance record added successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add maintenance record",
      error: error.message,
    });
  }
};

exports.updateMaintenanceRecord = async (req, res) => {
  try {
    const record = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Maintenance record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Maintenance record updated successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update maintenance record",
      error: error.message,
    });
  }
};

exports.deleteMaintenanceRecord = async (req, res) => {
  try {
    const record = await Maintenance.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Maintenance record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Maintenance record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete maintenance record",
      error: error.message,
    });
  }
};