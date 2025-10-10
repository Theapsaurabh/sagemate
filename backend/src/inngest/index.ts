import { Inngest } from "inngest";

// ✅ FIX: Add event key and proper configuration
export const inngest = new Inngest({ 
  id: "ai-therapy-agent",
  eventKey: process.env.INNGEST_EVENT_KEY || "local-dev-key"
});

// Create an empty array where we'll export future Inngest functions
export const functions = [];