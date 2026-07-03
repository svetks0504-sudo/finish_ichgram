import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 200,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model("Post", postSchema);
export default Post;
