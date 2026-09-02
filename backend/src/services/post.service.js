import { postRepository } from "../repositories/post.repository.js";

const createPost = async (postData) => {
    const { name, description, age } = postData;

    if (!name || !description || !age) {
        throw { status: 400, message: "All fields are required" };
    }

    const post = await postRepository.create({ name, description, age });
    return post;
};

const getPosts = async () => {
    const posts = await postRepository.findAll();
    return posts;
};

const updatePost = async (id, updateData) => {
    if (Object.keys(updateData).length === 0) {
        throw { status: 400, message: "No data provided for update" };
    }

    const post = await postRepository.updateById(id, updateData);
    if (!post) {
        throw { status: 404, message: "Post not found" };
    }
    
    return post;
};

const deletePost = async (id) => {
    const deleted = await postRepository.deleteById(id);
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
