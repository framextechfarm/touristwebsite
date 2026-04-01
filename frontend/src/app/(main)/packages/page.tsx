"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Star, ArrowRight, Shield, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { staticPackages } from "@/data/packages";

type Package = {
  id: number;
  title: string;
  slug: string;
  duration: string;
  price: number;
  location: string;
  rating: number;
  description: string;
  images: { url: string }[];
};

export default function PackagesPage() {
  const packages = staticPackages;

  const getTag = (title: string) => {
    if (title.toLowerCase().includes("valley")) return { text: "POPULAR", color: "bg-blue-500" };
    if (title.toLowerCase().includes("village")) return { text: "CULTURAL", color: "bg-amber-500" };
    if (title.toLowerCase().includes("wild")) return { text: "ADVENTURE", color: "bg-emerald-500" };
    if (title.toLowerCase().includes("trekking")) return { text: "ACTIVE", color: "bg-rose-500" };
    if (title.toLowerCase().includes("safari")) return { text: "EXTREME", color: "bg-purple-500" };
    return { text: "SPECIAL", color: "bg-primary" };
  };

  return (
    <main className="min-h-screen bg-background text-foreground">


      {/* --- PREMIUM HEADER --- */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border mb-6"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-widest uppercase">Kodaikanal Specials</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground"
          >
            Curated <span className="text-primary italic">Adventures</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Discover the magic of the Princess of Hill Stations with our handpicked tour packages. Experience Kodaikanal like never before.
          </motion.p>
        </div>
      </section>

      {/* --- PACKAGES GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
                const tag = getTag(pkg.title);
                const isPerPerson = pkg.title.toLowerCase().includes("village") || pkg.title.toLowerCase().includes("wild");
                
                return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 flex flex-col h-full shadow-lg"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={pkg.images[0]?.url || "/images/tours/valley.png"}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`${tag.color} text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg`}>
                      {tag.text}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1.5 text-sm font-bold">{pkg.rating}</span>
                    </div>
                    <span className="text-border">•</span>
                    <div className="flex items-center text-muted-foreground text-sm font-medium">
                        <Clock className="w-4 h-4 mr-1.5 text-primary" />
                        {pkg.duration}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center gap-2 text-foreground/70 text-sm font-medium mb-6">
                    <MapPin className="w-4 h-4 text-primary" />
                    {pkg.location}
                  </div>

                  <p className="text-muted-foreground text-[15px] leading-relaxed line-clamp-3 mb-8">
                    {pkg.description}
                  </p>

                  {/* Pricing Footer */}
                  <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-foreground/60 uppercase font-black tracking-widest mb-1">
                        {pkg.price > 0 ? "Starting from" : "Pricing Label"}
                      </p>
                      <div className="flex items-baseline gap-1">
                        {pkg.price > 0 ? (
                            <>
                                <span className="text-3xl font-black text-foreground">₹{pkg.price.toLocaleString()}</span>
                                {isPerPerson && <span className="text-[10px] text-muted-foreground font-bold">/ PERSON</span>}
                            </>
                        ) : (
                            <span className="text-xl font-black text-primary uppercase tracking-tight">Seasonal (Negotiable)</span>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      href={`/packages/${pkg.id}`}
                      className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center border border-border hover:bg-primary hover:border-primary transition-all group/btn"
                    >
                      <ArrowRight className="w-6 h-6 text-foreground group-hover/btn:text-white transition-colors" />
                    </Link>
                  </div>
                </div>
              </motion.div>
                );
            })}
          </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="bg-secondary/50 py-12 border-y border-border hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-around">
            {[
                { icon: Shield, text: "Verified Operators" },
                { icon: Zap, text: "Quality Service" },
                { icon: Star, text: "Premium Experience" }
            ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-muted-foreground uppercase tracking-widest text-[11px] font-black">
                    <item.icon className="w-5 h-5 text-primary" />
                    {item.text}
                </div>
            ))}
        </div>
      </section>
    </main>
  );
}
