import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { connect } from "mongoose";
import authRouter from "./routes/auth.js"
import cors from "cors";


dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
const db_uri = process.env.DB_URI || "uri";

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.listen(port, () => {
  connectDB(db_uri);
  console.log(`Server is running at http://127.0.0.1:${port}`);
});
