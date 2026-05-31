const FoodRequest = require("../models/FoodRequest");

const createFoodRequest = async (req, res) => {
  try {
    const request = await FoodRequest.create({
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      foodNeed: req.body.foodNeed,
      householdSize: req.body.householdSize,
      urgency: req.body.urgency,
      description: req.body.description,
      fileUrl: req.body.fileUrl || "",
      fileName: req.body.fileName || ""
    });

    res.status(201).json({
      message: "Food request submitted successfully",
      request
    });
  } catch (error) {
    console.error("FOOD CREATE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getFoodRequests = async (req, res) => {
  try {
    const requests = await FoodRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFoodRequest = async (req, res) => {
  try {
    await FoodRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFoodRequestStatus = async (req, res) => {
  try {
    const request = await FoodRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.status(200).json({
      message: "Request marked as resolved",
      request
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFoodRequest,
  getFoodRequests,
  deleteFoodRequest,
  updateFoodRequestStatus
};