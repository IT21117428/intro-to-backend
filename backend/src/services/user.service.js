import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";

const registerUser = async (userData) => {
    const { username, email, password } = userData;

    if (!username || !email || !password) {
        throw { status: 400, message: "All fields are important!" };
    }

    const existing = await userRepository.findByEmail(email.toLowerCase());
    if (existing) {
        throw { status: 400, message: "User already exists!" };
    }

    const user = await userRepository.create({
        username,
        email: email.toLowerCase(),
        password,
    });

    return { id: user._id, email: user.email, username: user.username };
};

const loginUser = async (loginData) => {
    const { email, password } = loginData;

    if (!email || !password) {
         throw { status: 400, message: "Email and password are required" };
    }

    const user = await userRepository.findByEmail(email.toLowerCase());
    if (!user) {
        throw { status: 400, message: "User not found" };
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw { status: 400, message: "Invalid credentials" };
    }

    // Generate JWT Token
    const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Token expires in 1 day
    );

    return {
        token,
        user: { id: user._id, email: user.email, username: user.username }
    };
};

const logoutUser = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) {
        throw { status: 404, message: "User not found" };
    }
    return true;
};

export const userService = {
    registerUser,
    loginUser,
    logoutUser
};
