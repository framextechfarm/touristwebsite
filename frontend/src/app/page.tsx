"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Users, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { API_URL } from "@/lib/config";

type Slot = {
  slot_key: string;
  image_url: string;
  title?: string;
  description?: string;
  category?: string;
};

type Package = {
  id: number;
  title: string;
  slug: string;
  duration: string;
  price: number;
  location: string;
  rating: number;
  images: { url: string }[];
};

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [currentHero, setCurrentHero] = useState(0);

  const heroImages = [
    "/assets/hero.jpg", // Changed from .png to .jpg
    "/assets/hero-1.jpg",
    "/assets/hero-2.jpg",
    "/assets/hero-3.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    fetch("http://localhost:8000/admin/image-slots")
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(err => console.error("Error fetching slots:", err));

    fetch("http://localhost:8000/packages")
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error("Error fetching packages:", err));
  }, []);

  const getSlot = (key: string) => slots.find(s => s.slot_key === key);
  const getImageUrl = (slot: Slot | undefined, fallback: string) => {
    if (!slot || !slot.image_url) return fallback;
    return slot.image_url.startsWith("http") ? slot.image_url : `${API_URL}${slot.image_url}`;
  };

  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary selection:text-white">


      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center pt-32 pb-20 overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden z-0">
          <AnimatePresence>
            <motion.div
              key={currentHero % heroImages.length}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentHero % heroImages.length]}
                alt="Majestic Mountains"
                fill
                className="object-cover brightness-[0.4]"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
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

          {/* --- CATEGORY SELECTION --- */}
          <div className="w-full max-w-5xl mt-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-3 md:gap-6"
            >
              {[
                { title: "Packages", desc: "Tours", icon: MapPin, href: "/packages", color: "bg-primary" },
                { title: "Stays", desc: "Cottages", icon: Calendar, href: "/stays", color: "bg-emerald-500" },
                { title: "Cabs", desc: "Transfers", icon: Users, href: "/cabs", color: "bg-blue-500" },
              ].map((category) => (
                <Link key={category.title} href={category.href} className="group">
                  <div className="glass p-3 md:p-8 rounded-[1.2rem] md:rounded-[2rem] border border-border/10 backdrop-blur-3xl hover:border-primary/40 hover:bg-background/80 transition-all duration-500 flex flex-col items-center text-center">
                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-3xl ${category.color}/20 flex items-center justify-center mb-2 md:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <category.icon className={`${category.color.replace('bg-', 'text-')} w-5 h-5 md:w-8 md:h-8`} />
                    </div>
                    <h3 className="text-xs md:text-2xl font-bold text-white mb-0.5 md:mb-2">{category.title}</h3>
                    <p className="text-white/60 text-[8px] md:text-sm font-medium hidden xs:block">{category.desc}</p>
                    <div className="mt-2 md:mt-6 w-6 h-6 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <ArrowRight className="w-2.5 h-2.5 md:w-4 md:h-4 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>



      {/* --- FEATURED PACKAGES CAROUSEL --- */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
            <div className="space-y-4">
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs">Handpicked Adventures</h4>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Packages</h2>
            </div>
            <Link href="/packages" className="group flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity">
              Explore All Packages <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {["All", "Trending", "Mountains", "Forest", "Budget", "Luxury"].map((chip) => (
              <button
                key={chip}
                className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all shrink-0 ${
                  chip === "All"
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-background text-foreground/60 border-border/50 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-6">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ y: -10 }}
                className="min-w-[280px] md:min-w-[320px] aspect-[4/5] bg-card rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl relative group snap-center"
              >
                <Link href={`/packages/${pkg.id}`}>
                  {/* Full Image Background */}
                  <Image
                    src={(pkg.images[0]?.url.startsWith('http') || pkg.images[0]?.url.startsWith('/')) ? pkg.images[0]?.url : `${API_URL}${pkg.images[0]?.url}`}
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
            ))}
            {/* Empty card at the end for spacing */}
            <div className="min-w-[20px] shrink-0" />
          </div>
        </div>
      </section>

      {/* --- UNIQUE EXPERIENCES STATS --- */}
      <section className="py-20 bg-secondary/10 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Hidden Gems", val: "50+", desc: "Off-beat locations" },
              { label: "Expert Guides", val: "20+", desc: "Local mountain specialists" },
              { label: "Safety Rating", val: "4.9/5", desc: "Top-tier equipment" },
              { label: "Experience", val: "15 Yrs", desc: "In Kodaikanal tourism" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-3xl font-black text-foreground">{stat.val}</p>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.label}</p>
                  <p className="text-[10px] text-foreground/40 font-medium">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY HILL TREK SECTION --- */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Shoe Image */}
          <div className="relative">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-border/50 bg-secondary/20 aspect-square">
              <Image
                src="/assets/destination_1.png"
                alt="Trekking Shoe"
                fill
                className="object-cover grayscale-[0.2] contrast-125"
              />
            </div>
            {/* Rating Card */}
            <div className="absolute -bottom-10 right-0 md:right-10 glass p-6 rounded-[2rem] shadow-2xl backdrop-blur-3xl border border-border/50 max-w-[240px] animate-bounce-slow">
              <div className="flex -space-x-2 mb-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden relative">
                    <div className="w-full h-full bg-slate-700" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                  12k+
                </div>
              </div>
              <p className="text-sm font-bold text-foreground mb-1">Happy Travelers</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-3 h-3 text-accent fill-accent" />
                ))}
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs">Why Hill Trek</h4>
              <h2 className="text-5xl font-bold text-foreground leading-tight">
                The Adventure that Changes Your Perspective
              </h2>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Certified Mountain Guides",
                  desc: "Our team consists of experts with years of experience in high-altitude terrain management and safety.",
                  icon: CheckCircle2,
                  iconBg: "bg-emerald-500/10",
                  iconColor: "text-emerald-500"
                },
                {
                  title: "Premium Camping Gear",
                  desc: "We provide state-of-the-art equipment to ensure your comfort and safety even in the harshest conditions.",
                  icon: MapPin,
                  iconBg: "bg-orange-500/10",
                  iconColor: "text-orange-500"
                },
                {
                  title: "Eco-Conscious Travel",
                  desc: "We believe in leaving the mountains cleaner than we found them. Sustainability is at our core.",
                  icon: Star,
                  iconBg: "bg-primary/10",
                  iconColor: "text-primary"
                }
              ].map((feature, i) => (
                <div key={i} className="flex gap-6">
                  <div className={`w-14 h-14 shrink-0 rounded-2xl ${feature.iconBg} flex items-center justify-center`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-foreground mb-2">{feature.title}</h5>
                    <p className="text-foreground/60 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-primary">Start Your Journey</button>
          </div>
        </div>
      </section>


    </main>
  );
}
