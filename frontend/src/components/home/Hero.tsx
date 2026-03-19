"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  heroImages: string[];
  currentHero: number;
}

export const Hero = ({ heroImages, currentHero }: HeroProps) => {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden z-0">
        <AnimatePresence>
          <motion.div
            key={currentHero % heroImages.length}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentHero % heroImages.length]}
              alt="Majestic Mountains"
              fill
              className="object-cover brightness-[0.75]"
              priority
            />
          </motion.div>
        </AnimatePresence>
        {/* Subtle Bottom-to-Top Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-[100px] font-bold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight"
        >
          Take only <br />
          <span className="text-primary italic">Memories,</span> <br />
          leave footprints.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-16"
        >
          Experience the grandeur of nature with our professionally curated mountain treks and adventure expeditions. Your soul&apos;s adventure starts here.
        </motion.p>
      </div>
    </section>
  );
};
