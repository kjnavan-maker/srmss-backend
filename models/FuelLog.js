const mongoose = require("mongoose");

const fuelLogSchema = new mongoose.Schema(
  {
    busNo: {
      type: String,
      required: true,
      trim: true,
    },
    fuelType: {
      type: String,
      required: true,
      trim: true,
      default: "Diesel",
    },
    liters: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    filledDate: {
      type: String,
      required: true,
    },
    odometerReading: {
      type: Number,
      default: 0,
    },
    driverName: {
      type: String,
      default: "Not recorded",
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FuelLog", fuelLogSchema);