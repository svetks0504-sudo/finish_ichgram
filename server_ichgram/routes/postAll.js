import express from "express";
import { getAllPosts, getPost } from "../controllers/postAllController.js";
import authJWTMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authJWTMiddleware, getAllPosts);
router.get("/:id", authJWTMiddleware, getPost);

export default router;