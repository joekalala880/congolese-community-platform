const express = require("express");

const {
  createFoodRequest,
  getFoodRequests,
  deleteFoodRequest,
  updateFoodRequestStatus
} = require("../controllers/foodController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Food route works");
});

router.post("/request", createFoodRequest);

router.get("/requests", getFoodRequests);

router.delete("/request/:id", deleteFoodRequest);

router.put("/request/:id", updateFoodRequestStatus);

module.exports = router;