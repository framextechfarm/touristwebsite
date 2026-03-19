"use client";

import { motion } from "framer-motion";
import { MapPin, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

interface PackageCardProps {
  pkg: Package;
  API_URL: string;
}

export const PackageCard = ({ pkg, API_URL }: PackageCardProps) => {
  const imageUrl = (pkg.images[0]?.url.startsWith('http') || pkg.images[0]?.url.startsWith('/')) 
    ? pkg.images[0]?.url 
    : `${API_URL}${pkg.images[0]?.url}`;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="min-w-[280px] md:min-w-[320px] aspect-[4/5] bg-card rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl relative group snap-center"
    >
      <Link href={`/packages/${pkg.id}`}>
        {/* Full Image Background */}
        <Image
          src={imageUrl}
          alt={pkg.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Floating Rating Badge */}
        <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-2xl flex items-center gap-1.5 z-10 shadow-xl">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-xs font-black text-white">{pkg.rating}</span>
        </div>

        {/* Bottom Content Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-8 pt-20 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end">
          <div className="flex items-center gap-2 text-white/80 font-bold text-[10px] uppercase tracking-widest mb-2">
            <MapPin className="w-3 h-3 text-primary" />
            {pkg.location}
          </div>
          <h3 className="text-2xl font-black text-white mb-4 line-clamp-1 group-hover:text-primary transition-colors">
            {pkg.title}
          </h3>
          
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest leading-none mb-1">Price</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-primary">₹{pkg.price.toLocaleString()}</span>
                <span className="text-[10px] text-white/40 font-bold">/ person</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
