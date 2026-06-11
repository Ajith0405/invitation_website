import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Share2 } from "lucide-react";

const events = [
  {
    id: 1,
    type: "Wedding Ceremony",
    title: "Mugurtham",
    date: "Wednesday, June 17, 2026",
    time: "6:00 AM - 7:30 AM",
    venue: "Arulmigu Valli Deivasena Sametha Subiramaniyar Temple",
    address: "Sathumadurai, Arani Road, Vellore District",
    calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ajith+%26+Rishivindhiya+Mugurtham&dates=20260617T003000Z/20260617T020000Z&details=You+are+cordially+invited+to+witness+the+sacred+union+of+Ajith+and+Rishivindhiya+at+Arulmigu+Valli+Deivasena+Sametha+Subiramaniyar+Temple.&location=Arulmigu+Valli+Deivasena+Sametha+Subiramaniyar+Temple,+Sathumadurai,+Arani+Road,+Vellore+District",
    mapUrl: "https://maps.app.goo.gl/2jLpDDVCvC1Fy7nUA",
  },
  {
    id: 2,
    type: "Wedding Reception",
    title: "Grand Celebration",
    date: "Wednesday, June 17, 2026",
    time: "6:00 PM onwards",
    venue: "Sri Lakshmi Arumuruga Gowender Marriage Mahal",
    address: "Kongarampet Gate, Vellore District",
    calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ajith+%26+Rishivindhiya+Reception&dates=20260617T123000Z/20260617T163000Z&details=Join+us+for+an+evening+of+celebration+and+feast+at+Sri+Lakshmi+Arumuruga+Gowender+Marriage+Mahal.&location=Sri+Lakshmi+Arumuruga+Gowender+Marriage+Mahal,+Kongarampet+Gate,+Vellore+District",
    mapUrl: "https://maps.app.goo.gl/kFS9kKGU5NxQbLpV6",
  },
];

export default function Events() {
  return (
    <section id="events" className="py-24 px-6 bg-brand-champagne/20 relative">
      {/* Visual background details */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-brand-champagne/40 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-serif tracking-widest text-xs uppercase block mb-2">JOIN OUR CELEBRATIONS</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-maroon font-bold inline-block relative">
            Wedding Events
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Cards container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-2xl glass-panel p-8 md:p-10 border border-brand-gold/20 hover:border-brand-gold/60 shadow-xl transition-all duration-300 group cursor-default"
            >
              {/* Shimmer Border Overlay */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

              {/* Event Type Badge */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-serif uppercase tracking-widest text-brand-gold font-semibold block mb-1">
                    {event.type}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-maroon leading-tight">
                    {event.title}
                  </h3>
                </div>
                {/* Traditional South Indian Lamp / Deepam SVG icon */}
                <svg className="w-10 h-10 text-brand-gold/80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C12 2 8 8 8 11C8 13.2091 9.79086 15 12 15C14.2091 15 16 13.2091 16 11C16 8 12 2 12 2Z" fill="currentColor" opacity="0.3"/>
                  <path d="M12 4C12 4 9 9 9 11C9 12.6569 10.3431 14 12 14C13.6569 14 15 12.6569 15 11C15 9 12 4 12 4Z" fill="currentColor"/>
                  <path d="M5 18H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 15V18" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="space-y-4 mb-8 text-brand-maroon-dark/80">
                {/* Date */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-maroon/50 block font-semibold">Date</span>
                    <span className="text-sm md:text-base font-medium">{event.date}</span>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-maroon/50 block font-semibold">Time</span>
                    <span className="text-sm md:text-base font-medium">{event.time}</span>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-brand-maroon/50 block font-semibold">Venue</span>
                    <span className="text-sm md:text-base font-bold text-brand-maroon block mb-0.5">{event.venue}</span>
                    <span className="text-xs md:text-sm text-brand-maroon-dark/65 leading-relaxed">{event.address}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 text-center">
                <a
                  href={event.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-lg bg-brand-maroon hover:bg-brand-maroon-dark text-brand-gold font-serif font-bold text-xs tracking-wider shadow-md hover:shadow-lg transition-all duration-300 block cursor-pointer active:scale-95"
                >
                  CALENDAR
                </a>
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 text-center rounded-lg bg-white border border-brand-maroon/30 text-brand-maroon hover:bg-brand-maroon/5 font-serif font-bold text-xs tracking-wider shadow-sm transition-all duration-300 block cursor-pointer active:scale-95"
                >
                  DIRECTIONS
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `Invitation: ${event.type}`,
                        text: `Join Ajith & Rishivindhiya for their ${event.type} on ${event.date} at ${event.venue}.`,
                        url: window.location.href,
                      });
                    } else {
                      // copy link fallback
                      navigator.clipboard.writeText(window.location.href);
                      alert("Invitation link copied to clipboard!");
                    }
                  }}
                  className="px-3 py-3 rounded-lg border border-brand-maroon/30 hover:border-brand-maroon text-brand-maroon hover:bg-brand-maroon/5 transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
                  aria-label="Share Event"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
