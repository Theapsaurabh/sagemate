"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Menu, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About SageMate" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 group-hover:opacity-30 blur transition-all duration-300" />
              <Image
                src="/logo.svg"
                alt="Aura - Mental Health Companion"
                width={160}
                height={160}
                className="relative w-32 h-8 lg:w-40 lg:h-10 object-contain drop-shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3 text-pink-500 animate-pulse" />
              <span className="text-xs text-muted-foreground font-light tracking-wide">
                Your mental health companion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-4/5 group-hover:left-1/10 transition-all duration-300 transform -translate-x-1/2" />
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Get Started Button - Desktop */}
            <Button
              variant="default"
              size="sm"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Heart className="h-4 w-4" />
              Get Started
            </Button>

            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden transition-all duration-300 hover:bg-primary/10 hover:scale-110 relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              {!isMenuOpen && (
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-ping" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col space-y-2 pt-4 border-t border-border/40 bg-background/50 backdrop-blur-lg rounded-lg">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-lg transition-all duration-300 flex items-center space-x-3 group"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300" />
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile Get Started Button */}
            <div className="px-4 pt-2">
              <Button
                variant="default"
                size="sm"
                className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ${
          scrolled ? "w-full" : "w-0"
        }`}
      />
    </header>
  );
}