import mongoose, { Schema, Document,Types } from "mongoose";


export interface IChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: any; 
}


export interface IChatSession extends Document {
  sessionId: string;
  userId: Types.ObjectId;  
  messages: IChatMessage[];
  startTime: Date;
  status: "active" | "inactive" | "closed"; 
  createdAt: Date;
  updatedAt: Date;
}


const chatMessageSchema = new Schema<IChatMessage>({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    technique: String,
    goal: String,
    progress: [Schema.Types.Mixed],
  },
});

const chatSessionSchema = new Schema<IChatSession>(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [chatMessageSchema],
  },
  {
    timestamps: true,
  }
);

export const ChatSession = mongoose.model<IChatSession>(
  "ChatSession",
  chatSessionSchema
);