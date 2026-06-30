import express from "express";
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
router.delete("/:id", authJWTMiddleware, editComment);
router.put("/:id", authJWTMiddleware, deleteComment);

export default router;
