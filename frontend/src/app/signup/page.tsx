/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Mail, User, Lock, Eye, EyeOff, Brain, Sparkles, Heart, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { registerUser } from "@/lib/api/auth"; // Make sure this import exists

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Frontend validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    
    try {
    
      await registerUser(name, email, password);
      
      router.push("/login");
      
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-rose-50 to-cyan-50 dark:from-indigo-950/30 dark:via-rose-950/20 dark:to-cyan-950/30">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full blur-3xl bg-indigo-200/60 dark:bg-indigo-900/30 top-1/4 -left-32 animate-float" />
        <div className="absolute w-[450px] h-[450px] rounded-full blur-3xl bg-rose-200/50 dark:bg-rose-900/25 bottom-1/3 -right-28 animate-float delay-1000" />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-3xl bg-cyan-200/40 dark:bg-cyan-900/20 top-3/4 left-1/3 animate-float delay-2000" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-transparent dark:from-gray-900/95 dark:via-gray-900/80 dark:to-transparent" />
      </div>

      <Container className="flex flex-col items-center justify-center w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {/* Enhanced Header Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8 p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 shadow-2xl"
          >
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-pulse" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent mb-3">
              Begin Your Journey
            </h1>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-2">
              Create your SageMate account
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Join thousands finding peace and clarity
            </p>
          </motion.div>

          {/* Enhanced Form Card */}
          <Card className="w-full p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-600/30 bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-800/90 backdrop-blur-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-5"
              >
                {/* Name Input */}
                <div className="space-y-3">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <User className="w-4 h-4 text-violet-600" />
                    Full Name
                  </label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-12 pr-4 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-rose-600" />
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-12 pr-4 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-3">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyan-600" />
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      className="pl-12 pr-12 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-3">
                  <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-12 pr-12 py-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 border-2 border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* ✅ SINGLE Error Message - Removed duplicate */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-200 dark:border-rose-700"
                >
                  <p className="text-rose-700 dark:text-rose-300 text-sm font-medium text-center flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {/* ✅ REMOVED duplicate error display here */}
                <Button
                  className="w-full py-4 rounded-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] group"
                  size="lg"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-white/90">Creating your account...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-3 text-white group-hover:gap-4 transition-all duration-300">
                      <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      Start Your Wellness Journey
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Enhanced Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="my-8 relative"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300/50 dark:border-gray-600/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-400 font-medium">
                  Already have an account?
                </span>
              </div>
            </motion.div>

            {/* Enhanced Login Link */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="text-center"
            >
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 font-semibold hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                Sign in to existing account
              </Link>
            </motion.div>
          </Card>

          {/* Enhanced Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="text-center mt-8 p-4 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
              <Shield className="w-3 h-3 text-emerald-500" />
              Your data is encrypted and secure • 256-bit SSL protection
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}