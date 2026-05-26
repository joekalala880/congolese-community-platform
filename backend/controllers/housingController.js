const HousingRequest = require("../models/HousingRequest");

const createHousingRequest = async (req, res) => {
  try {
    const {
      userEmail,
      userName,
      address,
      needType,
      urgency,
      description
    } = req.body;

    const request = await HousingRequest.create({
      userEmail,
      userName,
      address,
      needType,
      urgency,
      description
    });

    res.status(201).json({
      message: "Housing request submitted successfully",
      request
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getHousingRequests = async (req, res) => {
  try {
    const requests = await HousingRequest.find().sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteHousingRequest = async (req, res) => {
  try {
    await HousingRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Request deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateHousingRequestStatus = async (req, res) => {
  try {
    const request = await HousingRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.status(200).json({
      message: "Request marked as resolved",
      request
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createHousingRequest,
  getHousingRequests,
  deleteHousingRequest,
  updateHousingRequestStatus
};