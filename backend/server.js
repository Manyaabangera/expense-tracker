const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

app.use((req, res, next) => {
    console.log("REQUEST RECEIVED:", req.method, req.originalUrl);
    next();
});

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