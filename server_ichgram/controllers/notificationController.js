import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ receiver: userId })
      .populate("sender", "username avatar")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Notifications fetched successfully",
      success: true,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notifId = req.params.id;

    const notifToEddit = await Notification.findByIdAndUpdate(
      { _id: notifId, receiver: req.user._id },
      { isRead: true },
      { new: true },
    );
    if (!notifToEddit) {
      return res.status(404).json({
        message: "Notification not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Notification marked as read",
      success: true,
      notifToEddit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notifId = req.params.id;
    const notification = await Notification.findByIdAndDelete({
      _id: notifId,
      receiver: req.user._id,
    });
    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Notifications deleted successfully",
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
