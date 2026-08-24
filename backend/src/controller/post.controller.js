import { postService } from "../services/post.service.js";

//Create a post
const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({
      message: "Post create successfully",
      post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Internal Server error",
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Internal Server error",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.status(200).json({
      message: "Post updated Successfully",
      post,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Internal Server error",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    await postService.deletePost(req.params.id);
    res.status(200).json({
      message: "Post successfully deleted",
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Internal Server error",
    });
  }
};

export { createPost, getPosts, updatePost, deletePost };
