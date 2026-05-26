const mongoose = require("mongoose");

const housingRequestSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },

    userName: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    needType: {
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

module.exports = mongoose.model("HousingRequest", housingRequestSchema);