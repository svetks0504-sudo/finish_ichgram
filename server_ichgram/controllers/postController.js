import Post from "../models/Post.js";
import Comments from "../models/Comment.js";
import Like from "../models/Like.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 });

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
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Fetched post successfully",
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

export const editPost = async (req, res) => {
  try {
    const { description } = req.body;
    const imagePaths = req.files?.map((file) => file.filename);

    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    post.description = description || post.description;
    if (imagePaths && imagePaths.length > 0) {
      post.images = imagePaths;
    }

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
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

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const postDelete = await Post.findOneAndDelete({
      _id: postId,
      userId: req.user._id,
    });
    if (!postDelete) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    await Comments.deleteMany({ postId: postDelete._id });
    await Like.deleteMany({ postId: postDelete._id });

    res.status(200).json({
      message: `Post "${postDelete.description}" deleted successfully`,
      success: true,
      post: postDelete,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
