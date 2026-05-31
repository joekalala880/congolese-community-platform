const HousingRequest = require("../models/HousingRequest");

const createHousingRequest = async (req, res) => {
  try {
    const {
      userEmail,
      userName,
      address,
      needType,
      urgency,
      description,
      fileUrl,
      fileName
    } = req.body;

    const request = await HousingRequest.create({
      userEmail,
      userName,
      address,
      needType,
      urgency,
      description,
      fileUrl,
      fileName
    });

    res.status(201).json({
      message: "Housing request submitted successfully",
      request
    });
  } catch (error) {
    console.error("HOUSING CREATE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getHousingRequests = async (req, res) => {
  try {
    const requests = await HousingRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("HOUSING GET ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteHousingRequest = async (req, res) => {
  try {
    await HousingRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Request deleted successfully"
    });
  } catch (error) {
    console.error("HOUSING DELETE ERROR:", error.message);
    res.status(500).json({ message: error.message });
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
    console.error("HOUSING UPDATE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHousingRequest,
  getHousingRequests,
  deleteHousingRequest,
  updateHousingRequestStatus
};