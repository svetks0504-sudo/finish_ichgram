import Like from "../models/Like.js";
import Post from "../models/Post.js";
import Notification from "../models/Notification.js";

export const getLikes = async (req, res) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({
        message: "Post ID is required",
        success: false,
      });
    }

    const likes = await Like.find({ postId }).populate(
      "userId",
      "username avatar",
    );

    res.status(200).json({
      success: true,
      likes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

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
    const like = await Like.create({
      postId,
      userId,
    });
    post.likesCount += 1;

    if (!post.userId.equals(userId)) {
      await Notification.create({
        receiver: post.userId,
        sender: userId,
        type: "like",
      });
    }

    await post.save();

    res.status(200).json({
      message: "Like added",
      success: true,
      like,
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
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
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
      like,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server errors",
      success: false,
      error: error.message,
    });
  }
};
