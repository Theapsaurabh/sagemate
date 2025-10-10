import { Inngest } from "inngest";
import { functions as aiFunctions } from "./aiFunctions";

export const inngest = new Inngest({ 
  id: "ai-therapy-agent",
  eventKey: process.env.INNGEST_EVENT_KEY || "local-dev-key"
});

// ✅ FIX: Export functions properly
export const functions = [
  ...aiFunctions
];