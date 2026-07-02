const express = require("express");

const {
  getFuelLogs,
  getFuelLogCount,
  createFuelLog,
  updateFuelLog,
  deleteFuelLog,
} = require("../controllers/fuelLogController");

const router = express.Router();

router.get("/count", getFuelLogCount);
router.get("/", getFuelLogs);
router.post("/", createFuelLog);
router.put("/:id", updateFuelLog);
router.delete("/:id", deleteFuelLog);

module.exports = router;