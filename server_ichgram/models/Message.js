import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);


const Message = mongoose.model("Message", messageSchema);
export default Message;