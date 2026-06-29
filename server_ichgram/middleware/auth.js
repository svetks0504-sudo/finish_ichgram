import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

async function authJWTMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader && !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false,
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden: Invalid or expired token",
      success: false,
    });
  }
}

export default authJWTMiddleware;
