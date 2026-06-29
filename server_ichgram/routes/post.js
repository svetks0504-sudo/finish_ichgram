import express from "express";
import { createPost, getPosts, getPost, editPost, deletePost} from "../controllers/postController.js";
import authJWTMiddleware from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import upload from "../middleware/upload.js"

const router = express.Router();

router.get("/", authJWTMiddleware, getPosts);
router.post("/", authJWTMiddleware, upload.array("images", 10), checkRole, createPost);
router.get("/:id", authJWTMiddleware, getPost);
router.put("/:id", authJWTMiddleware, upload.array("images", 10), checkRole, editPost);
router.delete("/:id", authJWTMiddleware, deletePost);


export default router;