import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import likeRouter from "./routes/like.js";
import postAllRouter from "./routes/postAll.js";
import commentsRouter from "./routes/comment.js";
import chatRouter from "./routes/chat.js";
import userRouter from "./routes/user.js";
import notificationRouter from "./routes/notification.js";
import cors from "cors";
import http from "http";
import initSocket from "./socket/index.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const db_uri = process.env.DB_URI || "uri";

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/posts/my", postRouter);
app.use("/posts", postAllRouter);
app.use("/uploads", express.static("uploads"));
app.use("/likes", likeRouter);
app.use("/comments", commentsRouter);
app.use("/user", userRouter);
app.use("/notification", notificationRouter);
app.use("/chat", chatRouter);

initSocket(server);

server.listen(port, () => {
  connectDB(db_uri);
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
