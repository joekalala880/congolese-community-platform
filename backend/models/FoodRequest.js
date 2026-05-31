const mongoose = require("mongoose");

const foodRequestSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    foodNeed: { type: String, required: true },
    householdSize: { type: String, required: true },
    urgency: { type: String, required: true },
    description: { type: String, required: true },

    fileUrl: { type: String, default: "" },
    fileName: { type: String, default: "" },

    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodRequest", foodRequestSchema);