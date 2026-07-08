import express from "express";
import authJWTMiddleware from "../middleware/auth.js";
import {
  addLike,
  removeLike,
  getLikes,
} from "../controllers/likeComtroller.js";

const router = express.Router();

router.get("/", authJWTMiddleware, getLikes);
router.post("/", authJWTMiddleware, addLike);
router.delete("/", authJWTMiddleware, removeLike);

export default router;
