import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
      password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("User", userSchema);
export default User;