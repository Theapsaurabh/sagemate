import express from "express";
import { auth } from "../middleware/auth";
import { createMood } from "../controllers/moodControllers";
const moodRouter= express.Router();
moodRouter.use(auth);
moodRouter.post("/", createMood);
export default moodRouter;

