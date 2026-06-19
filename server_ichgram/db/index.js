import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_uri = process.env.DB_URI ||"uri";

async function connectDB(db_uri){
    try{
        await mongoose.connect(db_uri);
        console.log(`Connected to MongoDB at ${db_uri}`)
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
}