const express = require("express");
const router = express.Router();

const {
  getStories,
  createStory,
  deleteStory,
  updateStory,
} = require("../controllers/storyController");

router.get("/", getStories);
router.post("/", createStory);
router.delete("/:id", deleteStory);
router.put("/:id", updateStory);

module.exports = router;