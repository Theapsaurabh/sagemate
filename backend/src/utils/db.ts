import mongoose from "mongoose";
import { logger } from "./logger"; 


let MONGODB_URI: string | undefined;

const getMongoURI = () => {
  if (!MONGODB_URI) {
    MONGODB_URI = process.env.MONGODB_URI;
   
    console.log('MONGODB_URI:', MONGODB_URI ? `✅ Loaded (${MONGODB_URI.length} chars)` : '❌ Missing');
  }
  return MONGODB_URI;
};

export const connectDB = async () => {
  try {
    const mongoURI = getMongoURI();
    
    if (!mongoURI) {
      throw new Error("MongoDB connection string is not defined. Check MONGODB_URI environment variable.");
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully!');
    logger.info("MongoDB connected successfully!");
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    logger.error("MongoDB connection failed:", error);
    process.exit(1); 
  }
};