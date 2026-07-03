import Post from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username avatar")
      .sort({ createdAt: -1 });

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

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "userId",
      "username avatar",
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Posts retrieved successfully",
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
