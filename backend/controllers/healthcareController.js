const HealthcareRequest = require("../models/HealthcareRequest");

const createHealthcareRequest = async (req, res) => {
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
      message: "Healthcare request submitted successfully",
      request
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getHealthcareRequests = async (req, res) => {
  try {
    const requests = await HealthcareRequest.find().sort({ createdAt: -1 });

    res.status(200).json(requests);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const deleteHealthcareRequest = async (req, res) => {
  try {
    await HealthcareRequest.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Healthcare request deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
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
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createHealthcareRequest,
  getHealthcareRequests,
  deleteHealthcareRequest,
  resolveHealthcareRequest
};