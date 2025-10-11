/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://sagemate-backend.onrender.com";

// Correct type for Next.js 15 App Router
interface RouteContext {
  params: Promise<{ sessionId: string }>;
}

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    // Await the params since they're a Promise in Next.js 15
    const { sessionId } = await context.params;
    
    console.log(`Getting chat history for session ${sessionId}`);
    
    const response = await fetch(
      `${BACKEND_API_URL}/chat/sessions/${sessionId}/history`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    
    // Add safety check for data format
    if (!Array.isArray(data)) {
      console.error("Invalid response format from backend:", data);
      return NextResponse.json(
        { error: "Invalid response format from server" },
        { status: 500 }
      );
    }
    
    const formattedMessages = data.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
      timestamp: msg.timestamp || msg.timeStamp || new Date().toISOString()
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