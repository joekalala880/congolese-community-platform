const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, phone, password, concern } = req.body;

    console.log("FULL BODY:", req.body);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      phone,
      concern,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Account created successfully",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email"
      });
    }

    res.status(200).json({
      message: "Password reset request received. Admin will contact you."
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log("GET USERS ERROR:", error);
    res.status(500).json({
      message: "Server error loading users"
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.log("DELETE USER ERROR:", error);
    res.status(500).json({
      message: "Server error deleting user"
    });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    res.status(200).json(updatedUser);

  } catch (error) {
    console.log("UPDATE ROLE ERROR:", error);

    res.status(500).json({
      message: "Server error updating role"
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  getUsers,
  deleteUser,
  updateUserRole
};