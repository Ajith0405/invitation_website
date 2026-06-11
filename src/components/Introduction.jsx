import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code, BookOpen, User, Briefcase } from "lucide-react";

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
                {/* Groom SVG Avatar */}
                <svg className="w-full h-full text-brand-gold/80 p-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3"/>
                  {/* Styled minimalist face sketch */}
                  <path d="M50 20C40 20 36 26 36 34C36 40 40 46 50 46C60 46 64 40 64 34C64 26 60 20 50 20Z" fill="currentColor" opacity="0.15"/>
                  {/* Traditional South Indian Groom Haircut/Kudumi line */}
                  <path d="M50 18C44 18 39 21 37 25C40 25 43 23 50 23C57 23 60 25 63 25C61 21 56 18 50 18Z" fill="currentColor"/>
                  {/* Silhouette shoulders */}
                  <path d="M22 80C22 65 32 55 50 55C68 55 78 65 78 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* Traditional veshti border line */}
                  <path d="M44 55V80" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  <path d="M56 55V80" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  {/* Golden Chain representation */}
                  <path d="M42 58C45 61 55 61 58 58" stroke="currentColor" strokeWidth="1"/>
                </svg>
                <div className="absolute top-2 right-2 text-brand-gold/30">
                  <Code className="w-5 h-5 animate-pulse" />
                </div>
              </div>

              {/* Information */}
              <h3 className="text-2xl md:text-3xl font-serif text-brand-gold font-bold mb-1 tracking-wide">
                S. Ajith, B.Tech
              </h3>
              <p className="text-brand-blush-light/85 font-sans text-sm tracking-wider uppercase flex items-center gap-1.5 mb-6">
                <Briefcase className="w-4 h-4 text-brand-gold" />
                Senior Software Developer
              </p>

              <div className="h-[1px] w-24 bg-brand-gold/30 mb-6" />

              <p className="text-brand-champagne/80 font-sans text-sm text-center leading-relaxed max-w-sm">
                Combining logic, code, and structured thinking with a warm heart. S. Ajith builds digital worlds by day and looks forward to starting his ultimate partnership.
              </p>
            </div>
            
            {/* Tech accents */}
            <div className="mt-8 flex justify-center gap-2 relative z-10">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold">
                &lt; Developer /&gt;
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold">
                &#123; Javascript &#125;
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
                {/* Bride SVG Avatar */}
                <svg className="w-full h-full text-brand-maroon/70 p-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3"/>
                  {/* Silhouette face */}
                  <path d="M50 22C41 22 37 27 37 35C37 41 41 47 50 47C59 47 63 41 63 35C63 27 59 22 50 22Z" fill="currentColor" opacity="0.1"/>
                  {/* Traditional hair line with side pleats and flower decorations */}
                  <path d="M50 20C43 20 38 23 37 28C39 27 43 25 50 25C57 25 61 27 63 28C62 23 57 20 50 20Z" fill="currentColor"/>
                  {/* South Indian Bridal Jasmine flower line on side of head */}
                  <circle cx="34" cy="28" r="3" fill="#FAF8F5" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="32" cy="34" r="3" fill="#FAF8F5" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="33" cy="40" r="3" fill="#FAF8F5" stroke="currentColor" strokeWidth="0.5"/>
                  {/* Bridal Bindi / Nettipattam represent */}
                  <circle cx="50" cy="27" r="1.5" fill="#D4AF37"/>
                  <path d="M50 22V25" stroke="#D4AF37" strokeWidth="1"/>
                  {/* Shoulders */}
                  <path d="M22 80C22 65 32 55 50 55C68 55 78 65 78 80" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  {/* Traditional Sari pleat outline */}
                  <path d="M38 58C43 65 47 72 50 80" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M42 56C47 63 52 70 54 80" stroke="#D4AF37" strokeWidth="1"/>
                </svg>
                <div className="absolute top-2 right-2 text-brand-maroon/30">
                  <span className="text-xl animate-pulse">✿</span>
                </div>
              </div>

              {/* Information */}
              <h3 className="text-2xl md:text-3xl font-serif text-brand-maroon font-bold mb-1 tracking-wide">
                G. Rishivindhiya, M.Sc
              </h3>
              <p className="text-brand-maroon/75 font-sans text-sm tracking-wider uppercase flex items-center gap-1.5 mb-6">
                <BookOpen className="w-4 h-4 text-brand-maroon" />
                Judicial Department
              </p>

              <div className="h-[1px] w-24 bg-brand-maroon/20 mb-6" />

              <p className="text-brand-maroon-dark/75 font-sans text-sm text-center leading-relaxed max-w-sm">
                A graceful blends of intelligence, ethics, and cultural values. G. Rishivindhiya brings precision, kindness, and light, excited to embark on this beautiful new journey.
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
