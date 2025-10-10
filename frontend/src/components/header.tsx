"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Menu, X, Heart, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/context/session-context";

export default function Header() {
  const { user, loading, isAuthenticated, logout } = useSession();
  const router = useRouter();
  
  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
      setIsMenuOpen(false);
    }
  };

  const getUserName = () => {
    if (!user) return "";
    if (user.name) return user.name.split(' ')[0];
    if (user.email) return user.email.split('@')[0];
    return "User";
  };

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-sm border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
          >
            <Image
              src="/logo.svg"
              alt="SageMate"
              width={140}
              height={40}
              className="w-32 h-8 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated && user && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* User Info */}
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <User className="w-4 h-4" />
                  <span>Hi, {getUserName()}!</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-2"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  {isLoggingOut ? "..." : "Logout"}
                </Button>
              </div>
            ) : (
              !loading && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/login")}
                  className="hidden sm:flex"
                >
                  Login
                </Button>
              )
            )}

            {/* Get Started Button */}
            <Button
              onClick={handleGetStarted}
              disabled={loading}
              className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Heart className="w-4 h-4" />
              {loading ? "..." : isAuthenticated ? "Dashboard" : "Get Started"}
            </Button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 pt-4 pb-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated && user && (
                <>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <User className="w-4 h-4" />
                      Signed in as {getUserName()}
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                {isAuthenticated ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="w-full justify-center"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                ) : (
                  !loading && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        router.push("/login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-center"
                    >
                      Login
                    </Button>
                  )
                )}
                
                <Button
                  onClick={handleGetStarted}
                  disabled={loading}
                  className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? "Loading..." : isAuthenticated ? "Go to Dashboard" : "Get Started"}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}