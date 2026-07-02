const express = require("express");

const {
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
  getRouteCount,
} = require("../controllers/routeController");

const router = express.Router();

router.get("/count", getRouteCount);
router.get("/", getRoutes);
router.post("/", createRoute);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

module.exports = router;