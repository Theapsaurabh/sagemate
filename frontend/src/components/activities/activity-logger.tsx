/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Activity, X, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ActivityLoggerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityLogged: (activity: any) => void;
}

const activityTypes = [
  { value: "meditation", label: "Meditation", icon: "🧘", color: "from-purple-500 to-purple-600" },
  { value: "exercise", label: "Exercise", icon: "💪", color: "from-blue-500 to-blue-600" },
  { value: "therapy", label: "Therapy Session", icon: "💬", color: "from-green-500 to-green-600" },
  { value: "journaling", label: "Journaling", icon: "📝", color: "from-amber-500 to-amber-600" },
  { value: "breathing", label: "Breathing Exercise", icon: "🌬️", color: "from-cyan-500 to-cyan-600" },
  { value: "mindfulness", label: "Mindfulness", icon: "🌿", color: "from-emerald-500 to-emerald-600" },
];

export function ActivityLogger({ open, onOpenChange, onActivityLogged }: ActivityLoggerProps) {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
    duration: 15,
    difficulty: 5,
    feedback: "",
    scheduledFor: null as Date | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!mounted) return;

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, mounted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        status: isScheduled && formData.scheduledFor ? 'scheduled' : 'completed'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onActivityLogged(payload);
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error('Error logging activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "",
      name: "",
      description: "",
      duration: 15,
      difficulty: 5,
      feedback: "",
      scheduledFor: null,
    });
    setIsScheduled(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300
              }}
              className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border-0 shadow-2xl flex flex-col"
            >
              <Card className="border-0 h-full flex flex-col overflow-hidden">
                {/* Fixed Header */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-900">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <Activity className="w-6 h-6 text-primary" />
                    Log Wellness Activity
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="h-8 w-8 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                
                {/* Scrollable Content */}
                <CardContent className="flex-1 overflow-y-auto py-6 px-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Activity Type Selection */}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Activity Type</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {activityTypes.map((activity) => (
                          <button
                            key={activity.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: activity.value })}
                            className={cn(
                              "p-4 rounded-xl border-2 transition-all duration-200 text-left min-h-[80px]",
                              "flex flex-col items-center justify-center",
                              formData.type === activity.value
                                ? `border-primary bg-gradient-to-r ${activity.color} text-white shadow-lg scale-105`
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary/50 hover:scale-105"
                            )}
                          >
                            <div className="text-2xl mb-2">{activity.icon}</div>
                            <div className="font-medium text-sm text-center">{activity.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Activity Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Activity Name
                        </Label>
                        <Input
                          id="name"
                          placeholder="e.g., Morning Meditation"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-11"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Duration: {formData.duration} minutes
                        </Label>
                        <div className="flex items-center gap-3 pt-2">
                          <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <Slider
                            value={[formData.duration]}
                            onValueChange={([value]) => setFormData({ ...formData, duration: value })}
                            min={1}
                            max={120}
                            step={1}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your activity..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    {/* Difficulty */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Difficulty Level: {formData.difficulty}/10
                      </Label>
                      <Slider
                        value={[formData.difficulty]}
                        onValueChange={([value]) => setFormData({ ...formData, difficulty: value })}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 px-1">
                        <span>Very Easy</span>
                        <span>Moderate</span>
                        <span>Very Hard</span>
                      </div>
                    </div>

                    {/* Schedule Option */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="schedule"
                          checked={isScheduled}
                          onChange={(e) => setIsScheduled(e.target.checked)}
                          className="rounded border-gray-300 w-4 h-4"
                        />
                        <Label htmlFor="schedule" className="text-sm font-medium cursor-pointer">
                          Schedule for later
                        </Label>
                      </div>

                      <AnimatePresence>
                        {isScheduled && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2 overflow-hidden"
                          >
                            <Label className="text-sm font-medium">Schedule Date & Time</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal h-11",
                                    !formData.scheduledFor && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {formData.scheduledFor ? (
                                    format(formData.scheduledFor, "PPP 'at' h:mm a")
                                  ) : (
                                    <span>Pick a date and time</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0 z-[60]" align="start">
                                <Calendar
                                  mode="single"
                                  selected={formData.scheduledFor || undefined}
                                  onSelect={(date) => setFormData({ ...formData, scheduledFor: date ?? null })}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Feedback */}
                    <div className="space-y-2">
                      <Label htmlFor="feedback" className="text-sm font-medium">
                        Reflection (Optional)
                      </Label>
                      <Textarea
                        id="feedback"
                        placeholder="How did this activity make you feel? Any insights?"
                        value={formData.feedback}
                        onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                        rows={3}
                        className="resize-none"
                      />
                    </div>

                    {/* Submit Buttons - Fixed at bottom */}
                    <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-6 pb-2 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleClose}
                          className="flex-1 h-12"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting || !formData.type || !formData.name}
                          className={cn(
                            "flex-1 h-12 bg-gradient-to-r from-primary to-primary/90",
                            "hover:from-primary hover:to-primary shadow-lg",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Logging...</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{isScheduled ? 'Schedule Activity' : 'Log Activity'}</span>
                            </div>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}