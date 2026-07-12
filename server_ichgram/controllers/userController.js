import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const getMe = async (req, res) => {
  try {
    const user = req.user.toObject();
    delete user.password;

    res.status(200).json({
      message: "Fetched user successfully!",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Fetched user successfully!",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { searchText } = req.query;

    if (!searchText) {
      return res.status(200).json({
        success: true,
        users: [],
      });
    }

    const users = await User.find({
      username: { $regex: searchText, $options: "i" },
    });

    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      success: false,
      message: error.message,
    });
  }
};

export const chatUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("following", "username fullName avatar")
      .populate("followers", "username fullName avatar");

    const users = [...user.following, ...user.followers];

    const chatUsers = [];

    for (const user of users) {
      const exists = chatUsers.find(
        (userChat) => userChat._id.toString() === user._id.toString(),
      );
      if (!exists) {
        chatUsers.push(user);
      }
    }

    res.status(200).json({
      message: "Fetched users successfully!",
      success: true,
      chatUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      success: false,
      error: error.message,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { followUserId } = req.body;
    const user = req.user;
    const { username, bio, website } = req.body;

    if (followUserId) {
      const userToFollow = await User.findById(followUserId);

      if (!userToFollow) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      if (user._id.equals(userToFollow._id)) {
        return res.status(400).json({
          success: false,
          message: "You cannot follow yourself",
        });
      }

      if (!user.following.some((id) => id.equals(userToFollow._id))) {
        user.following.push(userToFollow._id);
        userToFollow.followers.push(user._id);
        await Notification.create({
          receiver: userToFollow._id,
          sender: user._id,
          type: "follow",
        });
      } else {
        user.following.pull(userToFollow._id);
        userToFollow.followers.pull(user._id);
      }

      await userToFollow.save();
    }

    if (username !== undefined) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (website !== undefined) user.website = website;
    if (req.file) {
      user.avatar = req.file.filename;
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Operation completed successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
