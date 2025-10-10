import { NextResponse, NextRequest } from "next/server"; 

export async function POST(request: NextRequest) {
    const body = await request.json();
    const API_URL = process.env.API_URL || 'http://localhost:3001';
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        
       
        if (!response.ok) {
            return NextResponse.json(
                { 
                    message: data.message || "Login failed",
                    error: data
                },
                { status: response.status }
            );
        }
        
        return NextResponse.json(data, {
            status: response.status
        });
        
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