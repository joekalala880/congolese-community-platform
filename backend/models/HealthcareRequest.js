const mongoose = require("mongoose");

const healthcareRequestSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },

    userName: {
      type: String,
      required: true
    },

    healthNeed: {
      type: String,
      required: true
    },

    urgency: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "HealthcareRequest",
  healthcareRequestSchema
);