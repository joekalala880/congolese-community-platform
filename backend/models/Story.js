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

    comments: [
      {
        name: String,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);