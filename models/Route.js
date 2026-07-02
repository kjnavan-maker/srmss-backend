const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeNo: {
      type: String,
      required: [true, "Route number is required"],
      trim: true,
      unique: true,
    },
    startPoint: {
      type: String,
      required: [true, "Start point is required"],
      trim: true,
    },
    endPoint: {
      type: String,
      required: [true, "End point is required"],
      trim: true,
    },
    distance: {
      type: String,
      default: "Not specified",
      trim: true,
    },
    estimatedTime: {
      type: String,
      default: "Not specified",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);