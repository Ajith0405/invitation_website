import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export default function WelcomeScreen({ onOpenInvitation }) {
  const [isOpened, setIsOpened] = useState(false);
  const canvasRef = useRef(null);

  // Canvas Particle & Petal System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles: Sparkles & Petals
    const particles = [];
    const maxParticles = 60;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 50;
        this.size = Math.random() * 4 + 1;
        this.speedY = Math.random() * 1.5 + 0.8;
        this.speedX = Math.random() * 1 - 0.5;
        this.type = Math.random() > 0.4 ? "sparkle" : "petal"; // Sparkle or rose petal
        this.color = this.type === "sparkle" 
          ? `rgba(${212 + Math.random() * 40}, ${175 + Math.random() * 40}, 55, ${Math.random() * 0.7 + 0.3})` // golden
          : `rgba(${170 + Math.random() * 85}, ${20 + Math.random() * 30}, ${40 + Math.random() * 30}, ${Math.random() * 0.6 + 0.4})`; // soft rose red/maroon
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.petalWidth = Math.random() * 6 + 6;
        this.petalHeight = Math.random() * 4 + 4;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y / 30) * 0.2;
        this.rotation += this.rotationSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        if (this.type === "sparkle") {
          // Draw standard star/sparkle
          ctx.fillStyle = this.color;
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(0, -this.size * 2);
            ctx.lineTo(this.size / 2, -this.size / 2);
            ctx.rotate(Math.PI / 2);
          }
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw beautiful organic rose petal shape
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-this.petalWidth, -this.petalHeight, -this.petalWidth / 2, -this.petalHeight * 2, 0, -this.petalHeight * 2);
          ctx.bezierCurveTo(this.petalWidth / 2, -this.petalHeight * 2, this.petalWidth, -this.petalHeight, 0, 0);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
      // distribute them across screen initially
      particles[i].y = Math.random() * height;
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw background gradient
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
      bgGrad.addColorStop(0, "#4A0E17"); // Dark Maroon center
      bgGrad.addColorStop(1, "#1A0307"); // Even darker outer edges
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw mandala overlay outline in center
      ctx.strokeStyle = "rgba(212, 175, 55, 0.04)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 220, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 150, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    // Play sound and trigger fade
    if (onOpenInvitation) {
      onOpenInvitation();
    }
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05, 
            transition: { duration: 1.2, ease: "easeInOut", delay: 0.6 } 
          }}
          className="fixed inset-0 z-[100] overflow-hidden select-none"
        >
          {/* Main Animated Canvas Background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* Golden Gate Opening Overlay */}
          {/* Left Gate */}
          <motion.div
            initial={{ x: 0 }}
            animate={isOpened ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 left-0 w-1/2 h-full bg-[#1e0509]/95 border-r border-brand-gold/30 flex items-center justify-end overflow-hidden z-10 pointer-events-none"
          >
            {/* Elegant Golden Border and Motif */}
            <div className="absolute right-0 top-0 bottom-0 w-24 border-r-4 border-double border-brand-gold/40 flex flex-col justify-between py-10 items-center opacity-70">
              <span className="text-brand-gold font-serif tracking-widest text-sm rotate-90 my-8">WELCOME</span>
              <span className="text-brand-gold text-lg">⚜</span>
              <span className="text-brand-gold font-serif tracking-widest text-sm rotate-90 my-8">CELEBRATE</span>
            </div>
            
            <div className="w-[150px] h-[300px] border-y border-l border-brand-gold/20 rounded-l-full mr-[-75px] opacity-20 flex items-center justify-center">
              <div className="w-[100px] h-[200px] border border-brand-gold/20 rounded-l-full" />
            </div>
          </motion.div>

          {/* Right Gate */}
          <motion.div
            initial={{ x: 0 }}
            animate={isOpened ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
            className="absolute top-0 right-0 w-1/2 h-full bg-[#1e0509]/95 border-l border-brand-gold/30 flex items-center justify-start overflow-hidden z-10 pointer-events-none"
          >
            {/* Elegant Golden Border and Motif */}
            <div className="absolute left-0 top-0 bottom-0 w-24 border-l-4 border-double border-brand-gold/40 flex flex-col justify-between py-10 items-center opacity-70">
              <span className="text-brand-gold font-serif tracking-widest text-sm -rotate-90 my-8">WELCOME</span>
              <span className="text-brand-gold text-lg">⚜</span>
              <span className="text-brand-gold font-serif tracking-widest text-sm -rotate-90 my-8">CELEBRATE</span>
            </div>

            <div className="w-[150px] h-[300px] border-y border-r border-brand-gold/20 rounded-r-full ml-[-75px] opacity-20 flex items-center justify-center">
              <div className="w-[100px] h-[200px] border border-brand-gold/20 rounded-r-full" />
            </div>
          </motion.div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-16 px-6 z-20">
            {/* Top Motif */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-brand-gold opacity-80 flex flex-col items-center gap-1"
            >
              <span className="text-3xl">⚜</span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
            </motion.div>

            {/* Core Titles */}
            <div className="text-center max-w-2xl px-4 flex flex-col items-center">
              <motion.p
                initial={{ opacity: 0, letterSpacing: "0.1em" }}
                animate={{ opacity: 0.9, letterSpacing: "0.25em" }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="text-brand-gold font-serif text-xs md:text-sm uppercase mb-4 tracking-widest"
              >
                Together with their families
              </motion.p>

              {/* Names */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="my-6 flex flex-col items-center"
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-gold-gradient font-bold drop-shadow-md mb-2 leading-snug">
                  S. Ajith
                </h1>
                
                <motion.div 
                  animate={{ scale: [1, 1.15, 1] }} 
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="my-3 text-brand-gold/80"
                >
                  <Heart className="w-8 h-8 fill-brand-gold/20 stroke-brand-gold stroke-[1.5]" />
                </motion.div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-gold-gradient font-bold drop-shadow-md leading-snug">
                  G. Rishivindhiya
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 1.0, delay: 1.0 }}
                className="text-brand-blush-light font-cursive text-2xl sm:text-3xl mt-4"
              >
                Invite you to celebrate their wedding
              </motion.p>
            </div>

            {/* Bottom Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col items-center gap-4"
            >
              <button
                onClick={handleOpen}
                className="px-8 py-3.5 bg-gold-gradient hover:brightness-110 text-brand-maroon-dark font-serif font-bold tracking-widest text-sm rounded-full shadow-lg border border-brand-gold/50 cursor-pointer active:scale-95 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer Effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                OPEN INVITATION
              </button>
              <span className="text-[10px] uppercase tracking-widest text-brand-gold/50 font-serif">
                Turn on audio for music ♫
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
