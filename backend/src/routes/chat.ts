import express from "express";
import {
  getSessionHistory,
  getChatSession,
  sendMessage,
  getChatHistory,
  getChatSessions, 
  createChatSession
} from "../controllers/chat";
import { auth } from "../middleware/auth";

const chatRouter = express.Router();

// Apply auth middleware to all routes
chatRouter.use(auth);

chatRouter.get("/sessions", getChatSessions); 
chatRouter.post("/sessions", createChatSession); 
chatRouter.post("/getSessionHistory", getSessionHistory);

chatRouter.get("/sessions/:sessionId", getChatSession);

chatRouter.post("/sessions/:sessionId/messages", sendMessage);

chatRouter.get("/sessions/:sessionId/history", getChatHistory);

export default chatRouter;