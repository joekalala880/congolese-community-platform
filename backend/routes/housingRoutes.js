const express = require("express");

const {
  createHousingRequest,
  getHousingRequests,
  deleteHousingRequest,
  updateHousingRequestStatus
} = require("../controllers/housingController");

const router = express.Router();

router.post("/request", createHousingRequest);
router.get("/requests", getHousingRequests);
router.delete("/request/:id", deleteHousingRequest);
router.put("/request/:id", updateHousingRequestStatus);

module.exports = router;