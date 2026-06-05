const Story = require("../models/Story");

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
};

exports.createStory = async (req, res) => {
  try {
    const { name, story, userEmail } = req.body;

    const newStory = new Story({
      name,
      story,
      userEmail,
    });

    await newStory.save();

    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: "Failed to create story" });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete story" });
  }
};