import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Bus, Train, Hotel, PhoneCall } from "lucide-react";

export default function VenueMap() {
  const [activeVenue, setActiveVenue] = useState("mugurtham");

  return (
    <section id="venue" className="py-24 px-6 bg-brand-ivory relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-serif tracking-widest text-xs uppercase block mb-2">HOW TO REACH</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-maroon font-bold inline-block relative">
            Wedding Venue
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Core Layout: Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          
          {/* Main Visual: Map */}
          <div className="lg:col-span-2 h-[450px] rounded-2xl overflow-hidden shadow-xl border border-brand-gold/20 relative">
            <motion.div
              key={activeVenue}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full relative"
            >
              {/* Inner venue toggle */}
              <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
                <button
                  onClick={() => setActiveVenue("mugurtham")}
                  className={`flex-1 py-2 px-3 rounded-lg font-serif text-[10px] md:text-xs tracking-wider shadow-md cursor-pointer transition-all duration-300 border ${
                    activeVenue === "mugurtham"
                      ? "bg-brand-maroon text-brand-gold border-brand-gold"
                      : "bg-white/90 text-brand-maroon border-brand-gold/20 hover:bg-white"
                  }`}
                >
                  MUGURTHAM
                </button>
                <button
                  onClick={() => setActiveVenue("reception")}
                  className={`flex-1 py-2 px-3 rounded-lg font-serif text-[10px] md:text-xs tracking-wider shadow-md cursor-pointer transition-all duration-300 border ${
                    activeVenue === "reception"
                      ? "bg-brand-maroon text-brand-gold border-brand-gold"
                      : "bg-white/90 text-brand-maroon border-brand-gold/20 hover:bg-white"
                  }`}
                >
                  RECEPTION
                </button>
              </div>

              <iframe
                title="Google Map Venue Location"
                src={
                  activeVenue === "mugurtham"
                    ? "https://maps.google.com/maps?q=Arulmigu+Valli+Deivasena+Sametha+Subiramaniyar+Temple,+Sathumadurai,+Vellore&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    : "https://maps.google.com/maps?q=Sri+Lakshmi+Arumuruga+Gowender+Marriage+Mahal,+Kongarampet+Gate,+Vellore&t=&z=14&ie=UTF8&iwloc=&output=embed"
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pt-14"
              />

              {/* Floating Marker label at bottom */}
              <div className="absolute bottom-4 left-4 right-4 glass-panel px-4 py-2.5 rounded-lg border border-brand-gold/30 text-brand-maroon text-[11px] font-serif font-semibold pointer-events-none flex items-center gap-1.5 shadow-md">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>
                  {activeVenue === "mugurtham"
                    ? "Sathumadurai, Arani Road, Vellore District"
                    : "Kongarampet Gate, Vellore District"}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Travel Assistance Column */}
          <div className="flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-panel p-6 rounded-2xl border border-brand-gold/20 shadow-lg flex-1 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-maroon mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-brand-gold" />
                  Travel & Logistics
                </h3>
                <p className="text-xs text-brand-maroon-dark/75 leading-relaxed mb-6 font-sans">
                  We want your journey to be smooth. If you require private pickup coordination, please reach out to our travel helpdesk.
                </p>

                <div className="space-y-4">
                  {/* Bus */}
                  <div className="flex gap-4 items-start pb-4 border-b border-brand-gold/10">
                    <Bus className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-brand-maroon font-serif">By Bus</h4>
                      <p className="text-xs text-brand-maroon-dark/80 font-sans mt-0.5 leading-relaxed">
                        Vellore New Bus Stand. Route: Vellore - Arani. Bus Stop: Kongarampat Gate.
                      </p>
                    </div>
                  </div>

                  {/* Railway */}
                  <div className="flex gap-4 items-start pb-4 border-b border-brand-gold/10">
                    <Train className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-brand-maroon font-serif">By Train</h4>
                      <p className="text-xs text-brand-maroon-dark/80 font-sans mt-0.5 leading-relaxed">
                        Katpadi Junction (KPD) - Main station in Vellore, approx. 12 km from venues.
                      </p>
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div className="flex gap-4 items-start">
                    <Hotel className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-brand-maroon font-serif">Accommodation</h4>
                      <p className="text-xs text-brand-maroon-dark/80 font-sans mt-0.5 leading-relaxed">
                        Complimentary rooms booked at Lakshmi Arumuruga Mahal for outstation guests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call Travel Helpdesk */}
              <div className="mt-8 pt-4 border-t border-brand-gold/15 flex gap-2">
                <a
                  href="https://maps.app.goo.gl/2jLpDDVCvC1Fy7nUA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-brand-maroon hover:bg-brand-maroon-dark text-brand-gold font-serif font-bold text-[10px] tracking-wider rounded-lg flex items-center justify-center gap-1 shadow-md cursor-pointer transition-all duration-300"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  MUGURTHAM
                </a>
                <a
                  href="https://maps.app.goo.gl/kFS9kKGU5NxQbLpV6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-brand-maroon hover:bg-brand-maroon-dark text-brand-gold font-serif font-bold text-[10px] tracking-wider rounded-lg flex items-center justify-center gap-1 shadow-md cursor-pointer transition-all duration-300"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  RECEPTION
                </a>
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
