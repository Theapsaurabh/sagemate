"use client";

import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  BrainCircuit,
  Heart,
  Loader2,
  MessageSquare,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AnxietyGames } from "@/components/games/anxiety-games";

export default function Dashboard() {
  const wellnessStats = [
    {
      title: "Mood Score",
      value: "",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Today's average mood",
    },
    {
      title: "Completion Rate",
      value: "100%",
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "Perfect completion rate",
    },
    {
      title: "Therapy Sessions",
      value: ` sessions`,
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      description: "Total sessions completed",
    },
    {
      title: "Total Activities",
      value: "",
      icon: Sparkles, // replaced Activity with Sparkles
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Planned for today",
    },
  ];

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMoodModal, setShowMoodModal]= useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);



  return (
    <div className="min-h-screen bg-background p-8">
      <Container className="pt-20 pb-8 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back,
            </h1>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        </div>

        {/* Main Grid Layout */}
        <div className="space-y-6">
          {/* Top Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Quick Actions Card */}
            <Card className="border-primary/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
              <CardContent className="p-6 relative space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Quick Actions</h3>
                    <p className="text-sm text-muted-foreground">
                      Start your wellness journey
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Button
                    variant="default"
                    className={cn(
                      "w-full justify-between items-center p-6 h-auto group/button",
                      "bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/90",
                      "transition-all duration-200 group-hover:translate-y-[-2px]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-white">
                          Start Therapy
                        </div>
                        <div className="text-xs text-white/80">
                          Begin a new session
                        </div>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover/button:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </Button>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className={cn(
                        "flex flex-col h-[120px] px-4 py-3 group/mood hover:border-primary/50",
                        "justify-center items-center text-center",
                        "transition-all duration-200 group-hover:translate-y-[-2px]"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                        <Heart className="w-5 h-5 text-rose-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Track Mood</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          How are you feeling?
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className={cn(
                        "flex flex-col h-[120px] px-4 py-3 group/ai hover:border-primary/50",
                        "justify-center items-center text-center",
                        "transition-all duration-200 group-hover:translate-y-[-2px]"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                        <BrainCircuit className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">Check-in</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Quick wellness check
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Today’s Overview Card */}
            <Card className="border-primary/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today&apos;s Overview</CardTitle>
                    <CardDescription>
                      Your wellness metrics for {format(new Date(), "MMMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Loader2 className={cn("h-4 w-4", "animate-spin")} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {wellnessStats.map((stat) => {
                    const StatIcon = stat.icon; // Uppercase variable for JSX
                    return (
                      <div
                        key={stat.title}
                        className={cn(
                          "p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                          stat.bgColor
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <StatIcon className={cn("w-5 h-5", stat.color)} />
                          <p className="text-sm font-medium">{stat.title}</p>
                        </div>
                        <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {stat.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 text-xs text-muted-foreground text-right">
                  Last updated:
                </div>
              </CardContent>
            </Card>
          </div>
          {/**content grid for games */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left side - Spans 2 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Anxiety Games  */}

             
            </div>
          </div>
        </div>
      </Container>
      {/**mood tracking modal */}
      <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>How are you feeling?</DialogTitle>
            <DialogDescription>
              Move the slider to track your current mood
            </DialogDescription>
          </DialogHeader>
         
        </DialogContent>
      </Dialog>

      {/**Acitvity Logger */}
      <AnxietyGames/>



    </div>
  );
}
