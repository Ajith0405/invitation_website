import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Heart, Star, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [relation, setRelation] = useState("Well Wisher");
  const [wishes, setWishes] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  
  // Custom reaction counters
  const [reactions, setReactions] = useState({
    love: 12,
    bless: 24,
    cheers: 8
  });

  // Default pre-loaded wishes to make it look active on first visit
  const defaultWishes = [
    {
      id: 1,
      name: "Ramesh & Family",
      relation: "Family",
      message: "Wishing Ajith and Rishivindhiya a lifetime of love, happiness, and prosperity together! Looking forward to the Muhurtham.",
      timestamp: "June 10, 2026",
    },
    {
      id: 2,
      name: "Shruti Sen",
      relation: "Friend (Bride)",
      message: "Congratulations Rishi! You make such a stunning bride. So happy for you and Ajith. Wishing you the absolute best chapter ahead!",
      timestamp: "June 09, 2026",
    },
    {
      id: 3,
      name: "Karthik Raja",
      relation: "Colleague (Groom)",
      message: "Double coding power now! Congratulations Ajith bro, and welcome Rishivindhiya. Happy married life to you both!",
      timestamp: "June 08, 2026",
    },
  ];

  useEffect(() => {
    // Fetch initial wishes from server blessings.json database
    fetch("/api/blessings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWishes(data);
        } else {
          setWishes(defaultWishes);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch blessings from server, using local fallback:", err);
        const storedWishes = localStorage.getItem("wedding_wishes");
        if (storedWishes) {
          setWishes(JSON.parse(storedWishes));
        } else {
          setWishes(defaultWishes);
        }
      });

    const storedReactions = localStorage.getItem("wedding_reactions");
    if (storedReactions) {
      setReactions(JSON.parse(storedReactions));
    }
  }, []);

  const triggerConfetti = (colors) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: colors || ["#D4AF37", "#6A1B29", "#E8C5C8"],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish = {
      id: Date.now(),
      name: name.trim(),
      relation: relation,
      message: message.trim(),
      timestamp: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      })
    };

    // Post to server to write to blessings.json file
    fetch("/api/blessings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newWish)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.wishes)) {
          setWishes(data.wishes);
          localStorage.setItem("wedding_wishes", JSON.stringify(data.wishes)); // localStorage fallback copy
        } else {
          const updatedWishes = [newWish, ...wishes];
          setWishes(updatedWishes);
          localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));
        }
      })
      .catch((err) => {
        console.warn("Failed to post blessing to server, using local fallback save:", err);
        const updatedWishes = [newWish, ...wishes];
        setWishes(updatedWishes);
        localStorage.setItem("wedding_wishes", JSON.stringify(updatedWishes));
      });

    // Save name for Thank You note
    setSubmittedName(name.trim());
    setIsSubmitted(true);

    // Clear form
    setName("");
    setMessage("");
    setRelation("Well Wisher");

    // Trigger premium confetti celebration
    triggerConfetti();
  };

  // Handle emoji reaction clicks
  const handleReact = (type) => {
    const updated = {
      ...reactions,
      [type]: reactions[type] + 1
    };
    setReactions(updated);
    localStorage.setItem("wedding_reactions", JSON.stringify(updated));

    // Specific confetti colors per reaction
    if (type === "love") triggerConfetti(["#ff003c", "#E8C5C8"]);
    if (type === "bless") triggerConfetti(["#D4AF37", "#C5A059"]);
    if (type === "cheers") triggerConfetti(["#ff9f00", "#ffd400"]);
  };

  return (
    <section id="guestbook" className="py-24 px-6 bg-brand-ivory relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-serif tracking-widest text-xs uppercase block mb-2">SEND BLESSINGS</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-maroon font-bold inline-block relative">
            Wedding Guestbook
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Reaction Buttons */}
        <div className="flex justify-center gap-4 md:gap-8 mb-16">
          <button
            onClick={() => handleReact("love")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/20 bg-white shadow-sm hover:border-brand-maroon hover:shadow-md cursor-pointer transition-all duration-300 text-brand-maroon text-xs md:text-sm font-medium font-serif"
          >
            <Heart className="w-4 h-4 fill-brand-blush stroke-brand-maroon" />
            Send Love ({reactions.love})
          </button>
          <button
            onClick={() => handleReact("bless")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/20 bg-white shadow-sm hover:border-brand-maroon hover:shadow-md cursor-pointer transition-all duration-300 text-brand-maroon text-xs md:text-sm font-medium font-serif"
          >
            <Star className="w-4 h-4 fill-brand-gold/25 stroke-brand-gold" />
            Shower Blessings ({reactions.bless})
          </button>
          <button
            onClick={() => handleReact("cheers")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-gold/20 bg-white shadow-sm hover:border-brand-maroon hover:shadow-md cursor-pointer transition-all duration-300 text-brand-maroon text-xs md:text-sm font-medium font-serif"
          >
            <Sparkles className="w-4 h-4 fill-brand-gold/10 stroke-brand-gold-dark" />
            Cheers ({reactions.cheers})
          </button>
        </div>

        {/* Form and Board Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Guestbook Form or Thank You card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 rounded-2xl border border-brand-gold/25 shadow-xl min-h-[460px] flex flex-col justify-center"
          >
            {!isSubmitted ? (
              <>
                <h3 className="font-serif text-xl font-bold text-brand-maroon mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-brand-gold" />
                  Leave Your Wishes
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="guest-name" className="block text-[10px] uppercase tracking-wider text-brand-maroon/60 font-semibold mb-2 font-serif">
                      Your Name
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-brand-gold/20 bg-white/70 text-brand-maroon-dark text-sm placeholder-brand-maroon/30 focus:border-brand-maroon focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Relationship dropdown */}
                  <div>
                    <label htmlFor="guest-relation" className="block text-[10px] uppercase tracking-wider text-brand-maroon/60 font-semibold mb-2 font-serif">
                      Relationship
                    </label>
                    <select
                      id="guest-relation"
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-brand-gold/20 bg-white/70 text-brand-maroon-dark text-sm focus:border-brand-maroon focus:outline-none transition-colors appearance-none"
                    >
                      <option value="Well Wisher">Well Wisher</option>
                      <option value="Family">Family Member</option>
                      <option value="Friend (Bride)">Friend of Bride</option>
                      <option value="Friend (Groom)">Friend of Groom</option>
                      <option value="Colleague">Colleague</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="guest-message" className="block text-[10px] uppercase tracking-wider text-brand-maroon/60 font-semibold mb-2 font-serif">
                      Blessing Message
                    </label>
                    <textarea
                      id="guest-message"
                      required
                      rows="4"
                      placeholder="Share your wishes and congratulations..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-brand-gold/20 bg-white/70 text-brand-maroon-dark text-sm placeholder-brand-maroon/30 focus:border-brand-maroon focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gold-gradient hover:brightness-105 text-brand-maroon-dark font-serif font-bold text-xs tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all duration-300"
                  >
                    <Send className="w-3.5 h-3.5" />
                    SUBMIT BLESSING
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 flex flex-col items-center justify-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center border border-brand-gold/25 animate-bounce-slow">
                  <Heart className="w-8 h-8 fill-brand-gold/20" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-maroon">
                  Thank You, {submittedName}!
                </h3>
                <p className="text-xs md:text-sm text-brand-maroon-dark/75 leading-relaxed max-w-sm">
                  Your warm blessings and wishes have been successfully added to our guestbook. We are truly grateful for your presence and support!
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-brand-maroon hover:bg-brand-maroon-dark text-brand-gold font-serif font-bold text-xs tracking-wider rounded-lg shadow-md cursor-pointer transition-colors duration-300"
                >
                  WRITE ANOTHER BLESSING
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Wishes Display Board */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-h-[500px] overflow-y-auto scrollbar-none space-y-5 pr-2"
          >
            <h3 className="font-serif text-xl font-bold text-brand-maroon mb-6 block border-b border-brand-gold/15 pb-2">
              Blessings & Wishes
            </h3>
            
            <AnimatePresence>
              {wishes.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-xl bg-white border border-brand-gold/10 p-5 shadow-sm hover:border-brand-gold/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-serif font-bold text-brand-maroon text-sm md:text-base">
                        {item.name}
                      </h4>
                      <span className="text-[9px] uppercase tracking-wider text-brand-gold font-serif font-semibold">
                        {item.relation}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-maroon/40 font-sans">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-brand-maroon-dark/80 leading-relaxed font-sans italic">
                    "{item.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
