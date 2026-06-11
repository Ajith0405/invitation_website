import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown() {
  // Target wedding date: June 17, 2026, at 6:00 AM IST
  const targetDate = new Date("2026-06-17T06:00:00+05:30").getTime();
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isCelebration, setIsCelebration] = useState(false);

  function calculateTimeLeft() {
    const difference = targetDate - new Date().getTime();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null; // Countdown finished
    }
    return timeLeft;
  }

  useEffect(() => {
    if (!timeLeft) {
      setIsCelebration(true);
      return;
    }

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (!remaining) {
        setIsCelebration(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const timeBlocks = [
    { label: "Days", value: timeLeft ? timeLeft.days : 0 },
    { label: "Hours", value: timeLeft ? timeLeft.hours : 0 },
    { label: "Minutes", value: timeLeft ? timeLeft.minutes : 0 },
    { label: "Seconds", value: timeLeft ? timeLeft.seconds : 0 },
  ];

  return (
    <section id="countdown" className="py-24 px-6 bg-brand-maroon text-brand-gold relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-gradient from-brand-maroon-dark/50 to-transparent pointer-events-none" />

      {/* Falling background dust/sparkles */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-brand-gold rounded-full animate-ping" />
        <div className="absolute bottom-20 right-20 w-3.5 h-3.5 bg-brand-gold rounded-full animate-ping" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-brand-gold rounded-full animate-ping" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-brand-blush/80 font-serif tracking-widest text-xs uppercase block mb-2">COUNTING THE SECONDS</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-gold-gradient inline-block relative">
            Save The Date
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Counter cards */}
        {!isCelebration ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {timeBlocks.map((block, i) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group"
              >
                {/* Glow ring */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold/0 via-brand-gold/30 to-brand-gold/0 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500" />
                
                {/* Main Card */}
                <div className="relative rounded-2xl bg-[#590f1a] border border-brand-gold/20 p-5 md:p-6 shadow-2xl flex flex-col items-center justify-center">
                  <div className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-2 filter drop-shadow-[0_2px_4px_rgba(212,175,55,0.4)]">
                    {String(block.value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-brand-gold font-serif">
                    {block.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-panel-dark border border-brand-gold/40 max-w-md mx-auto p-8 rounded-2xl shadow-2xl"
          >
            <h3 className="font-cursive text-4xl text-white mb-2">Happily Married!</h3>
            <p className="text-sm text-brand-gold tracking-widest uppercase font-serif">
              Ajith ❤️ Rishivindhiya
            </p>
          </motion.div>
        )}

        {/* Date Display */}
        <p className="mt-12 text-sm md:text-base font-serif tracking-widest text-brand-blush">
          JUNE 17, 2026 • VELLORE
        </p>

      </div>
    </section>
  );
}
