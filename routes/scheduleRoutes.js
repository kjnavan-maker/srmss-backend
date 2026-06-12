const express = require("express");

const router = express.Router();

let schedules = [
  {
    id: 1,
    routeNo: "138",
    busNo: "NB-4587",
    driverName: "Kamal Perera",
    departureTime: "08:00",
    arrivalTime: "09:20",
    date: "2026-06-12",
    status: "Scheduled",
  },
  {
    id: 2,
    routeNo: "100",
    busNo: "WP-7821",
    driverName: "S. Kumar",
    departureTime: "09:30",
    arrivalTime: "11:00",
    date: "2026-06-12",
    status: "Scheduled",
  },
];

// Get all schedules
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: schedules.length,
    data: schedules,
  });
});

// Add new schedule with basic conflict check
router.post("/", (req, res) => {
  const {
    routeNo,
    busNo,
    driverName,
    departureTime,
    arrivalTime,
    date,
    status,
  } = req.body;

  if (!routeNo || !busNo || !driverName || !departureTime || !arrivalTime || !date) {
    return res.status(400).json({
      success: false,
      message: "Route, bus, driver, departure time, arrival time, and date are required",
    });
  }

  const conflict = schedules.find(
    (schedule) =>
      schedule.busNo === busNo &&
      schedule.date === date &&
      schedule.departureTime === departureTime
  );

  if (conflict) {
    return res.status(409).json({
      success: false,
      message: "Schedule conflict: This bus is already assigned at the same time",
      conflictData: conflict,
    });
  }

  const newSchedule = {
    id: schedules.length + 1,
    routeNo,
    busNo,
    driverName,
    departureTime,
    arrivalTime,
    date,
    status: status || "Scheduled",
  };

  schedules.push(newSchedule);

  res.status(201).json({
    success: true,
    message: "Schedule added successfully",
    data: newSchedule,
  });
});

// Update schedule
router.put("/:id", (req, res) => {
  const scheduleId = Number(req.params.id);
  const scheduleIndex = schedules.findIndex(
    (schedule) => schedule.id === scheduleId
  );

  if (scheduleIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Schedule not found",
    });
  }

  schedules[scheduleIndex] = {
    ...schedules[scheduleIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Schedule updated successfully",
    data: schedules[scheduleIndex],
  });
});

// Delete schedule
router.delete("/:id", (req, res) => {
  const scheduleId = Number(req.params.id);
  const scheduleExists = schedules.some(
    (schedule) => schedule.id === scheduleId
  );

  if (!scheduleExists) {
    return res.status(404).json({
      success: false,
      message: "Schedule not found",
    });
  }

  schedules = schedules.filter((schedule) => schedule.id !== scheduleId);

  res.status(200).json({
    success: true,
    message: "Schedule deleted successfully",
  });
});

module.exports = router;