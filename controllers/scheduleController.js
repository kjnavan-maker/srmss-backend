const Schedule = require("../models/Schedule");

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: 1, departureTime: 1 });

    res.status(200).json({
      success: true,
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch schedules",
      error: error.message,
    });
  }
};

exports.getScheduleCount = async (req, res) => {
  try {
    const count = await Schedule.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to count schedules",
      error: error.message,
    });
  }
};

exports.createSchedule = async (req, res) => {
  try {
    const {
      routeNo,
      busNo,
      driverName,
      departureTime,
      arrivalTime,
      date,
      status,
    } = req.body;

    if (
      !routeNo ||
      !busNo ||
      !driverName ||
      !departureTime ||
      !arrivalTime ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Route, bus, driver, departure time, arrival time, and date are required",
      });
    }

    const busConflict = await Schedule.findOne({
      busNo,
      date,
      departureTime,
    });

    if (busConflict) {
      return res.status(409).json({
        success: false,
        message: "Schedule conflict: This bus is already assigned at the same time",
        conflictData: busConflict,
      });
    }

    const driverConflict = await Schedule.findOne({
      driverName,
      date,
      departureTime,
    });

    if (driverConflict) {
      return res.status(409).json({
        success: false,
        message:
          "Schedule conflict: This driver is already assigned at the same time",
        conflictData: driverConflict,
      });
    }

    const schedule = await Schedule.create({
      routeNo,
      busNo,
      driverName,
      departureTime,
      arrivalTime,
      date,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Schedule added successfully",
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add schedule",
      error: error.message,
    });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Schedule updated successfully",
      data: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update schedule",
      error: error.message,
    });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: "Schedule not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Schedule deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete schedule",
      error: error.message,
    });
  }
};