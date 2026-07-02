const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    busNo: {
      type: String,
      required: true,
      trim: true,
    },
    issueType: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "No description",
      trim: true,
    },
    reportedDate: {
      type: String,
      required: true,
    },
    serviceDate: {
      type: String,
      default: "Not scheduled",
    },
    cost: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);