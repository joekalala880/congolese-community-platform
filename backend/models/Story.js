const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    name: String,
    story: String,
    userEmail: String,

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);