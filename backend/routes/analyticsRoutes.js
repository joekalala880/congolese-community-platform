const express = require("express");
const User = require("../models/User");
const HousingRequest = require("../models/HousingRequest");
const FoodRequest = require("../models/FoodRequest");
const HealthcareRequest = require("../models/HealthcareRequest");
const ImmigrationRequest = require("../models/ImmigrationRequest");

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const housingRequests = await HousingRequest.countDocuments();
    const foodRequests = await FoodRequest.countDocuments();
    const healthcareRequests = await HealthcareRequest.countDocuments();
    const immigrationRequests = await ImmigrationRequest.countDocuments();

    res.json({
      totalUsers,
      housingRequests,
      foodRequests,
      healthcareRequests,
      immigrationRequests,
      totalRequests:
        housingRequests +
        foodRequests +
        healthcareRequests +
        immigrationRequests,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load analytics" });
  }
});

module.exports = router;