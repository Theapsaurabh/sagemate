"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = (token: string, userData: User) => {
    console.log("SessionContext: Logging in user:", userData);
    localStorage.setItem("token", token);
    const {  ...safeUserData } = userData;
    setUser(safeUserData);
    console.log("SessionContext: User state updated after login:", safeUserData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://sagemate-backend.onrender.com";
          const response = await fetch(`${backendUrl}/auth/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            console.log("SessionContext: Server-side logout successful");
          } else {
            console.warn("SessionContext: Server-side logout failed, continuing with client-side logout");
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.warn("SessionContext: Server logout endpoint unavailable, continuing with client-side logout");
        }
      }

      // Always clear client-side data
      localStorage.removeItem("token");
      setUser(null);
      
      // Redirect to home page
      router.push("/");
      
      console.log("SessionContext: Logout completed successfully");
      
    } catch (error) {
      console.error("SessionContext: Logout error:", error);
      // Even if there's an error, ensure client-side data is cleared
      localStorage.removeItem("token");
      setUser(null);
      router.push("/");
    }
  };

  const checkSession = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(
        "SessionContext: Token from localStorage:",
        token ? "exists" : "not found"
      );

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      console.log("SessionContext: Fetching user data...");
      
      
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://sagemate-backend.onrender.com";
      const response = await fetch(`${backendUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("SessionContext: Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("SessionContext: User data received:", data);
        const userData = data.user;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...safeUserData } = userData;
        setUser(safeUserData);
        console.log("SessionContext: User state updated:", safeUserData);
      } else {
        console.log("SessionContext: Failed to get user data");
        setUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("SessionContext: Error checking session:", error);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("SessionContext: Initial check");
    checkSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}