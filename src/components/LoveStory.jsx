import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, MessageCircle, Users, Sparkles, Gem } from "lucide-react";

const milestones = [
  {
    id: 1,
    title: "First Meet",
    date: "September 2019",
    desc: "A chance introduction that changed everything. Sparking a quiet connection that felt natural from the very first hello.",
    icon: MessageCircle,
    color: "#D4AF37", // Gold
  },
  {
    id: 2,
    title: "Friendship",
    date: "February 2020",
    desc: "Late-night chats, shared jokes, and support. Building a foundation of trust and friendship that made us inseparable.",
    icon: Users,
    color: "#6A1B29", // Maroon
  },
  {
    id: 3,
    title: "Love",
    date: "June 2023",
    desc: "When friendship blossomed into something deeper. Realizing that our hearts belonged together, embarking on a beautiful relationship.",
    icon: Heart,
    color: "#E8C5C8", // Blush
  },
  {
    id: 4,
    title: "Family Blessings",
    date: "January 2026",
    desc: "Taking the big step. Bringing our two families together, uniting our traditions, and receiving their warm blessings.",
    icon: Sparkles,
    color: "#C5A059", // Gold dark
  },
  {
    id: 5,
    title: "Engagement",
    date: "May 2026",
    desc: "Exchanging rings and promising a lifetime. With smiles, tears of joy, and hearts full of dreams for the future.",
    icon: Gem,
    color: "#4A0E17", // Maroon dark
  },
  {
    id: 6,
    title: "The Wedding",
    date: "June 2026",
    desc: "The beginning of forever. Hand in hand, we take our wedding vows, stepping into a lifetime of love and companionship.",
    icon: Heart,
    color: "#D4AF37", // Gold
  },
];

// Floating Heart element for active nodes
function FloatingHearts({ active }) {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5, y: 0, x: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            y: -80 - Math.random() * 50,
            x: (Math.random() - 0.5) * 60,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className="absolute left-1/2 bottom-1/2 text-brand-maroon"
        >
          <Heart className="w-3.5 h-3.5 fill-current opacity-70" />
        </motion.div>
      ))}
    </div>
  );
}

export default function LoveStory() {
  const containerRef = useRef(null);

  // Scroll tracking to animate the progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to line width
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef}
      id="story" 
      className="py-24 px-6 bg-brand-ivory relative overflow-hidden"
    >
      {/* Background floral vector shapes */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-96 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full fill-brand-maroon" viewBox="0 0 100 200">
          <path d="M0,0 C50,50 50,150 0,200 Z" />
        </svg>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-48 h-96 opacity-[0.03] pointer-events-none rotate-180">
        <svg className="w-full h-full fill-brand-maroon" viewBox="0 0 100 200">
          <path d="M0,0 C50,50 50,150 0,200 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-brand-gold font-serif tracking-widest text-xs uppercase block mb-2">OUR PATH TO TOGETHERNESS</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-maroon font-bold inline-block relative">
            Our Love Story
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-16 md:mt-24 px-4 overflow-x-auto pb-10 scrollbar-none">
          <div className="min-w-[1000px] md:min-w-none relative flex flex-row justify-between py-6">
            
            {/* Background connecting line */}
            <div className="absolute left-[5%] right-[5%] top-[40px] h-[3px] bg-brand-champagne pointer-events-none">
              {/* Dynamic filled line based on scroll */}
              <motion.div 
                style={{ width: lineWidth }} 
                className="h-full bg-gold-gradient rounded-full" 
              />
            </div>

            {/* Milestones Nodes */}
            {milestones.map((item, index) => {
              const MilestoneIcon = item.icon;

              return (
                <div 
                  key={item.id} 
                  className="w-[15%] flex flex-col items-center relative group"
                >
                  {/* Floating hearts animation */}
                  <FloatingHearts active={true} />

                  {/* Icon Node */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-full border-2 border-brand-gold flex items-center justify-center bg-brand-ivory text-brand-maroon shadow-md relative z-10 cursor-pointer transition-colors duration-300 group-hover:bg-brand-maroon group-hover:text-brand-gold group-hover:border-brand-maroon"
                  >
                    <MilestoneIcon className="w-5 h-5 stroke-[1.5]" />
                  </motion.div>

                  {/* Date Badge */}
                  <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 0.8, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
                    className="text-[11px] uppercase tracking-wider font-semibold text-brand-maroon mt-4 font-serif"
                  >
                    {item.date}
                  </motion.span>

                  {/* Information Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                    className="mt-6 rounded-xl glass-panel p-5 text-center shadow-lg border border-brand-gold/15 group-hover:border-brand-gold/40 transition-colors duration-300 neumorphic-shadow max-w-[200px]"
                  >
                    <h3 className="font-serif text-brand-maroon font-bold text-base mb-2 group-hover:text-brand-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-brand-maroon-dark/75 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </motion.div>

                </div>
              );
            })}

          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <p className="text-center text-[10px] text-brand-maroon/40 uppercase tracking-widest mt-6 md:hidden">
          Swipe left / right to read our timeline ⟷
        </p>
      </div>
    </section>
  );
}
