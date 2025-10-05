"use client";
import { Ripple } from "@/components/ui/ripple";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Waves, Heart, Sparkles, MessageSquareHeart, Lightbulb, HeartPulse, Lock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Home() {
  const emotions = [
    {
      value: 0,
      label: "😢 Sad",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100 border-blue-300 dark:bg-blue-500/20 dark:border-blue-400/30",
      textColor: "text-blue-800 dark:text-blue-300",
      description: "Feeling down or tearful",
      gradient: "from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-background dark:to-purple-900/10"
    },
    {
      value: 25,
      label: "😔 Low",
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-100 border-slate-300 dark:bg-slate-500/20 dark:border-slate-400/30",
      textColor: "text-slate-800 dark:text-slate-300",
      description: "Feeling discouraged or heavy",
      gradient: "from-slate-50 via-white to-gray-50 dark:from-slate-900/20 dark:via-background dark:to-gray-900/10"
    },
    {
      value: 50,
      label: "😐 Neutral",
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-100 border-gray-300 dark:bg-gray-500/20 dark:border-gray-400/30",
      textColor: "text-gray-800 dark:text-gray-300",
      description: "Feeling okay, neither up nor down",
      gradient: "from-gray-50 via-white to-slate-50 dark:from-gray-900/20 dark:via-background dark:to-slate-900/10"
    },
    {
      value: 75,
      label: "🙂 Good",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100 border-green-300 dark:bg-green-500/20 dark:border-green-400/30",
      textColor: "text-green-800 dark:text-green-300",
      description: "Feeling positive and content",
      gradient: "from-green-50 via-white to-emerald-50 dark:from-green-900/20 dark:via-background dark:to-emerald-900/10"
    },
    {
      value: 100,
      label: "😄 Great",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-100 border-amber-300 dark:bg-amber-500/20 dark:border-amber-400/30",
      textColor: "text-amber-800 dark:text-amber-300",
      description: "Feeling happy and energetic",
      gradient: "from-amber-50 via-white to-orange-50 dark:from-amber-900/20 dark:via-background dark:to-orange-900/10"
    },
  ];

  const features = [
    {
      icon: HeartPulse,
      title: "24/7 Support",
      description: "Always here to listen and support you, any time of day",
      color: "from-rose-500/20",
      delay: 0.2,
    },
    {
      icon: Lightbulb,
      title: "Smart Insights",
      description: "Personalized guidance powered by emotional intelligence",
      color: "from-amber-500/20",
      delay: 0.4,
    },
    {
      icon: Lock,
      title: "Private & Secure",
      description: "Your conversations are always confidential and encrypted",
      color: "from-emerald-500/20",
      delay: 0.6,
    },
    {
      icon: MessageSquareHeart,
      title: "Evidence-Based",
      description: "Therapeutic techniques backed by clinical research",
      color: "from-blue-500/20",
      delay: 0.8,
    },
  ];

  const [emotion, setEmotion] = useState(50);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentEmotion = emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];

  return (
    <div className={`flex flex-col min-h-screen overflow-hidden bg-gradient-to-br ${currentEmotion.gradient} transition-all duration-1000 ease-in-out`}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute w-[600px] h-[600px] rounded-full blur-3xl top-1/4 -left-40 transition-all duration-1000 ease-in-out bg-gradient-to-r ${currentEmotion.color} opacity-15 dark:opacity-40`}
          />
          <div
            className={`absolute w-[500px] h-[500px] rounded-full blur-3xl bottom-1/4 -right-20 transition-all duration-1000 ease-in-out delay-300 bg-gradient-to-l ${currentEmotion.color} opacity-10 dark:opacity-30`}
          />
          {/* Light mode overlay to soften the background */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/60 to-transparent dark:from-background dark:via-background/80 dark:to-transparent" />
        </div>

        <Ripple className="opacity-20 dark:opacity-100" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative space-y-8 text-center max-w-4xl mx-auto w-full"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-sm border border-primary/40 bg-primary/10 dark:bg-primary/5 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-primary/60 dark:hover:border-primary/40 transition-all duration-500 group"
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm" />
              </div>
              <span className="font-semibold text-primary dark:bg-gradient-to-r dark:from-primary dark:to-primary/80 dark:bg-clip-text dark:text-transparent">
                Your AI Mental Health Companion
              </span>
            </div>
            <Heart className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors duration-300" />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="inline-block mt-4 text-gray-900 dark:bg-gradient-to-b dark:from-foreground dark:to-foreground/80 dark:bg-clip-text dark:text-transparent">
                Find Peace
              </span>
              <br />
              <span className="inline-block mt-4 text-gray-900 dark:bg-gradient-to-b dark:from-foreground dark:to-foreground/80 dark:bg-clip-text dark:text-transparent">
                of Mind
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: mounted ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-muted-foreground/90 leading-relaxed font-light tracking-wide"
          >
            Experience a new way of emotional support. Our AI companion is here
            to listen, understand, and guide you through life&apos;s journey.
          </motion.p>

          {/* Emotion Selection Section */}
          <motion.div
            className="w-full max-w-2xl mx-auto space-y-8 py-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center gap-3 text-gray-500 dark:text-muted-foreground/80">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-muted-foreground/30" />
                <Waves className="w-5 h-5 text-primary" />
                <span className="font-medium text-sm uppercase tracking-wider">
                  How are you feeling today?
                </span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-muted-foreground/30" />
              </div>
              <p className="text-base text-gray-500 dark:text-muted-foreground/70 font-light">
                Whatever you&apos;re feeling, we&apos;re here to listen
              </p>
            </div>

            {/* Emotion Cards */}
            <div className="grid grid-cols-5 gap-3 px-2">
              {emotions.map((em) => (
                <motion.button
                  key={em.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                    Math.abs(emotion - em.value) < 15
                      ? `${em.bgColor} shadow-lg scale-105 opacity-100`
                      : "bg-white border-gray-200 dark:bg-background/50 dark:border-muted/20 opacity-80 hover:opacity-100 hover:shadow-md"
                  }`}
                  onClick={() => setEmotion(em.value)}
                >
                  <div className="text-3xl mb-2 transform-gpu">
                    {em.label.split(" ")[0]}
                  </div>
                  <div className={`text-sm font-medium ${em.textColor} capitalize`}>
                    {em.label.split(" ")[1]}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Enhanced Slider */}
            <div className="space-y-6 px-4">
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${currentEmotion.color} to-transparent blur-xl rounded-full -z-10 transition-all duration-700 opacity-10 dark:opacity-30`}
                />
                <Slider
                  value={[emotion]}
                  onValueChange={(value) => setEmotion(value[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="relative z-10"
                />
              </div>

              {/* Current Emotion Display */}
              <motion.div
                key={currentEmotion.value}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center space-y-3"
              >
                <p className="text-sm text-gray-500 dark:text-muted-foreground/70 font-medium">
                  Slide to express how you&apos;re feeling today
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-gray-200 dark:bg-background/80 dark:border-muted/20 shadow-sm">
                  <div className="text-2xl">
                    {currentEmotion.label.split(" ")[0]}
                  </div>
                  <div className="w-px h-6 bg-gray-300 dark:bg-muted/30" />
                  <p className="text-lg font-semibold text-gray-900 dark:text-foreground">
                    {currentEmotion.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center pt-8"
            >
              <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-lg font-semibold text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 bg-[length:200%_100%] group-hover:bg-[length:100%_100%] transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center gap-3">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Start Your Journey
                </span>
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent dark:text-primary/90">
              How SageMate Helps You
            </h2>
            <p className="text-foreground dark:text-foreground/95 max-w-2xl mx-auto font-medium text-lg">
              Experience a new kind of emotional support, powered by empathetic AI
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden border border-primary/10 hover:border-primary/20 transition-all duration-300 h-[200px] bg-card/30 dark:bg-card/80 backdrop-blur-sm">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 dark:group-hover:opacity-30`}
                  />
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300">
                        <feature.icon className="w-5 h-5 text-primary dark:text-primary/90" />
                      </div>
                      <h3 className="font-semibold tracking-tight text-foreground/90 dark:text-foreground">
                        {feature.title}
                      </h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground/90 dark:text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}