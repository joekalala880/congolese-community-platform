const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  getUsers,
  deleteUser,
  updateUserRole
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", updateUserRole);

router.get("/test", (req, res) => {
  res.send("Auth routes working");
});

module.exports = router;