/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/context/session-context";
import { useRouter } from "next/navigation";

interface MoodFormProps {
  onSuccess?: () => void;
  onSubmit?: (data: { moodScore: number }) => Promise<void>;
  isLoading?: boolean;
}

export function MoodForm({ onSuccess }: MoodFormProps) {
  const [moodScore, setMoodScore] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, loading } = useSession();
  const { toast } = useToast();

  const emotions = [
    { value: 0, label: "😔", description: "Very Low" },
    { value: 25, label: "😕", description: "Low" },
    { value: 50, label: "😊", description: "Neutral" },
    { value: 75, label: "😃", description: "Good" },
    { value: 100, label: "🤗", description: "Great" },
  ];

  const currentEmotion =
    emotions.find((em) => Math.abs(moodScore - em.value) < 15) || emotions[2];

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to track your mood",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      // ✅ CORRECT ENDPOINT - Use your backend URL
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const response = await fetch(`${backendUrl}/api/mood`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score: moodScore }),
      });

      console.log("📨 Mood API Response Status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("MoodForm: Error response:", errorText);
        throw new Error("Failed to track mood");
      }

      const data = await response.json();
      console.log("✅ Mood tracked successfully:", data);
      
      toast({
        title: "Mood Tracked Successfully!",
        description: `Your ${currentEmotion.description.toLowerCase()} mood has been saved.`,
        variant: "default",
      });

      onSuccess?.();
      
    } catch (error: any) {
      console.error("Mood tracking error:", error);
      toast({
        title: "Failed to track mood",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Emotion display */}
      <div className="text-center space-y-4">
        <div className="text-6xl transition-all duration-300">
          {currentEmotion.label}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">
            {currentEmotion.description}
          </h3>
          <p className="text-sm text-muted-foreground">
            How are you feeling today?
          </p>
        </div>
      </div>

      {/* Emotion slider */}
      <div className="space-y-6">
        <div className="flex justify-between px-2">
          {emotions.map((em) => (
            <button
              key={em.value}
              className={`cursor-pointer transition-all duration-200 p-2 rounded-lg ${
                Math.abs(moodScore - em.value) < 15
                  ? "bg-primary/10 scale-110"
                  : "opacity-60 hover:opacity-100 hover:scale-105"
              }`}
              onClick={() => setMoodScore(em.value)}
            >
              <div className="text-2xl">{em.label}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {em.description}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <Slider
            value={[moodScore]}
            onValueChange={(value) => setMoodScore(value[0])}
            min={0}
            max={100}
            step={1}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>Very Low</span>
            <span>Very High</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || loading}
        className="w-full h-12 text-base font-medium"
        size="lg"
      >
        {isLoading || loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving Mood...
          </>
        ) : (
          `Save ${currentEmotion.description} Mood`
        )}
      </Button>

      {/* Helper text for non-authenticated users */}
      {!isAuthenticated && !loading && (
        <p className="text-xs text-muted-foreground text-center">
          You need to be logged in to save your mood
        </p>
      )}
    </div>
  );
}