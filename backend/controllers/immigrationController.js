const ImmigrationRequest = require("../models/ImmigrationRequest");

const createImmigrationRequest = async (req, res) => {
  try {
    const { userEmail, userName, caseType, urgency, description } = req.body;

    const request = await ImmigrationRequest.create({
      userEmail,
      userName,
      caseType,
      urgency,
      description
    });

    res.status(201).json({
      message: "Immigration request submitted successfully",
      request
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getImmigrationRequests = async (req, res) => {
  try {
    const requests = await ImmigrationRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteImmigrationRequest = async (req, res) => {
  try {
    await ImmigrationRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Immigration request deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const resolveImmigrationRequest = async (req, res) => {
  try {
    const request = await ImmigrationRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.status(200).json({
      message: "Immigration request resolved",
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
  createImmigrationRequest,
  getImmigrationRequests,
  deleteImmigrationRequest,
  resolveImmigrationRequest
};