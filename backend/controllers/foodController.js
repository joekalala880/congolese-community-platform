const FoodRequest = require("../models/FoodRequest");

const createFoodRequest = async (req, res) => {
  try {
    const {
      userEmail,
      userName,
      foodNeed,
      householdSize,
      urgency,
      description
    } = req.body;

    const request = await FoodRequest.create({
      userEmail,
      userName,
      foodNeed,
      householdSize,
      urgency,
      description
    });

    res.status(201).json({
      message: "Food assistance request submitted successfully",
      request
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getFoodRequests = async (req, res) => {
  try {
    const requests = await FoodRequest.find().sort({ createdAt: -1 });

    res.status(200).json(requests);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const deleteFoodRequest = async (req, res) => {
  try {
    await FoodRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Food request deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const resolveFoodRequest = async (req, res) => {
  try {
    const request = await FoodRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.status(200).json({
      message: "Food request resolved",
      request
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createFoodRequest,
  getFoodRequests,
  deleteFoodRequest,
  resolveFoodRequest
};