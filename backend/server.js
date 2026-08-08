const express = require("express");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server Started");
});