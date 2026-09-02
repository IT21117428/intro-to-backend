import { Post } from "../models/post.model.js";

const create = async (postData) => {
    return await Post.create(postData);
};

const findAll = async () => {
    return await Post.find();
};

const updateById = async (id, updateData) => {
    return await Post.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteById = async (id) => {
    return await Post.findByIdAndDelete(id);
};

export const postRepository = {
    create,
    findAll,
    updateById,
    deleteById
};
