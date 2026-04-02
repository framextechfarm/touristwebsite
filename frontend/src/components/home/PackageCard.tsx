"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Package {
  id: number;
  title: string;
  slug: string;
  duration: string;
  price: number;
  location: string;
  rating: number;
  images: { url: string }[];
}

interface PackageCarouselProps {
  packages: Package[];
  API_URL: string;
}

export const PackageCarousel = ({ packages, API_URL }: PackageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view to switch engines
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100 && activeIndex < packages.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (info.offset.x > 100 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // --- DESKTOP VIEW (Your Original Code Logic) ---
  if (!isMobile) {
    return (
      <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-6">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            whileHover={{ y: -10 }}
            className="min-w-[320px] aspect-[4/5] bg-card rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl relative group snap-center shrink-0"
          >
            <PackageCardContent pkg={pkg} API_URL={API_URL} />
          </motion.div>
        ))}
      </div>
    );
  }

  // --- MOBILE VIEW (The New Stacked Design) ---
  return (
    <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
      <AnimatePresence initial={false}>
        {packages.map((pkg, index) => {
          const isVisible = index >= activeIndex && index <= activeIndex + 2;
          if (!isVisible) return null;

          const dragEnabled = index === activeIndex;
          const positionIndex = index - activeIndex;

          return (
            <motion.div
              key={pkg.id}
              drag={dragEnabled ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              style={{
                zIndex: packages.length - index,
              }}
              animate={{
                scale: 1 - positionIndex * 0.08,
                y: positionIndex * 15,
                x: positionIndex * 35, // Creates the "fanned out" look from your image
                opacity: 1 - positionIndex * 0.3,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute w-[280px] aspect-[3/4.5] bg-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <PackageCardContent pkg={pkg} API_URL={API_URL} isMobile />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

// Reusable Content Component to keep logic clean
const PackageCardContent = ({ pkg, API_URL, isMobile = false }: { pkg: Package, API_URL: string, isMobile?: boolean }) => {
  const firstImageUrl = pkg.images?.[0]?.url;
  const imageUrl = (firstImageUrl?.startsWith('http') || firstImageUrl?.startsWith('/'))
    ? firstImageUrl
    : firstImageUrl ? `${API_URL}${firstImageUrl}` : '/assets/hero.jpg';

  return (
    <Link href={`/packages/${pkg.id}`} className="block h-full w-full relative">
      <Image
        src={imageUrl}
        alt={pkg.title}
        fill
        className={`object-cover ${!isMobile ? 'transition-transform duration-700 group-hover:scale-110' : ''}`}
      />

      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1 rounded-2xl flex items-center gap-1 z-10">
        <Star className="w-3 h-3 text-primary fill-primary" />
        <span className="text-[10px] font-black text-white">{pkg.rating}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 pt-16 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end">
        <div className="flex items-center gap-1.5 text-white/80 font-bold text-[9px] uppercase tracking-widest mb-1">
          <MapPin className="w-2.5 h-2.5 text-primary" />
          {pkg.location}
        </div>
        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-black text-white mb-3 line-clamp-1`}>
          {pkg.title}
        </h3>

        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              {pkg.price === 0 || pkg.title.toLowerCase().includes("tour 4") || pkg.title.toLowerCase().includes("tour 5") ? (
                <span className="text-sm font-black text-primary uppercase tracking-tighter">Enquire For Price</span>
              ) : (
                <>
                  <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mr-1">Starting from</span>
                  <span className="text-lg font-black text-primary">₹{pkg.price.toLocaleString()}</span>
                </>
              )}
            </div>
            
            <a 
              href={`https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in the "${pkg.title}" package. Please provide more details.`)}`}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 bg-primary text-white px-4 py-2 rounded-xl font-black uppercase tracking-widest text-[9px] hover:brightness-110 active:scale-95 transition-all text-center"
            >
              Enquire Now
            </a>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 mb-1">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const PackageCard = ({ pkg, API_URL, isMobile = false }: { pkg: Package, API_URL: string, isMobile?: boolean }) => {
  return (
    <motion.div
      whileHover={!isMobile ? { y: -10 } : {}}
      className="min-w-[320px] aspect-[4/5] bg-card rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl relative group snap-center shrink-0"
    >
      <PackageCardContent pkg={pkg} API_URL={API_URL} isMobile={isMobile} />
    </motion.div>
  );
};

export const PackageSkeleton = () => {
  return (
    <div className="min-w-[320px] aspect-[4/5] bg-card rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl relative shrink-0 animate-pulse">
      <div className="absolute inset-x-0 bottom-0 p-6 pt-16 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-white/20 rounded-full" />
          <div className="w-20 h-3 bg-white/20 rounded-full" />
        </div>
        <div className="w-3/4 h-8 bg-white/20 rounded-xl mb-4" />
        <div className="flex justify-between items-center">
          <div className="w-24 h-6 bg-primary/20 rounded-lg" />
          <div className="w-8 h-8 bg-white/10 rounded-xl" />
        </div>
      </div>
    </div>
  );
};