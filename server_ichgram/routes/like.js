import express from "express";
import authJWTMiddleware from "../middleware/auth.js"

const router = express.Router();

router.post("/", authJWTMiddleware, addLike);
router.delete("/", authJWTMiddleware, removeLike);

export default router;