import mongoose from "mongoose";

async function connectDB(db_uri) {
  try {
    console.log(
      "DB host:", 
      db_uri.replace(/\/\/.*?:.*?@/, "//***:***@")
    );
    console.log("Trying to connect to MongoDB...");

    await mongoose.connect(db_uri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

export default connectDB;
