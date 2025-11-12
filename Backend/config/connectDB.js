import mongoose from "mongoose";
import { config } from "dotenv";
config();

if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI is not defined in .env file")
}

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB is connected");       
    } catch (error) {
        console.log("DB is not connected", error);
        process.exit(1)   // exit process with failure
    }
}