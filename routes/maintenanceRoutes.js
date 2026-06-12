const express = require("express");

const router = express.Router();

let maintenanceRecords = [
  {
    id: 1,
    busNo: "NB-4587",
    issueType: "Engine Check",
    description: "Routine engine inspection completed",
    reportedDate: "2026-06-10",
    serviceDate: "2026-06-12",
    cost: 15000,
    status: "Completed",
  },
  {
    id: 2,
    busNo: "WP-7821",
    issueType: "Brake Repair",
    description: "Brake system requires urgent service",
    reportedDate: "2026-06-11",
    serviceDate: "2026-06-13",
    cost: 28000,
    status: "Pending",
  },
];

// Get all maintenance records
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: maintenanceRecords.length,
    data: maintenanceRecords,
  });
});

// Add maintenance record
router.post("/", (req, res) => {
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

  const newRecord = {
    id: maintenanceRecords.length + 1,
    busNo,
    issueType,
    description: description || "No description",
    reportedDate,
    serviceDate: serviceDate || "Not scheduled",
    cost: cost || 0,
    status: status || "Pending",
  };

  maintenanceRecords.push(newRecord);

  res.status(201).json({
    success: true,
    message: "Maintenance record added successfully",
    data: newRecord,
  });
});

// Update maintenance record
router.put("/:id", (req, res) => {
  const recordId = Number(req.params.id);
  const recordIndex = maintenanceRecords.findIndex(
    (record) => record.id === recordId
  );

  if (recordIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Maintenance record not found",
    });
  }

  maintenanceRecords[recordIndex] = {
    ...maintenanceRecords[recordIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Maintenance record updated successfully",
    data: maintenanceRecords[recordIndex],
  });
});

// Delete maintenance record
router.delete("/:id", (req, res) => {
  const recordId = Number(req.params.id);
  const recordExists = maintenanceRecords.some(
    (record) => record.id === recordId
  );

  if (!recordExists) {
    return res.status(404).json({
      success: false,
      message: "Maintenance record not found",
    });
  }

  maintenanceRecords = maintenanceRecords.filter(
    (record) => record.id !== recordId
  );

  res.status(200).json({
    success: true,
    message: "Maintenance record deleted successfully",
  });
});

module.exports = router;