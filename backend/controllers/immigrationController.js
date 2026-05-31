const ImmigrationRequest = require("../models/ImmigrationRequest");

const createImmigrationRequest = async (req, res) => {
  try {
    const request = await ImmigrationRequest.create({
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      caseType: req.body.caseType,
      urgency: req.body.urgency,
      description: req.body.description,
      fileUrl: req.body.fileUrl || "",
      fileName: req.body.fileName || ""
    });

    res.status(201).json({
      message: "Immigration request submitted successfully",
      request
    });
  } catch (error) {
    console.error("IMMIGRATION CREATE ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getImmigrationRequests = async (req, res) => {
  try {
    const requests = await ImmigrationRequest.find().sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteImmigrationRequest = async (req, res) => {
  try {
    await ImmigrationRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateImmigrationRequestStatus = async (req, res) => {
  try {
    const request = await ImmigrationRequest.findByIdAndUpdate(
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
  createImmigrationRequest,
  getImmigrationRequests,
  deleteImmigrationRequest,
  updateImmigrationRequestStatus
};