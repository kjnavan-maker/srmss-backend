const Route = require("../models/Route");

// Get all routes
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch routes",
      error: error.message,
    });
  }
};

// Add new route
exports.createRoute = async (req, res) => {
  try {
    const { routeNo, startPoint, endPoint, distance, estimatedTime, status } =
      req.body;

    if (!routeNo || !startPoint || !endPoint) {
      return res.status(400).json({
        success: false,
        message: "Route number, start point, and end point are required",
      });
    }

    const existingRoute = await Route.findOne({ routeNo });

    if (existingRoute) {
      return res.status(400).json({
        success: false,
        message: "Route number already exists",
      });
    }

    const route = await Route.create({
      routeNo,
      startPoint,
      endPoint,
      distance,
      estimatedTime,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Route added successfully",
      data: route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add route",
      error: error.message,
    });
  }
};

// Update route
exports.updateRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Route updated successfully",
      data: route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update route",
      error: error.message,
    });
  }
};

// Delete route
exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: "Route not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Route deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete route",
      error: error.message,
    });
  }
};

// Count routes for dashboard
exports.getRouteCount = async (req, res) => {
  try {
    const count = await Route.countDocuments();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to count routes",
      error: error.message,
    });
  }
};