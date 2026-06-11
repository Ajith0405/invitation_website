import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Finale() {
  const canvasRef = useRef(null);

  // Canvas ambient fireflies
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const fireflies = [];
    const maxFireflies = 25;

    class Firefly {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.fadeDir = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // random wander
        if (Math.random() > 0.98) {
          this.speedX = Math.random() * 0.4 - 0.2;
          this.speedY = Math.random() * 0.4 - 0.2;
        }

        // fade breathe
        this.opacity += this.fadeSpeed * this.fadeDir;
        if (this.opacity >= 0.8) {
          this.fadeDir = -1;
        } else if (this.opacity <= 0.1) {
          this.fadeDir = 1;
        }

        // wrap bounds
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.save();
        ctx.shadowBlur = this.size * 3;
        ctx.shadowColor = "#D4AF37";
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < maxFireflies; i++) {
      fireflies.push(new Firefly());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // dark gradient backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#4A0E17"); // Dark Maroon
      bgGrad.addColorStop(1, "#1E0509"); // Deepest Wine
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw traditional mandala watermark
      ctx.strokeStyle = "rgba(212, 175, 55, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 180, 0, Math.PI * 2);
      ctx.stroke();

      fireflies.forEach((f) => {
        f.update();
        f.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="finale" className="py-32 px-6 relative overflow-hidden select-none min-h-[70vh] flex flex-col justify-center items-center">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Decorative Border */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-brand-gold/10 pointer-events-none rounded-xl" />

      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Heart icon floating */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-brand-gold mb-6"
        >
          <Heart className="w-10 h-10 fill-brand-gold/20 stroke-brand-gold" />
        </motion.div>

        {/* Cursive Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="text-brand-blush-light font-cursive text-3xl md:text-4xl mb-4"
        >
          Two Hearts, One Journey
        </motion.p>

        {/* Names */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gold-gradient mb-8 leading-tight tracking-wide"
        >
          Ajith &amp; Rishivindhiya
        </motion.h2>

        <div className="h-[1.5px] w-36 bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-8" />

        {/* Closing Invitation Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-brand-champagne/80 font-serif text-sm sm:text-base md:text-lg tracking-widest uppercase leading-relaxed max-w-xl"
        >
          Awaiting your gracious presence and blessings
        </motion.p>

        {/* Footer Accent */}
        <span className="text-[20px] text-brand-gold/40 mt-12 block">⚜</span>
      </div>
    </section>
  );
}
