import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const groomFamily = {
  parents: {
    father: "Mr. G. Shanmugam",
    mother: "Mrs. S. Kalaimani",
  },
  siblings: [
    { name: "S. Durga Devi", role: "Sister" },
    { name: "S. Asha", role: "Sister" }
  ],
};

const brideFamily = {
  parents: {
    father: "Mr. R. Gopikirshnan",
    mother: "Mrs. G. Sumathi",
  },
  siblings: [
    { name: "G. Keerthika", role: "Sister" }
  ],
};

export default function FamilyTree() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="family" className="py-24 px-6 bg-brand-champagne/10 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-gold font-serif tracking-widest text-xs uppercase block mb-2">WITH THE BLESSINGS OF ELDERS</span>
          <h2 className="text-3xl md:text-5xl font-serif text-brand-maroon font-bold inline-block relative">
            The Family
            <span className="absolute bottom-[-8px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
          </h2>
        </div>

        {/* Family split columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Groom Family Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-center text-center"
          >
            <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-serif text-brand-gold font-bold tracking-widest uppercase mb-8 flex items-center gap-2">
              Groom's Family
            </motion.h3>

            <div className="space-y-6 w-full max-w-sm">
              {/* Parents Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl glass-panel p-6 border border-brand-gold/15 shadow-md neumorphic-shadow relative"
              >
                <span className="text-[10px] tracking-wider uppercase font-bold text-brand-maroon/50 block mb-3 font-serif">Parents</span>
                <p className="font-serif text-lg font-semibold text-brand-maroon-dark">{groomFamily.parents.father}</p>
                <p className="text-sm text-brand-maroon/40 font-serif my-1">&amp;</p>
                <p className="font-serif text-lg font-semibold text-brand-maroon-dark">{groomFamily.parents.mother}</p>
              </motion.div>

              {/* Connector line */}
              <div className="h-6 w-[1px] bg-brand-gold/30 mx-auto" />

              {/* Siblings Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl glass-panel p-6 border border-brand-gold/15 shadow-md neumorphic-shadow"
              >
                <span className="text-[10px] tracking-wider uppercase font-bold text-brand-maroon/50 block mb-3 font-serif">Siblings</span>
                {groomFamily.siblings.map((sib, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <p className="font-serif font-medium text-brand-maroon-dark">{sib.name}</p>
                    <p className="text-[10px] uppercase text-brand-maroon/60 font-sans">{sib.role}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Bride Family Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-center text-center"
          >
            <motion.h3 variants={itemVariants} className="text-xl md:text-2xl font-serif text-brand-gold font-bold tracking-widest uppercase mb-8 flex items-center gap-2">
              Bride's Family
            </motion.h3>

            <div className="space-y-6 w-full max-w-sm">
              {/* Parents Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl glass-panel p-6 border border-brand-gold/15 shadow-md neumorphic-shadow relative"
              >
                <span className="text-[10px] tracking-wider uppercase font-bold text-brand-maroon/50 block mb-3 font-serif">Parents</span>
                <p className="font-serif text-lg font-semibold text-brand-maroon-dark">{brideFamily.parents.father}</p>
                <p className="text-sm text-brand-maroon/40 font-serif my-1">&amp;</p>
                <p className="font-serif text-lg font-semibold text-brand-maroon-dark">{brideFamily.parents.mother}</p>
              </motion.div>

              {/* Connector line */}
              <div className="h-6 w-[1px] bg-brand-gold/30 mx-auto" />

              {/* Siblings Card */}
              <motion.div
                variants={itemVariants}
                className="rounded-2xl glass-panel p-6 border border-brand-gold/15 shadow-md neumorphic-shadow"
              >
                <span className="text-[10px] tracking-wider uppercase font-bold text-brand-maroon/50 block mb-3 font-serif">Siblings</span>
                {brideFamily.siblings.map((sib, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <p className="font-serif font-medium text-brand-maroon-dark">{sib.name}</p>
                    <p className="text-[10px] uppercase text-brand-maroon/60 font-sans">{sib.role}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Center Heart Emblem */}
        <div className="flex justify-center mt-16 text-brand-gold">
          <Heart className="w-8 h-8 fill-brand-gold/10 stroke-brand-gold animate-float-slow" />
        </div>

      </div>
    </section>
  );
}
