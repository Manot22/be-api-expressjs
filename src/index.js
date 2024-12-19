const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const UPLOAD_PATH = path.join(__dirname, "/uploads");

app.use(express.json());
app.use("/uploads", express.static(UPLOAD_PATH));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const rentalRoutes = require("./routes/rentalRoutes");

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", carRoutes);
app.use("/api/v1/", rentalRoutes);

app.get("/", (req, res) => {
  res.send(`Api connected in Port: ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server running on Port: ${PORT}`);
});

module.exports = app;
