import { userService } from "../services/user.service.js";

const registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            message: "User registered!",
            user
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const data = await userService.loginUser(req.body);
        res.status(200).json({
            message: "User Logged in",
            token: data.token,
            user: data.user
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
};

const logoutUser = async (req, res) => {
    try {
        const email = req.user.email; // get from JWT payload via auth middleware
        await userService.logoutUser(email);
        res.status(200).json({
            message: "Logout successfully"
        });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
    }
};
export {
    registerUser,
    loginUser,
    logoutUser
};