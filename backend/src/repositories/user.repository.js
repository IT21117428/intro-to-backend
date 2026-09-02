import { User } from "../models/user.model.js";

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const create = async (userData) => {
    return await User.create(userData);
};

export const userRepository = {
    findByEmail,
    create
};
