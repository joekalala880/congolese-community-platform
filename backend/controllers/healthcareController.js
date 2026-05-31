const HealthcareRequest = require("../models/HealthcareRequest");

const createHealthcareRequest = async (req, res) => {
  try {
    const {
      userEmail,
      userName,
      healthNeed,
      urgency,
      description,
      fileUrl,
      fileName
    } = req.body;

    const request = await HealthcareRequest.create({
      userEmail,
      userName,
      healthNeed,
      urgency,
      description,
      fileUrl: fileUrl || "",
      fileName: fileName || ""
    });

    res.status(201).json({
      message: "Healthcare request submitted successfully",
      request
    });
  } catch (error) {
    console.error("HEALTHCARE CREATE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getHealthcareRequests = async (req, res) => {
  try {
    const requests = await HealthcareRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    console.error("HEALTHCARE GET ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteHealthcareRequest = async (req, res) => {
  try {
    await HealthcareRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Healthcare request deleted successfully" });
  } catch (error) {
    console.error("HEALTHCARE DELETE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const resolveHealthcareRequest = async (req, res) => {
  try {
    const request = await HealthcareRequest.findByIdAndUpdate(
      req.params.id,
      { status: "Resolved" },
      { new: true }
    );

    res.status(200).json({
      message: "Healthcare request resolved",
      request
    });
  } catch (error) {
    console.error("HEALTHCARE UPDATE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHealthcareRequest,
  getHealthcareRequests,
  deleteHealthcareRequest,
  resolveHealthcareRequest
};