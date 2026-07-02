const express = require("express");

const router = express.Router();

const {
  getVehicles,
  getVehicleCount,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

router.get("/", getVehicles);

router.get("/count", getVehicleCount);

router.post("/", createVehicle);

router.put("/:id", updateVehicle);

router.delete("/:id", deleteVehicle);

module.exports = router;