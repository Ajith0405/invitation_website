import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code, BookOpen, User, Briefcase } from "lucide-react";
import groomImg from "../assets/groom.jpg";
import brideImg from "../assets/bride.jpg";

// Canvas for Groom code particles
function GroomCanvas() {
  const canvasRef = useRef(null);

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

    const particles = [];
    const symbols = ["{ }", "const", "< />", "01", "++", ";", "=>", "dev"];

    class CodeParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
        this.fontSize = Math.random() * 10 + 9;
        this.speedY = -(Math.random() * 0.8 + 0.3);
        this.opacity = Math.random() * 0.4 + 0.15;
      }

      update() {
        this.y += this.speedY;
        if (this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`; // gold color
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillText(this.symbol, this.x, this.y);
      }
    }

    for (let i = 0; i < 15; i++) {
      particles.push(new CodeParticle());
      particles[i].y = Math.random() * height; // scatter
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Canvas for Bride sparkles/floral particles
function BrideCanvas() {
  const canvasRef = useRef(null);

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

    const particles = [];

    class SparkleParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 20;
        this.size = Math.random() * 3 + 2;
        this.speedY = -(Math.random() * 0.7 + 0.3);
        this.opacity = Math.random() * 0.5 + 0.2;
        this.angle = Math.random() * Math.PI;
      }

      update() {
        this.y += this.speedY;
        this.angle += 0.01;
        this.x += Math.sin(this.angle) * 0.2;
        if (this.y < -20) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = `rgba(232, 197, 200, ${this.opacity})`; // blush pink
        
        // draw a small glowing blossom
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.rotate((Math.PI * 2) / 5);
        }
        ctx.closePath();
        ctx.fill();

        // center golden dot
        ctx.fillStyle = `rgba(214, 175, 55, ${this.opacity + 0.2})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < 15; i++) {
      particles.push(new SparkleParticle());
      particles[i].y = Math.random() * height;
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// 3D Tilt Card Component
function TiltCard({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map values to tilt rotations
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Introduction() {
  return (
    <section id="introduction" className="py-24 px-6 relative bg-brand-champagne/40">
      {/* Ornamental Background Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t-2 border-l-2 border-brand-gold/20 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b-2 border-r-2 border-brand-gold/20 rounded-br-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-serif tracking-widest text-xs uppercase block mb-2">INTRODUCING THE COUPLE</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-maroon font-bold inline-block relative">
            Bride & Groom
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Split screen layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Groom Card */}
          <TiltCard className="relative h-full flex flex-col justify-between overflow-hidden rounded-2xl glass-panel-dark border border-brand-gold/30 p-8 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-brand-gold/10 hover:border-brand-gold/50 cursor-default">
            {/* Background floating symbols */}
            <GroomCanvas />
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Photo Frame with Vector SVG placeholder */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-brand-gold/40 p-1 bg-brand-maroon-dark overflow-hidden mb-6 flex items-center justify-center shadow-lg">
                {/* Groom Photo */}
                <img src={groomImg} alt="S. Ajith" className="w-full h-full object-cover rounded-full" />
                <div className="absolute top-2 right-2 text-brand-gold/30">
                  <Code className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Information */}
              <h3 className="text-2xl md:text-3xl font-serif text-brand-gold font-bold mb-1 tracking-wide">
                S. Ajith, <span className="text-lg md:text-xl font-sans font-normal opacity-90">B.Tech</span>
              </h3>
              <p className="text-brand-blush-light/85 font-sans text-sm tracking-wider uppercase flex items-center gap-1.5 mb-6">
                <Briefcase className="w-4 h-4 text-brand-gold" />
                Senior Software Developer
              </p>

              <div className="h-[1px] w-24 bg-brand-gold/30 mb-6" />

              <p className="text-brand-champagne/80 font-sans text-sm text-center leading-relaxed max-w-sm">
                Combining logic, code, and structured thinking with a warm heart. He builds digital worlds by day and looks forward to starting his ultimate partnership.
              </p>
            </div>
            
            {/* Tech accents */}
            <div className="mt-8 flex justify-center gap-2 relative z-10">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold">
                &lt; Developer /&gt;
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold">
                &#123; Full Stack &#125;
              </span>
            </div>
          </TiltCard>

          {/* Bride Card */}
          <TiltCard className="relative h-full flex flex-col justify-between overflow-hidden rounded-2xl bg-white/70 border border-brand-gold/20 p-8 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-brand-maroon/5 hover:border-brand-maroon/30 cursor-default">
            {/* Background floating sparkles */}
            <BrideCanvas />

            <div className="relative z-10 flex flex-col items-center">
              {/* Photo Frame with Vector SVG placeholder */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-brand-maroon/20 p-1 bg-brand-blush-light overflow-hidden mb-6 flex items-center justify-center shadow-lg">
                {/* Bride Photo */}
                <img src={brideImg} alt="G. Rishivindhiya" className="w-full h-full object-cover rounded-full" />
                <div className="absolute top-2 right-2 text-brand-maroon/30">
                  <span className="text-xl animate-pulse">✿</span>
                </div>
              </div>

              {/* Information */}
              <h3 className="text-2xl md:text-3xl font-serif text-brand-maroon font-bold mb-1 tracking-wide">
                G. Rishivindhiya, <span className="text-lg md:text-xl font-sans font-normal opacity-90">M.Sc</span>
              </h3>
              <p className="text-brand-maroon/75 font-sans text-sm tracking-wider uppercase flex items-center gap-1.5 mb-6">
                <BookOpen className="w-4 h-4 text-brand-maroon" />
                Judicial Department
              </p>

              <div className="h-[1px] w-24 bg-brand-maroon/20 mb-6" />

              <p className="text-brand-maroon-dark/75 font-sans text-sm text-center leading-relaxed max-w-sm">
                A graceful blend of intelligence, ethics, and cultural values. She brings precision, kindness, and light, excited to embark on this beautiful new journey.
              </p>
            </div>

            {/* Floral accents */}
            <div className="mt-8 flex justify-center gap-2 relative z-10">
              <span className="text-[10px] font-serif px-2.5 py-1 rounded-full bg-brand-blush-light border border-brand-blush text-brand-maroon">
                ✿ Grace & Honor
              </span>
              <span className="text-[10px] font-serif px-2.5 py-1 rounded-full bg-brand-blush-light border border-brand-blush text-brand-maroon">
                ⚖ Justice Dept
              </span>
            </div>
          </TiltCard>

        </div>
      </div>
    </section>
  );
}
