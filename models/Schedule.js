const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    routeNo: {
      type: String,
      required: true,
      trim: true,
    },
    busNo: {
      type: String,
      required: true,
      trim: true,
    },
    driverName: {
      type: String,
      required: true,
      trim: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "On-time", "Delayed", "Completed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);