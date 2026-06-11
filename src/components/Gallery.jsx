import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const photos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&q=80&w=800",
    title: "Couple Portrait",
    category: "portraits",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800",
    title: "Bridal Hands / Mehndi",
    category: "pre-wedding",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?auto=format&fit=crop&q=80&w=800",
    title: "South Indian Bridal Details",
    category: "portraits",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    title: "Muhurtham Ambiance",
    category: "decor",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    title: "Exchanging Rings",
    category: "pre-wedding",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800",
    title: "Reception Venue Decor",
    category: "decor",
  },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredPhotos = filter === "all" 
    ? photos 
    : photos.filter(p => p.category === filter);

  return (
    <section id="gallery" className="py-24 px-6 bg-brand-champagne/20 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-serif tracking-widest text-xs uppercase block mb-2">VISUAL MEMORIES</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-maroon font-bold inline-block relative">
            Captured Moments
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["all", "pre-wedding", "portraits", "decor"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-1.5 rounded-full font-serif text-xs tracking-widest uppercase cursor-pointer border transition-all duration-300 ${
                filter === cat
                  ? "bg-brand-maroon border-brand-maroon text-brand-gold shadow-md"
                  : "border-brand-maroon/20 text-brand-maroon hover:border-brand-maroon/50"
              }`}
            >
              {cat === "all" ? "SHOW ALL" : cat.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Masonry-like Flex/Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo) => (
            <motion.div
              layoutId={`photo-${photo.id}`}
              key={photo.id}
              className="relative overflow-hidden rounded-xl border border-brand-gold/15 bg-white shadow-md cursor-pointer group break-inside-avoid"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* Image */}
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-brand-maroon-dark/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                {/* Zoom Icon */}
                <div className="self-end w-9 h-9 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold border border-brand-gold/30">
                  <ZoomIn className="w-4 h-4" />
                </div>
                
                {/* Title */}
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-brand-gold font-serif block mb-1">
                    {photo.category}
                  </span>
                  <h4 className="font-serif text-white font-bold text-base leading-tight">
                    {photo.title}
                  </h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[150] bg-black/90 flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedPhoto(null)}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-brand-champagne hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full cursor-pointer transition-colors duration-200"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Content Card */}
              <motion.div
                layoutId={`photo-${selectedPhoto.id}`}
                className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Stop closing on card click
              >
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg border border-brand-gold/30 shadow-2xl"
                />
                
                {/* Image Details */}
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-brand-gold text-lg md:text-xl font-bold">
                    {selectedPhoto.title}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-brand-blush/60 font-serif">
                    {selectedPhoto.category.replace("-", " ")}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
