import express from "express";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";
import authJWTMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authJWTMiddleware, getNotifications);
router.put("/:id", authJWTMiddleware, markAsRead);
router.delete("/:id", authJWTMiddleware, deleteNotification);

export default router;
