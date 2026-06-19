import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
      password: {
        type: String,
        required: true,
        unique: true,
    }
})

const User = mongoose.model("User", userSchema);
export default User;