"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { 
  Brain, 
  Heart, 
  MessageSquare, 
  Activity, 
  TrendingUp, 
  Calendar,
  Gamepad2,
  BarChart3,
  Users,
  Shield,
  Zap,
  Sparkles,
  Clock,
  Target,
  CheckCircle2,
  ArrowRight,
  Play,
  BookOpen,
  Video,
  Music,
  Headphones,
  Moon,
  Sun,
  GraduationCap,
  UserCheck,
  Bookmark,
  Clock4
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const features = [
  {
    category: "Mental Health",
    items: [
      {
        icon: MessageSquare,
        title: "AI Therapy Sessions",
        description: "24/7 access to AI-powered therapy sessions for immediate support and guidance",
        benefits: ["Personalized responses", "Confidential & secure", "Available anytime", "Progress tracking"],
        status: "live",
        path: "/therapy/new",
        color: "from-purple-500 to-purple-600",
        iconColor: "text-purple-500"
      },
      {
        icon: GraduationCap,
        title: "Therapy Classes",
        description: "Structured therapy programs and classes for specific mental health challenges",
        benefits: ["CBT techniques", "DBT skills", "Mindfulness training", "Group sessions"],
        status: "live",
        path: "/therapy/classes",
        color: "from-indigo-500 to-indigo-600",
        iconColor: "text-indigo-500"
      },
      {
        icon: UserCheck,
        title: "Psychiatrist Connect",
        description: "Connect with licensed psychiatrists for professional diagnosis and medication management",
        benefits: ["Licensed professionals", "Medication management", "Clinical diagnosis", "Follow-up care"],
        status: "live",
        path: "/psychiatrists",
        color: "from-blue-500 to-blue-600",
        iconColor: "text-blue-500"
      },
      {
        icon: Bookmark,
        title: "Book Therapy Session",
        description: "Schedule one-on-one sessions with certified therapists and counselors",
        benefits: ["Certified therapists", "Flexible scheduling", "Video/audio sessions", "Session notes"],
        status: "live",
        path: "/therapy/book",
        color: "from-green-500 to-green-600",
        iconColor: "text-green-500"
      },
      {
        icon: Brain,
        title: "Mood Tracking",
        description: "Track your emotional wellbeing with daily mood assessments and insights",
        benefits: ["Visual mood charts", "Pattern recognition", "Progress tracking", "Trigger identification"],
        status: "live",
        path: "/mood",
        color: "from-pink-500 to-pink-600",
        iconColor: "text-pink-500"
      },
      {
        icon: Activity,
        title: "Wellness Activities",
        description: "Curated mental wellness exercises including meditation, breathing, and mindfulness",
        benefits: ["Guided sessions", "Progress tracking", "Personalized recommendations", "Daily reminders"],
        status: "live",
        path: "/activities",
        color: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-500"
      }
    ]
  },
  {
    category: "Tools & Games",
    items: [
      {
        icon: Gamepad2,
        title: "Anxiety Relief Games",
        description: "Interactive games designed to reduce anxiety and improve mental focus",
        benefits: ["Instant stress relief", "Cognitive exercises", "Fun & engaging", "Progress tracking"],
        status: "live",
        path: "/games",
        color: "from-orange-500 to-orange-600",
        iconColor: "text-orange-500"
      },
      {
        icon: BookOpen,
        title: "Therapeutic Journaling",
        description: "Digital journal with prompts for self-reflection and emotional processing",
        benefits: ["Private entries", "Therapeutic prompts", "Search & organize", "Mood correlation"],
        status: "coming-soon",
        path: "/journal",
        color: "from-amber-500 to-amber-600",
        iconColor: "text-amber-500"
      },
      {
        icon: Music,
        title: "Sound Therapy",
        description: "Calming sounds and music designed to reduce stress and improve sleep",
        benefits: ["Sleep sounds", "Focus music", "Meditation tracks", "Custom playlists"],
        status: "coming-soon",
        path: "/sounds",
        color: "from-rose-500 to-rose-600",
        iconColor: "text-rose-500"
      }
    ]
  },
  {
    category: "Analytics & Progress",
    items: [
      {
        icon: TrendingUp,
        title: "Progress Insights",
        description: "Detailed analytics and insights about your mental health journey",
        benefits: ["Weekly reports", "Progress trends", "Personalized insights", "Goal tracking"],
        status: "live",
        path: "/insights",
        color: "from-cyan-500 to-cyan-600",
        iconColor: "text-cyan-500"
      },
      {
        icon: BarChart3,
        title: "Therapy Analytics",
        description: "Track your therapy progress and session effectiveness over time",
        benefits: ["Session notes", "Progress metrics", "Therapist feedback", "Treatment plans"],
        status: "live",
        path: "/therapy/analytics",
        color: "from-teal-500 to-teal-600",
        iconColor: "text-teal-500"
      },
      {
        icon: Calendar,
        title: "Session Scheduling",
        description: "Plan and manage your therapy sessions and wellness activities",
        benefits: ["Smart reminders", "Flexible scheduling", "Progress tracking", "Therapist availability"],
        status: "live",
        path: "/schedule",
        color: "from-violet-500 to-violet-600",
        iconColor: "text-violet-500"
      }
    ]
  },
  {
    category: "Professional Support",
    items: [
      {
        icon: Users,
        title: "Therapist Network",
        description: "Access to our network of certified mental health professionals",
        benefits: ["Verified credentials", "Specialized expertise", "Multiple approaches", "Client reviews"],
        status: "live",
        path: "/therapists",
        color: "from-sky-500 to-sky-600",
        iconColor: "text-sky-500"
      },
      {
        icon: Shield,
        title: "Crisis Resources",
        description: "Immediate access to crisis helplines and emergency resources",
        benefits: ["24/7 hotlines", "Local resources", "Safety planning", "Emergency contacts"],
        status: "live",
        path: "/resources",
        color: "from-red-500 to-red-600",
        iconColor: "text-red-500"
      },
      {
        icon: Headphones,
        title: "Guided Therapy Sessions",
        description: "Pre-recorded therapy sessions for various mental health conditions",
        benefits: ["Expert guidance", "Various techniques", "Self-paced learning", "Supplemental material"],
        status: "coming-soon",
        path: "/therapy/guided",
        color: "from-lime-500 to-lime-600",
        iconColor: "text-lime-500"
      }
    ]
  }
];

