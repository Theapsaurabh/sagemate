import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const API_URL = process.env.BACKEND_API_URL || "https://sagemate-backend.onrender.com";
  const token = req.headers.get("Authorization");
  
  if (!token) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    
    // ✅ Add proper error handling for non-200 responses
    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to get user data" },
        { status: res.status }
      );
    }
    
    return NextResponse.json(data, { status: res.status });

  } catch (error) {
    return NextResponse.json(
      { 
        message: "Server error", 
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}