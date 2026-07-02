const express = require("express");

const {
  getMaintenanceRecords,
  getMaintenanceCount,
  createMaintenanceRecord,
  updateMaintenanceRecord,
  deleteMaintenanceRecord,
} = require("../controllers/maintenanceController");

const router = express.Router();

router.get("/count", getMaintenanceCount);
router.get("/", getMaintenanceRecords);
router.post("/", createMaintenanceRecord);
router.put("/:id", updateMaintenanceRecord);
router.delete("/:id", deleteMaintenanceRecord);

module.exports = router;