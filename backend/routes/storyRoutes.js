const express = require("express");
const router = express.Router();

const {
  getStories,
  createStory,
  deleteStory,
  updateStory,
  likeStory,
  commentStory,
} = require("../controllers/storyController");

router.get("/", getStories);
router.post("/", createStory);
router.put("/:id", updateStory);
router.put("/:id/like", likeStory);
router.delete("/:id", deleteStory);
router.put("/:id/comment", commentStory);

module.exports = router;