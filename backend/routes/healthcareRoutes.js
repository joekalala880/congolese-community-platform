const express = require("express");

const {
  createHealthcareRequest,
  getHealthcareRequests,
  deleteHealthcareRequest,
  resolveHealthcareRequest
} = require("../controllers/healthcareController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Healthcare route works");
});

router.post("/request", createHealthcareRequest);

router.get("/requests", getHealthcareRequests);

router.delete("/request/:id", deleteHealthcareRequest);

router.put("/request/:id", resolveHealthcareRequest);

module.exports = router;