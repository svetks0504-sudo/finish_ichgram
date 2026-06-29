import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Post",
        required: true,
    },
    text: {
        type: String,
        required: true,
        minlength: 3,
    },
  },
  {
    timestamps: true,
  },
);

const Comments = mongoose.model("Comments", commentSchema);
export default Comments;