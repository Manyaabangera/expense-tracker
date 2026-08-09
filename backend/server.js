const express = require("express");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", expenseRoutes);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(5000, () => {
            console.log("Server Started");
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

startServer();