import { Post } from "../models/post.model.js";

const createPost = async (postData) => {
    const { name, description, age } = postData;

    if (!name || !description || !age) {
        throw { status: 400, message: "All fields are required" };
    }

    const post = await Post.create({ name, description, age });
    return post;
};

const getPosts = async () => {
    const posts = await Post.find();
    return posts;
};

const updatePost = async (id, updateData) => {
    if (Object.keys(updateData).length === 0) {
        throw { status: 400, message: "No data provided for update" };
    }

    const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
    if (!post) {
        throw { status: 404, message: "Post not found" };
    }
    
    return post;
};

const deletePost = async (id) => {
    const deleted = await Post.findByIdAndDelete(id);
    if (!deleted) {
        throw { status: 404, message: "Post not found" };
    }
    return deleted;
};

export const postService = {
    createPost,
    getPosts,
    updatePost,
    deletePost
};
