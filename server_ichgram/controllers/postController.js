import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id });

    res.status(200).json({
      message: "Posts retrieved successfully",
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description || !req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "Description and images are required!",
        success: false,
      });
    }

    const imagePaths = req.files.map((file) => file.filename);
    const userId = req.user._id;
    const post = await Post.create({
      description,
      images: imagePaths,
      userId,
    });

    res.status(201).json({
      message: "Post created successfully!",
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const getPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const editPost = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const postId = req.params.id;
    const postDelete = await Post.findOneAndDelete({
      _id: postId,
      userId: userId,
    });
    if (!postDelete) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    await Comment.deleteMany({ postId });
    await Like.deleteMany({ postId });

    res.status(200).json({
      message: `${postDelete} deleted successfully`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
