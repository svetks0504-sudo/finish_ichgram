import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import dns from "dns";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { email, fullName, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Username, email and password are requered!",
        success: false,
      });
    }
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      fullName,
      username,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "Created successeful!",
      success: true,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({
        message: "Username or email and password are required",
        success: false,
      });
    }
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }],
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        plan: user.plan,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

export const forgotPassUser = async (req, res) => {
  try {
    const { login } = req.body;
    if (!login) {
      return res.status(400).json({
        message: "Email or username is required!",
      });
    }
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }],
    });
    if (!user)
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const dnsResult = await dns.promises.resolve4("smtp.gmail.com");
    console.log("GMAIL IPV4:", dnsResult);
    м;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Reset Password",
      html: `<a href="${process.env.CLIENT_URL}/reset?token=${token}">
           Reset password
         </a>`,
    });
    return res.status(200).json({
      message: "Password reset email sent",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const resetPassUser = async (req, res) => {
  try {
    const { password, passwordRepeat } = req.body;
    const { token } = req.query;
    if (!password || !passwordRepeat) {
      return res.status(400).json({
        message: "Password and repeat password  are required!",
        success: false,
      });
    }
    if (password !== passwordRepeat) {
      return res.status(400).json({
        message: "Passwords do not match!",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password has been reset successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message,
    });
  }
};
