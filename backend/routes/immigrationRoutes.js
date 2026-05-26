const express = require("express");

const {
  createImmigrationRequest,
  getImmigrationRequests,
  deleteImmigrationRequest,
  resolveImmigrationRequest
} = require("../controllers/immigrationController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Immigration route works");
});

router.post("/request", createImmigrationRequest);
router.get("/requests", getImmigrationRequests);
router.delete("/request/:id", deleteImmigrationRequest);
router.put("/request/:id", resolveImmigrationRequest);

module.exports = router;