import express, { Request, Response } from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest";
import { functions as inngestFunctions } from "./inngest/functions"; 
import { logger } from "./utils/logger";
import { connectDB } from "./utils/db";
import dotenv from "dotenv"
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth"
import { errorHandler } from "./middleware/errorHandler";
import chatRouter from "./routes/chat";
import moodRouter from "./routes/mood";
import activityRouter from "./routes/activity";

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

// ✅ FIX: Register Inngest endpoint BEFORE other routes
app.use("/api/inngest", serve({
  client: inngest,
  functions: inngestFunctions,
}));

app.use("/auth", authRoutes)
app.use("/chat", chatRouter);
app.use("/api/mood", moodRouter);
app.use("/api/activity", activityRouter);

app.use(errorHandler);

const startServer = async() => {
    try {
        await connectDB();
        const PORT = process.env.PORT ;
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
            logger.info(`Inngest endpoint available at http://localhost:${PORT}/api/inngest`);
        });
    } catch(error) {
        logger.error("Failed to start server: ", error);
        process.exit(1);
    }
}

startServer();