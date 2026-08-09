const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
        message: "Name, email and password are required"
    });
}
const existingUser = await User.findOne({ email: req.body.email });
if (existingUser) {
    return res.status(400).json({
        message: "Email already registered"
    });
}
        const user = new User(req.body);

        await user.validate();

        user.password = await bcrypt.hash(user.password, 10);

        await user.save();

        res.send("User Registered");
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
        
    }
    const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
);
if (!isPasswordCorrect) {
    return res.status(400).json({
        message: "Invalid email or password"
    });
}
const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
);

res.json({
    message: "Login Successful",
    token: token
});
};

module.exports = {
    registerUser,
    loginUser
};