const therapyStats = [
  { number: "50+", label: "Licensed Therapists" },
  { number: "10K+", label: "Therapy Sessions" },
  { number: "95%", label: "Satisfaction Rate" },
  { number: "24/7", label: "Support Available" }
];

const therapyApproaches = [
  {
    name: "Cognitive Behavioral Therapy (CBT)",
    description: "Identify and change negative thought patterns and behaviors",
    icon: Brain,
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Dialectical Behavior Therapy (DBT)",
    description: "Develop skills for emotion regulation and interpersonal effectiveness",
    icon: Heart,
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Mindfulness-Based Therapy",
    description: "Cultivate present-moment awareness and acceptance",
    icon: Moon,
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "Solution-Focused Therapy",
    description: "Focus on solutions and future possibilities rather than problems",
    icon: Target,
    color: "from-orange-500 to-amber-500"
  }
];

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("Mental Health");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
                🏥 Professional Mental Health Support
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Complete Mental Health
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Care Platform</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                From AI therapy to licensed professionals, get comprehensive mental health support tailored to your needs. 
                Access therapists, psychiatrists, and therapeutic tools all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Find a Therapist
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Take Assessment
                  <Play className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Therapy Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20"
        >
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {therapyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </motion.div>
      </section>

      {/* Therapy Approaches Section */}
      <section className="py-16 bg-white dark:bg-gray-800/50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Evidence-Based Therapy Approaches
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our licensed professionals use proven therapeutic methods to help you achieve your mental health goals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {therapyApproaches.map((approach, index) => (
              <motion.div
                key={approach.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${approach.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <approach.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {approach.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {approach.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <Container>
          {/* Category Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((category) => (
              <Button
                key={category.category}
                variant={activeCategory === category.category ? "default" : "outline"}
                onClick={() => setActiveCategory(category.category)}
                className={cn(
                  "rounded-full px-6 transition-all duration-300",
                  activeCategory === category.category &&
                    "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                )}
              >
                {category.category}
              </Button>
            ))}
          </motion.div>

          {/* Features Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features
                .find(cat => cat.category === activeCategory)
                ?.items.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card className="h-full border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl group">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge 
                            variant={feature.status === "live" ? "default" : "secondary"}
                            className={cn(
                              feature.status === "live" 
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                            )}
                          >
                            {feature.status === "live" ? "Live" : "Coming Soon"}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-2 mb-6">
                          {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between">
                          <Button
                            variant={feature.status === "live" ? "default" : "outline"}
                            disabled={feature.status !== "live"}
                            className={cn(
                              "w-full",
                              feature.status === "live" && 
                                "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            )}
                            asChild
                          >
                            <Link href={feature.path}>
                              {feature.status === "live" ? "Explore Now" : "Coming Soon"}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </motion.div>
          </AnimatePresence>
        </Container>
      </section>

      {/* How Therapy Works Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800/50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Therapy Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simple steps to connect with the right mental health professional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                icon: UserCheck,
                title: "Assessment",
                description: "Complete a brief assessment to understand your needs",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                icon: GraduationCap,
                title: "Match with Professional",
                description: "Get matched with a therapist or psychiatrist based on your needs",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                icon: Calendar,
                title: "Book Session",
                description: "Schedule your first session at your convenience",
                color: "from-green-500 to-emerald-500"
              },
              {
                step: "04",
                icon: TrendingUp,
                title: "Begin Therapy",
                description: "Start your journey toward better mental health",
                color: "from-orange-500 to-amber-500"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="text-center relative"
              >
                {/* Connecting line for desktop */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-600 dark:to-gray-800 -z-10" />
                )}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  STEP {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <UserCheck className="w-12 h-12 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Speak with a Professional?
              </h2>
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Take the first step toward better mental health. Our licensed therapists and psychiatrists are here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  asChild
                >
                  <Link href="/therapy/book">
                    Book First Session
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 font-semibold"
                  asChild
                >
                  <Link href="/psychiatrists">
                    Find a Psychiatrist
                  </Link>
                </Button>
              </div>
              <p className="text-sm text-purple-200 mt-4">
                ✅ Free 15-minute consultation available
              </p>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}