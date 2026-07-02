const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    busNo: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    assignedRoute: {
      type: String,
      default: "Not assigned",
    },
    status: {
      type: String,
      default: "Active",
    },
    lastService: {
      type: String,
      default: "Not recorded",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);