"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  PlusCircle,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import {
  createChatSession,
  sendChatMessage,
  getChatHistory,
  ChatMessage,
  getAllChatSessions,
  ChatSession,
} from "@/lib/api/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SuggestedQuestion {
  id: string;
  text: string;
}

interface StressPrompt {
  trigger: string;
  activity: {
    type: "breathing" | "garden" | "forest" | "waves";
    title: string;
    description: string;
  };
}

// Fixed glow animation with proper TypeScript types
const glowAnimation = {
  initial: { 
    opacity: 0.5, 
    scale: 1 
  },
  animate: { 
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.02, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
} as const;

const SUGGESTED_QUESTIONS = [
  { id: "1", text: "How can I manage my anxiety better?" },
  { id: "2", text: "I've been feeling overwhelmed lately" },
  { id: "3", text: "Can we talk about improving sleep?" },
  { id: "4", text: "I need help with work-life balance" },
];

const COMPLETION_THRESHOLD = 5;

export default function TherapyPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stressPrompt, setStressPrompt] = useState<StressPrompt | null>(null);
  const [showActivity, setShowActivity] = useState(false);
  const [isChatPaused, setIsChatPaused] = useState(false);
  const [showNFTCelebration, setShowNFTCelebration] = useState(false);
  const [isCompletingSession, setIsCompletingSession] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fix: Properly handle session ID from URL params
  useEffect(() => {
    const initializeSessionId = () => {
      if (params.sessionId) {
        const sessionIdFromParams = Array.isArray(params.sessionId) 
          ? params.sessionId[0] 
          : params.sessionId;
        
        console.log("Session ID from params:", sessionIdFromParams);
        
        if (typeof sessionIdFromParams === 'string' && !sessionIdFromParams.includes('object')) {
          setSessionId(sessionIdFromParams);
        } else {
          console.log("Invalid session ID from params, creating new session");
          setSessionId(null);
        }
      } else {
        setSessionId(null);
      }
    };

    initializeSessionId();
  }, [params.sessionId]);

  const handleNewSession = async () => {
    try {
      setIsLoading(true);
      const sessionResponse = await createChatSession();
      const newSessionId = sessionResponse.sessionId;
      console.log("New session created:", newSessionId);

      const newSession: ChatSession = {
        sessionId: newSessionId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setSessions((prev) => [newSession, ...prev]);
      setSessionId(newSessionId);
      setMessages([]);
      window.history.pushState({}, "", `/therapy/${newSessionId}`);
      setIsSidebarOpen(false); // Close sidebar on mobile after selection
    } catch (error) {
      console.error("Failed to create new session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize chat session and load history
  useEffect(() => {
    const initChat = async () => {
      try {
        setIsLoading(true);
        
        console.log("Current sessionId:", sessionId);
        console.log("Type of sessionId:", typeof sessionId);
        
        if (!sessionId) {
          console.log("Creating new chat session...");
          const sessionResponse = await createChatSession();
          const newSessionId = sessionResponse.sessionId;
          console.log("New session created:", newSessionId);
          setSessionId(newSessionId);
          window.history.pushState({}, "", `/therapy/${newSessionId}`);
        } else {
          console.log("Loading existing chat session:", sessionId);
          try {
            const history = await getChatHistory(sessionId);
            console.log("Loaded chat history:", history);
            if (Array.isArray(history)) {
              const formattedHistory = history.map((msg, index) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
                id: `${msg.timestamp.toISOString()}-${index}-${msg.role}`, // Add unique ID
              }));
              console.log("Formatted history:", formattedHistory);
              setMessages(formattedHistory);
            } else {
              console.error("History is not an array:", history);
              setMessages([]);
            }
          } catch (historyError) {
            console.error("Error loading chat history:", historyError);
            setMessages([]);
          }
        }
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        setMessages([
          {
            role: "assistant",
            content: "I apologize, but I'm having trouble loading the chat session. Please try refreshing the page.",
            timestamp: new Date(),
            id: "error-" + Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    if (mounted) {
      initChat();
    }
  }, [sessionId, mounted]);

  // Load all chat sessions
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const allSessions = await getAllChatSessions();
        setSessions(allSessions);
      } catch (error) {
        console.error("Failed to load sessions:", error);
      }
    };

    loadSessions();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    if (!isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    const currentMessage = message.trim();
    console.log("Current message:", currentMessage);
    console.log("Session ID:", sessionId);
    console.log("Is typing:", isTyping);
    console.log("Is chat paused:", isChatPaused);

    if (!currentMessage || isTyping || isChatPaused || !sessionId) {
      console.log("Submission blocked:", {
        noMessage: !currentMessage,
        isTyping,
        isChatPaused,
        noSessionId: !sessionId,
      });
      return;
    }

    setMessage("");
    setIsTyping(true);

    try {
      // Add user message with unique ID
      const userMessage: ChatMessage = {
        role: "user",
        content: currentMessage,
        timestamp: new Date(),
        id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      setMessages((prev) => [...prev, userMessage]);

      // Check for stress signals
      const stressCheck = detectStressSignals(currentMessage);
      if (stressCheck) {
        setStressPrompt(stressCheck);
        setIsTyping(false);
        return;
      }

      console.log("Sending message to API...");
      const response = await sendChatMessage(sessionId, currentMessage);
      console.log("Raw API response:", response);

      const aiResponse = typeof response === "string" ? JSON.parse(response) : response;
      console.log("Parsed AI response:", aiResponse);

      // Add AI response with unique ID
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: aiResponse.response || aiResponse.message || "I'm here to support you. Could you tell me more about what's on your mind?",
        timestamp: new Date(),
        id: `assistant-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        metadata: {
          analysis: aiResponse.analysis || {
            emotionalState: "neutral",
            riskLevel: 0,
            themes: [],
            recommendedApproach: "supportive",
            progressIndicators: [],
          },
          technique: aiResponse.metadata?.technique || "supportive",
          goal: aiResponse.metadata?.currentGoal || "Provide support",
          progress: aiResponse.metadata?.progress || {
            emotionalState: "neutral",
            riskLevel: 0,
          },
        },
      };

      console.log("Created assistant message:", assistantMessage);
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      scrollToBottom();
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
          id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        },
      ]);
      setIsTyping(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const detectStressSignals = (message: string): StressPrompt | null => {
    const stressKeywords = [
      "stress", "anxiety", "worried", "panic", "overwhelmed", 
      "nervous", "tense", "pressure", "can't cope", "exhausted",
    ];

    const lowercaseMsg = message.toLowerCase();
    const foundKeyword = stressKeywords.find((keyword) =>
      lowercaseMsg.includes(keyword)
    );

    if (foundKeyword) {
      const activities = [
        {
          type: "breathing" as const,
          title: "Breathing Exercise",
          description: "Follow calming breathing exercises with visual guidance",
        },
        {
          type: "garden" as const,
          title: "Zen Garden",
          description: "Create and maintain your digital peaceful space",
        },
        {
          type: "forest" as const,
          title: "Mindful Forest",
          description: "Take a peaceful walk through a virtual forest",
        },
        {
          type: "waves" as const,
          title: "Ocean Waves",
          description: "Match your breath with gentle ocean waves",
        },
      ];

      return {
        trigger: foundKeyword,
        activity: activities[Math.floor(Math.random() * activities.length)],
      };
    }

    return null;
  };

  const handleSuggestedQuestion = async (text: string) => {
    if (!sessionId) {
      const sessionResponse = await createChatSession();
      const newSessionId = sessionResponse.sessionId;
      setSessionId(newSessionId);
      router.push(`/therapy/${newSessionId}`);
    }

    setMessage(text);
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }, 0);
  };

  const handleSessionSelect = async (selectedSessionId: string) => {
    if (selectedSessionId === sessionId) return;

    try {
      setIsLoading(true);
      const history = await getChatHistory(selectedSessionId);
      if (Array.isArray(history)) {
        const formattedHistory = history.map((msg, index) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          id: `${msg.timestamp.toISOString()}-${index}-${msg.role}`,
        }));
        setMessages(formattedHistory);
        setSessionId(selectedSessionId);
        window.history.pushState({}, "", `/therapy/${selectedSessionId}`);
        setIsSidebarOpen(false); // Close sidebar on mobile after selection
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <p className="text-muted-foreground">Loading your therapy session...</p>
        </div>
      </div>
    );
  }

  // Sidebar content component for reusability
  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Chat Sessions</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewSession}
            className="hover:bg-primary/10"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <PlusCircle className="w-5 h-5" />
            )}
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={handleNewSession}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <MessageSquare className="w-4 h-4" />
          )}
          New Session
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.sessionId}
              className={cn(
                "p-3 rounded-lg text-sm cursor-pointer border transition-all duration-200",
                session.sessionId === sessionId
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-card hover:bg-accent border-border"
              )}
              onClick={() => handleSessionSelect(session.sessionId)}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium truncate">
                  {session.messages[0]?.content.slice(0, 30) || "New Chat"}
                </span>
              </div>
              <p className="line-clamp-2 text-muted-foreground text-xs">
                {session.messages[session.messages.length - 1]?.content || "No messages yet"}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">
                  {session.messages.length} messages
                </span>
                <span className="text-xs text-muted-foreground">
                  {(() => {
                    try {
                      const date = new Date(session.updatedAt);
                      if (isNaN(date.getTime())) return "Just now";
                      return formatDistanceToNow(date, { addSuffix: true });
                    } catch {
                      return "Just now";
                    }
                  })()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[calc(100vh-4rem)] pt-20 gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:flex w-80 flex-col border-r bg-muted/30">
            <SidebarContent />
          </div>

          {/* Mobile Sidebar Sheet */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden fixed top-24 left-4 z-50 bg-background border shadow-sm"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Main chat area */}
          <div className="flex-1 flex flex-col min-w-0 bg-card rounded-lg border shadow-sm">
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between bg-background/50 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-2 ring-primary/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">AI Therapist</h2>
                  <p className="text-sm text-muted-foreground">
                    {messages.length} messages • Always here to listen
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>

            {messages.length === 0 ? (
              // Welcome screen with suggested questions
              <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                <div className="max-w-2xl w-full space-y-8">
                  <div className="text-center space-y-4">
                    <div className="relative inline-flex flex-col items-center">
                      <motion.div
                        className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                        initial="initial"
                        animate="animate"
                        variants={glowAnimation}
                      />
                      <div className="relative flex items-center gap-3 text-2xl sm:text-3xl font-semibold">
                        <div className="relative">
                          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                          <motion.div
                            className="absolute inset-0 text-primary"
                            initial="initial"
                            animate="animate"
                            variants={glowAnimation}
                          >
                            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                          </motion.div>
                        </div>
                        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                          AI Therapist
                        </span>
                      </div>
                      <p className="text-muted-foreground mt-3 text-base sm:text-lg">
                        How can I assist you today?
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 relative">
                    <motion.div
                      className="absolute -inset-4 bg-gradient-to-b from-primary/5 to-transparent blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    />
                    {SUGGESTED_QUESTIONS.map((q, index) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-auto py-4 px-6 text-left justify-start hover:bg-accent hover:border-primary/50 transition-all duration-300 text-sm sm:text-base"
                          onClick={() => handleSuggestedQuestion(q.text)}
                        >
                          {q.text}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Chat messages
              <div className="flex-1 overflow-y-auto scroll-smooth">
                <div className="max-w-4xl mx-auto w-full">
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id} // Fixed: Using unique ID instead of timestamp
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "px-4 sm:px-6 py-6 border-b",
                          msg.role === "assistant"
                            ? "bg-muted/30"
                            : "bg-background"
                        )}
                      >
                        <div className="flex gap-3 sm:gap-4 max-w-3xl mx-auto">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 mt-1">
                            {msg.role === "assistant" ? (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-2 ring-primary/20">
                                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center ring-2 ring-secondary/20">
                                <User className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 space-y-2 overflow-hidden min-h-[2rem]">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <p className="font-medium text-sm sm:text-base">
                                {msg.role === "assistant" ? "AI Therapist" : "You"}
                              </p>
                              {msg.metadata?.technique && (
                                <Badge variant="secondary" className="text-xs">
                                  {msg.metadata.technique}
                                </Badge>
                              )}
                            </div>
                            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none leading-relaxed">
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                            {msg.metadata?.goal && (
                              <p className="text-xs text-muted-foreground mt-2">
                                Goal: {msg.metadata.goal}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-4 sm:px-6 py-6 flex gap-3 sm:gap-4 bg-muted/30 border-b"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-2 ring-primary/20">
                          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <p className="font-medium text-sm sm:text-base">AI Therapist</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Thinking</span>
                          <div className="flex gap-1">
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                            >
                              .
                            </motion.span>
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            >
                              .
                            </motion.span>
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                            >
                              .
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4">
              <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto flex gap-3 items-end"
              >
                <div className="flex-1 relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      isChatPaused
                        ? "Complete the activity to continue..."
                        : "Share what's on your mind..."
                    }
                    className={cn(
                      "w-full resize-none rounded-2xl border bg-background px-4 py-3 pr-12",
                      "min-h-[56px] max-h-[120px] text-sm sm:text-base",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                      "transition-all duration-200 placeholder:text-muted-foreground/70",
                      (isTyping || isChatPaused) && "opacity-50 cursor-not-allowed"
                    )}
                    rows={1}
                    disabled={isTyping || isChatPaused}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className={cn(
                      "absolute right-2 bottom-2 h-10 w-10 rounded-xl",
                      "bg-primary hover:bg-primary/90 transition-all duration-200",
                      "shadow-lg shadow-primary/25",
                      (isTyping || isChatPaused || !message.trim()) &&
                        "opacity-50 cursor-not-allowed scale-95",
                      !(isTyping || isChatPaused || !message.trim()) &&
                        "hover:scale-105"
                    )}
                    disabled={isTyping || isChatPaused || !message.trim()}
                  >
                    {isTyping ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </form>
              <div className="mt-3 text-xs text-center text-muted-foreground">
                Press <kbd className="px-2 py-1 rounded bg-muted border text-xs">Enter ↵</kbd> to send,{" "}
                <kbd className="px-2 py-1 rounded bg-muted border text-xs ml-1">
                  Shift + Enter
                </kbd> for new line
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}