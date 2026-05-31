const mongoose = require("mongoose");

const immigrationRequestSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    caseType: { type: String, required: true },
    urgency: { type: String, required: true },
    description: { type: String, required: true },

    fileUrl: { type: String, default: "" },
    fileName: { type: String, default: "" },

    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ImmigrationRequest", immigrationRequestSchema);