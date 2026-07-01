import express from "express";
import authJWTMiddleware from "../middleware/auth.js"
import { addLike, removeLike } from "../controllers/likeComtroller.js";

const router = express.Router();

router.post("/", authJWTMiddleware, addLike);
router.delete("/", authJWTMiddleware, removeLike);

export default router;