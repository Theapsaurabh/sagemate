import { Key } from "readline";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChatMessage {
  id: Key | null | undefined;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    technique: string;
    goal: string;
    progress: any[];
    analysis?: {
      emotionalState: string;
      themes: string[];
      riskLevel: number;
      recommendedApproach: string;
      progressIndicators: string[];
    };
  };
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  status?: string;
}

export interface ApiResponse {
  message: string;
  response?: string;
  analysis?: {
    emotionalState: string;
    themes: string[];
    riskLevel: number;
    recommendedApproach: string;
    progressIndicators: string[];
  };
  metadata?: {
    technique: string;
    goal: string;
    progress: any[];
  };
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://sagemate-backend.onrender.com";

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  if (typeof window === 'undefined') {
    return {
      "Content-Type": "application/json",
    };
  }
  
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Get all chat sessions
export const getAllChatSessions = async (): Promise<ChatSession[]> => {
  try {
    console.log("Fetching all chat sessions...");
    const response = await fetch(`${API_BASE}/chat/sessions`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log("No chat sessions found, returning empty array");
        return [];
      }
      const error = await response.json();
      console.error("Failed to fetch chat sessions:", error);
      throw new Error(error.message || error.error || "Failed to fetch chat sessions");
    }

    const data = await response.json();
    console.log("✅ Received chat sessions:", data);
    
    return data.map((session: any) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
      messages: session.messages?.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })) || [],
    }));
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    // Return empty array instead of throwing for network errors
    if (error instanceof Error && error.message.includes("Failed to fetch")) {
      return [];
    }
    throw error;
  }
};

// Create chat session
export const createChatSession = async (): Promise<{ sessionId: string; message: string }> => {
  try {
    console.log("Creating new chat session...");
    const response = await fetch(`${API_BASE}/chat/sessions`, {
      method: "POST",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Failed to create chat session:", error);
      throw new Error(error.message || error.error || "Failed to create chat session");
    }

    const data = await response.json();
    console.log("✅ Chat session created:", data);
    return data;
  } catch (error) {
    console.error("Error creating chat session:", error);
    throw error;
  }
};

// Get specific chat session
export const getChatSession = async (sessionId: string): Promise<ChatSession | null> => {
  try {
    console.log(`Fetching chat session ${sessionId}...`);
    const response = await fetch(
      `${API_BASE}/chat/sessions/${sessionId}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.log("Chat session not found, returning null");
        return null;
      }
      const error = await response.json();
      console.error("Failed to fetch chat session:", error);
      throw new Error(error.message || error.error || "Failed to fetch chat session");
    }

    const data = await response.json();
    console.log("✅ Received chat session:", data);
    
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      messages: data.messages?.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })) || [],
    };
  } catch (error) {
    console.error("Error fetching chat session:", error);
    // Return null for not found instead of throwing
    if (error instanceof Error && (error.message.includes("not found") || error.message.includes("Failed to fetch"))) {
      return null;
    }
    throw error;
  }
};

// Send message
export const sendChatMessage = async (
  sessionId: string,
  message: string
): Promise<ApiResponse> => {
  try {
    console.log("🔍 DEBUG - Sending message details:");
    console.log("   Endpoint:", `${API_BASE}/chat/sessions/${sessionId}/messages`);
    console.log("   Session ID:", sessionId);
    console.log("   Message:", message);
    
    const response = await fetch(
      `${API_BASE}/chat/sessions/${sessionId}/messages`,
      {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ message }),
      }
    );

    console.log("📨 Response Status:", response.status);
    console.log("📨 Response OK:", response.ok);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Session not found - please create a new chat session");
      }
      const errorText = await response.text();
      console.error("❌ Error response text:", errorText);
      
      let errorMessage = "Failed to send message";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = errorText || `HTTP ${response.status}: Failed to send message`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("✅ Message sent successfully:", data);
    return data;
  } catch (error) {
    console.error("❌ Error in sendChatMessage:", error);
    throw error;
  }
};

// Get chat history
export const getChatHistory = async (
  sessionId: string
): Promise<ChatMessage[]> => {
  try {
    console.log(`Fetching chat history for session ${sessionId}`);
    const response = await fetch(
      `${API_BASE}/chat/sessions/${sessionId}/history`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.log("Session not found, returning empty history");
        return [];
      }
      const error = await response.json();
      console.error("Failed to fetch chat history:", error);
      throw new Error(error.message || error.error || "Failed to fetch chat history");
    }

    const data = await response.json();
    console.log("✅ Received chat history:", data);

    if (!Array.isArray(data)) {
      console.error("Invalid chat history format:", data);
      return [];
    }

    return data.map((msg: any) => ({
      id: msg.id ?? null,
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.timestamp || msg.timeStamp || new Date()),
      metadata: msg.metadata,
    }));
  } catch (error) {
    console.error("Error fetching chat history:", error);
    // Return empty array for not found errors
    if (error instanceof Error && (error.message.includes("not found") || error.message.includes("Failed to fetch"))) {
      return [];
    }
    throw error;
  }
};