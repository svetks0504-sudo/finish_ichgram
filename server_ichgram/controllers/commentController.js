import Post from "../models/Post.js";
import Comments from "../models/Comment.js";
import Notification from "../models/Notification.js";
export const createComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const { postId, text } = req.body;
    if (!postId || !text) {
      return res.status(400).json({
        message: "Post ID and text are required",
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
    const comment = await Comments.create({
      postId,
      userId,
      text,
    });
    post.commentsCount += 1;

    if (!post.userId.equals(userId)) {
      await Notification.create({
        receiver: post.userId,
        sender: userId,
        type: "comment",
      });
    }
    const populatedComment = await Comments.findById(comment._id).populate(
      "userId",
      "username avatar",
    );

    await post.save();
    res.status(201).json({
      message: "Comment created successfully",
      success: true,
      comment: populatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.query;
    if (!postId) {
      return res.status(400).json({
        message: "Post ID is required",
        success: false,
      });
    }
    const comments = await Comments.find({ postId }).populate(
      "userId",
      "username avatar",
    );
    res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      comments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Comment ID is required",
        success: false,
      });
    }
    const comment = await Comments.findById(id).populate(
      "userId",
      "username avatar",
    );
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Comment fetched successfully",
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const editComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    if (!id || !text) {
      return res.status(400).json({
        message: "Comment ID and text are required",
        success: false,
      });
    }
    const comment = await Comments.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { text },
      { new: true },
    );
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Comment updated successfully",
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { postId } = req.body;
    const { id } = req.params;
    if (!postId || !id) {
      return res.status(400).json({
        message: "Post and comment ID are required",
        success: false,
      });
    }
    const comment = await Comments.findOneAndDelete({
      _id: id,
      postId,
      userId: req.user._id,
    });
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
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

    post.commentsCount -= 1;
    await post.save();
    res.status(200).json({
      message: "Comment deleted",
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
