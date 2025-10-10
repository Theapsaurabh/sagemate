"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, Shield, Users, Globe, Brain, Lock, MessageCircle, Target, Star, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const missions = [
  {
    icon: <Brain className="w-12 h-12" />,
    title: "Our Mission",
    description: "To revolutionize mental wellness by making professional-grade therapeutic support accessible to every human being. We believe that mental health care should be available 24/7, affordable, and completely private.",
    gradient: "from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600",
    iconColor: "text-blue-600 dark:text-blue-400",
    delay: 0.2
  },
  {
    icon: <Globe className="w-12 h-12" />,
    title: "Our Vision",
    description: "Creating a global sanctuary for mental wellness where AI-powered therapists provide immediate, compassionate support. We envision a world where nobody suffers in silence.",
    gradient: "from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    delay: 0.4
  },
  {
    icon: <Heart className="w-12 h-12" />,
    title: "Our Promise",
    description: "Every interaction is built on empathy, clinical excellence, and unwavering commitment to your wellbeing. We combine cutting-edge technology with human-centered design.",
    gradient: "from-rose-400 to-rose-500 dark:from-rose-500 dark:to-rose-600",
    iconColor: "text-rose-600 dark:text-rose-400",
    delay: 0.6
  },
];

const values = [
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Absolute Privacy",
    description: "Your thoughts are sacred. We protect them with military-grade encryption and blockchain security.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800",
    delay: 0.1
  },
  {
    icon: <Sparkles className="w-10 h-10" />,
    title: "Clinical Excellence",
    description: "Every AI therapist is trained on evidence-based practices and supervised by mental health professionals.",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-900/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    delay: 0.2
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Human-Centered",
    description: "Technology serves humanity. We design every feature with real human needs and emotions at the core.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800",
    delay: 0.3
  },
  {
    icon: <Lock className="w-10 h-10" />,
    title: "Trust & Transparency",
    description: "No hidden algorithms, no data selling. Complete transparency in how we help and protect you.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-800",
    delay: 0.4
  }
];

const stats = [
  { 
    number: "24/7", 
    label: "Always Available", 
    icon: MessageCircle, 
    color: "text-blue-600 dark:text-blue-400", 
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
    borderColor: "border-blue-200 dark:border-blue-800"
  },
  { 
    number: "100%", 
    label: "Private & Secure", 
    icon: Shield, 
    color: "text-purple-600 dark:text-purple-400", 
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
    borderColor: "border-purple-200 dark:border-purple-800"
  },
  { 
    number: "10K+", 
    label: "Users Helped", 
    icon: Users, 
    color: "text-rose-600 dark:text-rose-400", 
    bgColor: "bg-rose-50 dark:bg-rose-900/30",
    borderColor: "border-rose-200 dark:border-rose-800"
  },
  { 
    number: "150+", 
    label: "Countries Served", 
    icon: Globe, 
    color: "text-emerald-600 dark:text-emerald-400", 
    bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
    borderColor: "border-emerald-200 dark:border-emerald-800"
  }
];

const features = [
  {
    title: "AI-Powered Therapy",
    description: "Advanced AI trained on evidence-based therapeutic techniques",
    icon: Brain,
    color: "blue"
  },
  {
    title: "Instant Support",
    description: "Get help whenever you need it, no appointments required",
    icon: MessageCircle,
    color: "emerald"
  },
  {
    title: "Professional Grade",
    description: "Clinical excellence meets compassionate AI technology",
    icon: Star,
    color: "amber"
  }
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { 
        text: "text-blue-600 dark:text-blue-400", 
        bg: "bg-blue-50 dark:bg-blue-900/30", 
        border: "border-blue-200 dark:border-blue-800",
        gradient: "from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600" 
      },
      emerald: { 
        text: "text-emerald-600 dark:text-emerald-400", 
        bg: "bg-emerald-50 dark:bg-emerald-900/30", 
        border: "border-emerald-200 dark:border-emerald-800",
        gradient: "from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600" 
      },
      amber: { 
        text: "text-amber-600 dark:text-amber-400", 
        bg: "bg-amber-50 dark:bg-amber-900/30", 
        border: "border-amber-200 dark:border-amber-800",
        gradient: "from-amber-400 to-amber-500 dark:from-amber-500 dark:to-amber-600" 
      },
      rose: { 
        text: "text-rose-600 dark:text-rose-400", 
        bg: "bg-rose-50 dark:bg-rose-900/30", 
        border: "border-rose-200 dark:border-rose-800",
        gradient: "from-rose-400 to-rose-500 dark:from-rose-500 dark:to-rose-600" 
      },
      purple: { 
        text: "text-purple-600 dark:text-purple-400", 
        bg: "bg-purple-50 dark:bg-purple-900/30", 
        border: "border-purple-200 dark:border-purple-800",
        gradient: "from-purple-400 to-purple-500 dark:from-purple-500 dark:to-purple-600" 
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Professional Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-cyan-500/10" />
        
        {/* Subtle background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
                Trusted AI Mental Health Platform
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 40 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="block text-gray-900 dark:text-white">Professional</span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mt-2">
                  AI Therapy
                </span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: mounted ? 1 : 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light max-w-4xl mx-auto"
              >
                Evidence-based mental health support powered by advanced AI. 
                <span className="font-medium text-gray-900 dark:text-white"> Available 24/7, completely private,</span> and always compassionate.
              </motion.p>
            </motion.div>

            {/* Founder Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex justify-center"
            >
              <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center space-y-3">
                  <div className="space-y-2">
                    <p className="font-bold text-2xl text-gray-900 dark:text-white">Saurabh Pandey</p>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Founder & Clinical AI Specialist</p>
                  </div>
                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      +91 73550 18077
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      ampsaurabh88877@gmail.com
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const color = getColorClasses(feature.color);
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center space-y-4"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${color.bg} ${color.border} border-2 mx-auto`}>
                    <feature.icon className={`w-8 h-8 ${color.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} ${stat.borderColor} border mx-auto`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Our Purpose
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              We&apos;re bridging the gap in mental healthcare by combining clinical expertise with 
              cutting-edge AI technology to provide accessible, professional support to everyone.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: mission.delay, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="p-8 h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${mission.gradient} mb-6 group-hover:scale-105 transition-transform duration-300`}>
                    <div className="text-white">
                      {mission.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {mission.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {mission.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Our Principles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Built on a foundation of trust, excellence, and compassionate care
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: value.delay, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col items-center text-center p-6"
              >
                <div className={`mb-4 p-3 ${value.bgColor} ${value.borderColor} border rounded-2xl`}>
                  <div className={value.color}>
                    {value.icon}
                  </div>
                </div>
                <h3 className={`text-xl font-bold ${value.color} mb-3`}>
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional CTA */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Ready to Begin Your Journey?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto"
            >
              Join thousands who have found support through our professional AI therapy platform. 
              Take the first step toward better mental health today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <span>Start Professional Therapy</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-gray-500 dark:text-gray-500 text-sm mt-4"
            >
              Safe • Secure • Professional • Confidential
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}