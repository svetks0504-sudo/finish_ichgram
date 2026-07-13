import Conversation from "../models/Conversation.js";

export const createChat = async (req, res) => {
  try {
    const myId = req.user.id;
    const { userId } = req.body;

    if (myId === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot create a chat with yourself.",
      });
    }

    let conversation = await Conversation.findOne({
      members: { $all: [myId, userId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [myId, userId],
      });
    }

    res.status(201).json({
      message: "Conversation created or fetched",
      success: true,
      conversation,
    });
  } catch (error) {
    console.log("CHAT ERROR:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
