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
      likes: 0,
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: "Failed to create story" });
  }
};

exports.updateStory = async (req, res) => {
  try {
    const { story } = req.body;

    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { story },
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: "Failed to update story" });
  }
};

exports.commentStory = async (req, res) => {
  try {
    const { name, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            name: name || "Anonymous User",
            text,
          },
        },
      },
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

exports.likeStory = async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!updatedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json(updatedStory);
  } catch (error) {
    console.error("LIKE STORY ERROR:", error);
    res.status(500).json({ message: "Failed to like story" });
  }
};

exports.deleteStory = async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.id);

    if (!deletedStory) {
      return res.status(404).json({ message: "Story not found" });
    }

    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete story" });
  }
};