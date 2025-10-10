/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "http://localhost:3001";

export async function GET(
  req: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params;
    console.log(`Getting chat history for session ${sessionId}`);
    
    // FIX: Correct endpoint URL
    const response = await fetch(
      `${BACKEND_API_URL}/chat/sessions/${sessionId}/history`, // FIXED: removed extra /session
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // ADD: Include auth token if needed
          "Authorization": req.headers.get("Authorization") || "",
        },
        credentials: "include",
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to get chat history:", error);
      return NextResponse.json(
        { error: error.message || "Failed to get chat history" },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    // FIX: Proper message formatting
    const formattedMessages = data.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp || msg.timeStamp // Handle both cases
    }));
    
    return NextResponse.json(formattedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}