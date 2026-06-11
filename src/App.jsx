import React, { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen";
import MusicWidget from "./components/MusicWidget";
import Introduction from "./components/Introduction";
import LoveStory from "./components/LoveStory";
import Events from "./components/Events";
import VenueMap from "./components/VenueMap";
import FamilyTree from "./components/FamilyTree";
import Countdown from "./components/Countdown";
import Guestbook from "./components/Guestbook";
import Finale from "./components/Finale";
import { Menu, X, Heart } from "lucide-react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [musicPlayTrigger, setMusicPlayTrigger] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Progress Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setMusicPlayTrigger(true);
  };

  const navLinks = [
    { href: "#introduction", label: "COUPLE" },
    { href: "#story", label: "OUR STORY" },
    { href: "#events", label: "EVENTS" },
    { href: "#venue", label: "VENUE" },
    { href: "#family", label: "FAMILY" },
    { href: "#guestbook", label: "GUESTBOOK" },
  ];

  return (
    <div className="relative min-h-screen bg-brand-ivory text-brand-maroon-dark selection:bg-brand-gold/30 selection:text-brand-maroon-dark">
      {/* 1. Grand Welcome Gate Screen */}
      <WelcomeScreen onOpenInvitation={handleOpenInvitation} />

      {/* 2. Main Site content (rendered only after Open Invitation is clicked, or always rendered but hidden behind transition) */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full overflow-hidden"
        >
          {/* Scroll progress bar at top */}
          <motion.div 
            style={{ scaleX }} 
            className="fixed top-0 left-0 right-0 h-1 bg-gold-gradient origin-left z-50" 
          />

          {/* Sticky Navigation Header */}
          <header className="fixed top-0 inset-x-0 z-40 glass-panel border-b border-brand-gold/10 px-6 py-4 shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              
              {/* Couple Emblem Logo */}
              <a href="#" className="flex items-center gap-1.5 font-serif text-brand-maroon hover:text-brand-maroon-dark transition-colors font-bold text-sm tracking-widest cursor-pointer select-none">
                A <Heart className="w-3.5 h-3.5 fill-brand-gold stroke-brand-gold inline-block" /> R
              </a>

              {/* Desktop Nav Links */}
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-serif text-[11px] tracking-widest text-brand-maroon hover:text-brand-gold font-bold transition-colors select-none"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-brand-maroon focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Nav Drawer */}
            {mobileMenuOpen && (
              <motion.nav 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden absolute top-full inset-x-0 bg-brand-ivory/95 border-b border-brand-gold/10 px-6 py-6 flex flex-col gap-4 shadow-lg text-center"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-xs tracking-widest text-brand-maroon hover:text-brand-gold font-bold transition-colors select-none"
                  >
                    {link.label}
                  </a>
                ))}
              </motion.nav>
            )}
          </header>

          {/* Spacer to push content past fixed header */}
          <div className="h-16" />

          {/* Main Cinematic Header Card */}
          <section className="relative h-[80vh] flex flex-col justify-center items-center px-6 text-center select-none bg-gradient-to-b from-brand-champagne/45 to-transparent">
            {/* Background floating petal elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              <span className="falling-petal left-[10%] text-brand-blush text-xl animate-float-slow">✿</span>
              <span className="falling-petal left-[40%] text-brand-gold text-lg delay-1000 animate-float-slow">❀</span>
              <span className="falling-petal left-[80%] text-brand-blush-light text-2xl delay-3000 animate-float-slow">✿</span>
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl flex flex-col items-center"
            >
              {/* Wedding Ring Motif */}
              <span className="text-3xl text-brand-gold mb-4 animate-bounce-slow">⚜</span>
              
              <div className="flex flex-col items-center mb-6">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-brand-maroon font-extrabold tracking-wide leading-tight">
                  S. Ajith
                </h1>
                <span className="font-cursive text-brand-gold text-2xl md:text-4xl my-2 font-normal italic select-none">
                  with
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-brand-maroon font-extrabold tracking-wide leading-tight">
                  G. Rishivindhiya
                </h1>
              </div>

              <div className="h-[1px] w-24 bg-brand-gold/30 my-4" />

              <p className="text-xs md:text-sm tracking-widest text-brand-maroon-dark uppercase font-semibold font-serif mb-2">
                Save The Date
              </p>
              
              <p className="text-lg md:text-xl font-serif text-brand-gold font-bold tracking-widest">
                JUNE 17, 2026
              </p>
              
              <p className="text-xs tracking-wider text-brand-maroon-dark/60 mt-1 font-sans">
                Sri Lakshmi Arumuruga Gowender Marriage Mahal, Vellore
              </p>
            </motion.div>
          </section>

          {/* 3. Introduction section (split Groom/Bride cards) */}
          <Introduction />

          {/* 4. Love Story (Timeline) */}
          <LoveStory />

          {/* 5. Countdown section */}
          <Countdown />

          {/* 6. Events Card section */}
          <Events />

          {/* 8. Venue & Logistics map section */}
          <VenueMap />

          {/* 9. Family introduction */}
          <FamilyTree />

          {/* 10. Guestbook section */}
          <Guestbook />

          {/* 11. Finale credits */}
          <Finale />

          {/* 12. Floating Audio Widget */}
          <MusicWidget playRequested={musicPlayTrigger} />

        </motion.div>
      )}
    </div>
  );
}
