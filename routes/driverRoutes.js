const express = require("express");

const {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
  getDriverCount,
} = require("../controllers/driverController");

const router = express.Router();

router.get("/count", getDriverCount);
router.get("/", getDrivers);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

module.exports = router;