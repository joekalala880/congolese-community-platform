const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);