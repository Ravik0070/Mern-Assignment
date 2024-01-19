const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Load environment variables from a .env file
dotenv.config();

const mongoString = process.env.DBString;
const PORT = process.env.PORT || 5000;
// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors({ origin: true }));
//Database connection
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

database.once("connected", () => {
  console.log("Connected to MongoDB");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

//For handling routes under /api/auth
app.use("/api/auth/", authRoutes);
app.use("/api/note/", noteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
