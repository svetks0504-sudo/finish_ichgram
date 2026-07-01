import express from "express";
import authJWTMiddleware from "../middleware/auth.js";
import {
  createComment,
  getComments,
  getComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", authJWTMiddleware, createComment);
router.get("/", authJWTMiddleware, getComments);
router.get("/:id", authJWTMiddleware, getComment);
router.put("/:id", authJWTMiddleware, editComment);
router.delete("/:id", authJWTMiddleware, deleteComment);

export default router;
