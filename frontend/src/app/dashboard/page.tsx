/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  BrainCircuit,
  Calendar,
  Heart,
  Loader2,
  MessageSquare,
  Sparkles,
  Sun,
  Trophy,
  TrendingUp,
  Clock as ClockIcon,
  Activity,
  Target,
  ChevronRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, isToday, isTomorrow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AnxietyGames } from "@/components/games/anxiety-games";
import { MoodForm } from "@/components/mood/mood-form";
import { ActivityLogger } from "@/components/activities/activity-logger";

interface UpcomingActivity {
  _id: string;
  type: string;
  name: string;
  description?: string;
  duration: number;
  difficulty: number;
  scheduledFor: string;
  status: string;
}

// Client-only time display component
function CurrentTime() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm text-gray-500 dark:text-gray-500 font-mono">
      {currentTime || '--:--:--'}
    </p>
  );
}

// Client-only date display component
function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(format(new Date(), "EEEE, MMMM d, yyyy"));
  }, []);

  return (
    <p className="text-lg text-gray-600 dark:text-gray-400">
      {currentDate}
    </p>
  );
}

// Client-only greeting component
function DynamicGreeting() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      {greeting},
    </h1>
  );
}

export default function Dashboard() {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [isSavingMood, setIsSavingMood] = useState(false);
  const [showActivity, setShowActivityLogger] = useState(false);
  const [moodScore, setMoodScore] = useState<number | null>(null);
  const [upcomingActivities, setUpcomingActivities] = useState<UpcomingActivity[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const router = useRouter();

  // Mock data - replace with actual data from your backend
  const wellnessStats = [
    {
      title: "Mood Score",
      value: moodScore !== null ? `${moodScore}/10` : "Not set",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-200 dark:border-purple-800",
      description: "Today's average mood",
      trend: moodScore !== null ? "+2 from yesterday" : "Track your mood",
    },
    {
      title: "Completion Rate",
      value: "100%",
      icon: Trophy,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-200 dark:border-amber-800",
      description: "Perfect completion rate",
      trend: "Maintained",
    },
    {
      title: "Therapy Sessions",
      value: "12 sessions",
      icon: Heart,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-200 dark:border-rose-800",
      description: "Total sessions completed",
      trend: "+3 this week",
    },
    {
      title: "Activities Completed",
      value: `${upcomingActivities.filter(a => a.status === 'completed').length}/8`,
      icon: Sparkles,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-200 dark:border-blue-800",
      description: "Daily goals progress",
      trend: `${Math.round((upcomingActivities.filter(a => a.status === 'completed').length / 8) * 100)}% completed`,
    },
  ];

  const quickActions = [
    {
      title: "Start Therapy Session",
      description: "Begin a new AI therapy session",
      icon: MessageSquare,
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-500",
      onClick: () => router.push("/therapy/new"),
    },
    {
      title: "Mood Tracking",
      description: "Log your current emotional state",
      icon: Heart,
      color: "from-rose-500 to-rose-600",
      iconColor: "text-rose-500",
      onClick: () => setShowMoodModal(true),
    },
    {
      title: "Wellness Check-in",
      description: "Quick mental health assessment",
      icon: BrainCircuit,
      color: "from-blue-500 to-blue-600",
      iconColor: "text-blue-500",
      onClick: () => setShowActivityLogger(true),
    },
    {
      title: "Progress Insights",
      description: "View your wellness journey",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      iconColor: "text-emerald-500",
      onClick: () => router.push("/insights"),
    },
  ];

  const recentActivities = [
    { time: "2 hours ago", activity: "Completed breathing exercise", type: "exercise" },
    { time: "4 hours ago", activity: "Logged mood: 8/10", type: "mood" },
    { time: "1 day ago", activity: "Therapy session completed", type: "therapy" },
    { time: "2 days ago", activity: "Started new meditation", type: "meditation" },
  ];

  useEffect(() => {
    fetchUpcomingActivities();
  }, []);

  const fetchUpcomingActivities = async () => {
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with actual API response
      const mockActivities: UpcomingActivity[] = [
        {
          _id: "1",
          type: "meditation",
          name: "Morning Meditation",
          description: "Start your day with mindfulness",
          duration: 15,
          difficulty: 3,
          scheduledFor: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          status: "scheduled"
        },
        {
          _id: "2",
          type: "exercise",
          name: "Evening Yoga",
          description: "Relaxing yoga session",
          duration: 30,
          difficulty: 5,
          scheduledFor: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
          status: "scheduled"
        },
        {
          _id: "3",
          type: "breathing",
          name: "Breathing Exercise",
          description: "Calm your nervous system",
          duration: 10,
          difficulty: 2,
          scheduledFor: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: "scheduled"
        }
      ];
      
      setUpcomingActivities(mockActivities);
    } catch (error) {
      console.error('Error fetching upcoming activities:', error);
    } finally {
      setActivitiesLoading(false);
    }
  };

  const handleMoodSubmit = async (data: { moodScore: number }) => {
    setIsSavingMood(true);
    try {
      setMoodScore(data.moodScore);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowMoodModal(false);
    } catch (error) {
      console.error("Error saving mood:", error);
    } finally {
      setIsSavingMood(false);
    }
  };

  const handleActivityLogged = (activity: any) => {
    if (activity.status === 'scheduled') {
      setUpcomingActivities(prev => [activity, ...prev]);
    }
    fetchUpcomingActivities();
  };

  const markActivityAsComplete = async (activityId: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUpcomingActivities(prev => 
        prev.map(activity => 
          activity._id === activityId 
            ? { ...activity, status: 'completed' }
            : activity
        )
      );
      
      setTimeout(() => {
        setUpcomingActivities(prev => prev.filter(activity => activity._id !== activityId));
      }, 1000);
      
    } catch (error) {
      console.error('Error marking activity as complete:', error);
    }
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      meditation: "🧘",
      exercise: "💪",
      therapy: "💬",
      journaling: "📝",
      breathing: "🌬️",
      mindfulness: "🌿",
    };
    return icons[type] || "📋";
  };

  const getDateLabel = (date: string) => {
    const activityDate = new Date(date);
    if (isToday(activityDate)) return "Today";
    if (isTomorrow(activityDate)) return "Tomorrow";
    return format(activityDate, "EEE, MMM d");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 p-4 md:p-6">
      <Container className="pt-16 md:pt-20 pb-8 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div className="space-y-2">
            <DynamicGreeting />
            <CurrentDate />
            <CurrentTime />
          </div>
          
          {/* Quick Stats Overview */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Day 7</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <Target className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {upcomingActivities.filter(a => a.status === 'completed').length}/8 Goals
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="space-y-6">
          {/* Quick Actions Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <Card 
                  className="group cursor-pointer border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg"
                  onClick={action.onClick}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors transform group-hover:translate-x-1 duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats and Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wellness Stats - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Wellness Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                          Wellness Overview
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          Your daily progress overview
                        </CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={fetchUpcomingActivities}
                      >
                        <Loader2 className={cn("h-4 w-4", activitiesLoading ? "animate-spin" : "")} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {wellnessStats.map((stat, index) => {
                        const StatIcon = stat.icon;
                        return (
                          <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                              "p-4 rounded-xl border-2 transition-all duration-300 group cursor-pointer",
                              stat.bgColor,
                              stat.borderColor
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                                  <StatIcon className={cn("w-5 h-5", stat.color)} />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {stat.title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                    {stat.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3">
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {stat.value}
                              </p>
                              <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                                {stat.trend}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Anxiety Games Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <AnxietyGames />
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Activities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      Upcoming Activities
                    </CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {upcomingActivities.length}
                    </Badge>
                  </CardHeader>
                  <CardContent className="h-[400px] flex flex-col">
                    {activitiesLoading ? (
                      <div className="space-y-3 flex-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
                            <div className="w-10 h-10 rounded-lg bg-gray-300 dark:bg-gray-700" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : upcomingActivities.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400 flex-1 flex flex-col items-center justify-center">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-medium">No upcoming activities</p>
                        <p className="text-sm mt-1">Schedule activities to see them here</p>
                        <Button 
                          className="mt-4" 
                          size="sm"
                          onClick={() => setShowActivityLogger(true)}
                        >
                          Schedule Activity
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                        {upcomingActivities.map((activity, index) => (
                          <motion.div
                            key={activity._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors group bg-white/50 dark:bg-gray-700/50"
                          >
                            <div className="text-2xl flex-shrink-0">
                              {getActivityIcon(activity.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                  {activity.name}
                                </h4>
                                <Badge variant="outline" className="text-xs">
                                  {activity.type}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                  <ClockIcon className="w-3 h-3" />
                                  <span>{activity.duration}min</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{getDateLabel(activity.scheduledFor)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                                  <span>Level {activity.difficulty}/10</span>
                                </div>
                              </div>
                              
                              {activity.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                  {activity.description}
                                </p>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => markActivityAsComplete(activity._id)}
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {upcomingActivities.length > 0 && (
                      <Button 
                        variant="ghost" 
                        className="w-full mt-4" 
                        size="sm"
                        onClick={() => setShowActivityLogger(true)}
                      >
                        Add New Activity
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="w-5 h-5 text-blue-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {activity.activity}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {activity.time}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4" size="sm">
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Daily Motivation */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-0 bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-xl">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-300" />
                        <span className="font-semibold">Daily Inspiration</span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        Progress, not perfection. Every small step you take today is a victory in your mental health journey."
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/80">
                        <span>Your AI Therapist</span>
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mood Tracking Modal */}
      <Dialog open={showMoodModal} onOpenChange={setShowMoodModal}>
        <DialogContent className="sm:max-w-[425px] border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              How are you feeling today?
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Take a moment to reflect on your current emotional state
            </DialogDescription>
          </DialogHeader>
          <MoodForm onSubmit={handleMoodSubmit} isLoading={isSavingMood} />
        </DialogContent>
      </Dialog>

      {/* Activity Logger */}
      <ActivityLogger
        open={showActivity}
        onOpenChange={setShowActivityLogger}
        onActivityLogged={handleActivityLogged}
      />
    </div>
  );
}