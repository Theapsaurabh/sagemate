import mongoose from "mongoose";
import { logger } from "./logger"; 

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://theapsaurabh:ZzRnBlec9yNsj5Aa@cluster0.cxam4.mongodb.net/SageMate";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    logger.info("MongoDB connected successfully!");
  } catch (error) {
    logger.error(" MongoDB connection failed:", error);
    process.exit(1); 
  }
};
