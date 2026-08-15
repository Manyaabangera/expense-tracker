const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
    try {
        // Check required fields
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.password
        ) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check whether email already exists
        const existingUser = await User.findOne({
            email: req.body.email
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            });
        }

        // Create user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // Validate user before saving
        await user.validate();

        // Hash password
        user.password = await bcrypt.hash(
            user.password,
            10
        );

        // Save user to MongoDB
        await user.save();

        // Send JSON response
        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// LOGIN USER
const loginUser = async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({
            email: req.body.email
        });

        // User not found
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Check password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Send login response
        res.status(200).json({
            message: "Login Successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser
};