import jwt from "jsonwebtoken";
import { User } from "../../src/models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are important!" })
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "user already exists!" });
        }

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({
            message: "User registered!",
            user: { id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token expires in 1 day
        );

        res.status(200).json({
            message: "User Logged in",
            token, // Send token to frontend
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const logoutUser = async (req, res) => {
    try {
        const email = req.user.email; // get from JWT payload

        const user = await User.findOne({
            email
        });

        if (!user) return res.status(404).json({
            message: "User not found"
        });

        res.status(200).json({
            message: "Logout successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error", error
        })
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};