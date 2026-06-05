const Story = require("../models/Story");

exports.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete story" });
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
    res.status(500).json({ message: "Failed to like story" });
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

exports.deleteStory = async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id);
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete story" });
  }
};