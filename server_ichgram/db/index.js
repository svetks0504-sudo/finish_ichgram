import mongoose from "mongoose";

async function connectDB(db_uri){
    try{
        await mongoose.connect(db_uri);
        console.log(`Connected to MongoDB at ${db_uri}`)
    }catch(error){
        console.log(`Error: ${error.message}`);
    }
}

export default connectDB;