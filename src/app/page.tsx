"use client";
import { Ripple } from "@/components/ui/ripple";
import { useState, useEffect } from "react"; 


export default function Home() {
  const emotions = [
    {
      value: 0,
      label: "😢 Sad",
      color: "from-blue-400/60 to-indigo-600/40",
      description: "Feeling down or tearful",
    },
    {
      value: 25,
      label: "😔 Low",
      color: "from-slate-400/50 to-slate-500/40",
      description: "Feeling discouraged or heavy",
    },
    {
      value: 50,
      label: "😐 Neutral",
      color: "from-gray-400/50 to-gray-500/40",
      description: "Feeling okay, neither up nor down",
    },
    {
      value: 75,
      label: "🙂 Good",
      color: "from-green-400/50 to-emerald-500/40",
      description: "Feeling positive and content",
    },
    {
      value: 100,
      label: "😄 Great",
      color: "from-yellow-400/50 to-amber-500/40",
      description: "Feeling happy and energetic",
    },
  ];
  const [emotion, setEmotion] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentEmotion =
    emotions.find((em) => Math.abs(emotion - em.value) < 15) || emotions[2];
    
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <section className="relative min-h-[90vh] mt-20 flex flex-col items-center justify-center py-12 px-4">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className={`absolute w-[500px] h-[500px] rounded-full blur-3xl top-0 -left-20 transition-all
        duration-700 ease-in-out bg-gradient-to-r  `}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full bg-secondary/10 
        blur-3xl bottom-0 right-0 animate-pulse delay-100"
          />
        </div>
        <Ripple className="opacity-60"/> 
      </section>
    </div>
  );
}