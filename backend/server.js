const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const housingRoutes = require("./routes/housingRoutes");
const immigrationRoutes = require("./routes/immigrationRoutes");
const foodRoutes = require("./routes/foodRoutes");
const healthcareRoutes = require("./routes/healthcareRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/housing", housingRoutes);
app.use("/api/immigration", immigrationRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/healthcare", healthcareRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Congolese Community Support System");
});

app.get("/test-housing", (req, res) => {
  res.send("Housing route test works");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});