import Like from "../models/Like";
import Post from "../models/Post.js";

export const addLike = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({
        message: "Post ID is required",
        success: false,
      });
    }
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }
    const existingLike = await Like.findOne({
      postId,
      userId,
    });
    if (existingLike) {
      return res.status(400).json({
        message: "You already liked this post",
        success: false,
      });
    }
    await Like.create({
      postId,
      userId,
    });
    post.likesCount += 1;
    await post.save();

    res.status(200).json({
      message: "Like added",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server errors",
      success: false,
      error: error.message,
    });
  }
};

export const removeLike = async (req, res) => {
  try {
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({
        message: "Post ID is required",
        success: false,
      });
    }
    const like = await Like.findOneAndDelete({
      postId,
      userId: req.user._id,
    });
    if (!like) {
      return res.status(404).json({
        message: "Like not found",
        success: false,
      });
    }
    post.likesCount -= 1;
    await post.save();
    res.status(200).json({
      message: "Like deleted",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server errors",
      success: false,
      error: error.message,
    });
  }
};
