const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Driver name is required"],
      trim: true,
    },
    licenseNo: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    assignedRoute: {
      type: String,
      default: "Not assigned",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Available", "On Duty", "Inactive"],
      default: "Available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);