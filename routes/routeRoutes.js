const express = require("express");

const router = express.Router();

let routes = [
  {
    id: 1,
    routeNo: "138",
    startPoint: "Pettah",
    endPoint: "Homagama",
    distance: "28 km",
    estimatedTime: "1h 20m",
    status: "Active",
  },
  {
    id: 2,
    routeNo: "100",
    startPoint: "Pettah",
    endPoint: "Panadura",
    distance: "32 km",
    estimatedTime: "1h 30m",
    status: "Active",
  },
];

// Get all routes
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: routes.length,
    data: routes,
  });
});

// Add new route
router.post("/", (req, res) => {
  const { routeNo, startPoint, endPoint, distance, estimatedTime, status } = req.body;

  if (!routeNo || !startPoint || !endPoint) {
    return res.status(400).json({
      success: false,
      message: "Route number, start point, and end point are required",
    });
  }

  const newRoute = {
    id: routes.length + 1,
    routeNo,
    startPoint,
    endPoint,
    distance: distance || "Not specified",
    estimatedTime: estimatedTime || "Not specified",
    status: status || "Active",
  };

  routes.push(newRoute);

  res.status(201).json({
    success: true,
    message: "Route added successfully",
    data: newRoute,
  });
});

// Update route
router.put("/:id", (req, res) => {
  const routeId = Number(req.params.id);
  const routeIndex = routes.findIndex((route) => route.id === routeId);

  if (routeIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }

  routes[routeIndex] = {
    ...routes[routeIndex],
    ...req.body,
  };

  res.status(200).json({
    success: true,
    message: "Route updated successfully",
    data: routes[routeIndex],
  });
});

// Delete route
router.delete("/:id", (req, res) => {
  const routeId = Number(req.params.id);
  const routeExists = routes.some((route) => route.id === routeId);

  if (!routeExists) {
    return res.status(404).json({
      success: false,
      message: "Route not found",
    });
  }

  routes = routes.filter((route) => route.id !== routeId);

  res.status(200).json({
    success: true,
    message: "Route deleted successfully",
  });
});

module.exports = router;