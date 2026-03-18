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

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentHero, setCurrentHero] = useState(0);

  const heroImages = [
    "/assets/hero.png", // Keep original as fallback/first
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
              key={currentHero % 3}
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
          <div className="w-full max-w-5xl mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: "Packages", desc: "Curated hill station tours", icon: MapPin, href: "/packages", color: "bg-primary" },
                { title: "Stays", desc: "Premium cottages & villas", icon: Calendar, href: "/stays", color: "bg-emerald-500" },
                { title: "Cabs", desc: "Reliable airport & local transfers", icon: Users, href: "/cabs", color: "bg-blue-500" },
              ].map((category) => (
                <Link key={category.title} href={category.href} className="group">
                  <div className="glass p-8 rounded-[2rem] border border-border/10 backdrop-blur-3xl hover:border-primary/40 hover:bg-background/80 transition-all duration-500 h-full flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-3xl ${category.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <category.icon className={`${category.color.replace('bg-', 'text-')} w-8 h-8`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">{category.title}</h3>
                    <p className="text-foreground/60 text-sm font-medium">{category.desc}</p>
                    <div className="mt-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                        <ArrowRight className="w-4 h-4 text-foreground group-hover:text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MAJESTIC KODAIKANAL BENTO GALLERY --- */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
          <div className="space-y-4">
            <h4 className="text-primary font-bold uppercase tracking-widest text-xs">The Princess of Hill Stations</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Explore Kodaikanal</h2>
          </div>
          <p className="text-foreground/60 max-w-md text-sm leading-relaxed">
            Discover the breathtaking beauty of Kodaikanal through our curated selection of must-visit spots and fascinating original facts about the hills.
          </p>
        </div>

        <div className="flex md:grid md:grid-cols-4 md:grid-rows-2 gap-4 h-[450px] overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 px-2 md:px-0 -mx-2 md:mx-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Main Feature: Kurinji */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="w-[85vw] shrink-0 md:w-auto md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden group shadow-2xl border border-border/50 snap-center active:scale-[0.98] transition-all"
          >
            <Image 
              src={getImageUrl(getSlot("explore_kodai_1"), "/assets/destination_1.png")} 
              alt={getSlot("explore_kodai_1")?.title || "Kurinji Hills"} 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 85vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8">
              <span className="bg-primary/20 backdrop-blur-md text-primary-foreground text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/30 mb-3 md:mb-4 inline-block">
                {getSlot("explore_kodai_1")?.category === "homepage" ? "The 12-Year Miracle" : "Featured Destination"}
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{getSlot("explore_kodai_1")?.title || "Neelakurinji Bloom"}</h3>
              <p className="text-white/80 text-xs md:text-sm max-w-[350px] leading-relaxed">
                {getSlot("explore_kodai_1")?.description || "Kodaikanal is world-famous for the rare Kurinji flowers..."}
              </p>
            </div>
          </motion.div>

          {/* Secondary: Kodai Lake */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="w-[85vw] shrink-0 md:w-auto md:col-span-2 relative rounded-[2rem] overflow-hidden group shadow-xl border border-border/50 snap-center active:scale-[0.98] transition-all"
          >
            <Image 
              src={getImageUrl(getSlot("explore_kodai_2"), "/assets/hero.png")} 
              alt={getSlot("explore_kodai_2")?.title || "Kodai Lake"} 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 85vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{getSlot("explore_kodai_2")?.title || "The Star-Shaped Lake"}</h3>
              <div className="flex items-center gap-2 text-white/80 text-[10px] md:text-xs font-medium mt-1 leading-relaxed">
                {getSlot("explore_kodai_2")?.description || "Created in 1863, the legendary Kodai Lake spans 60 acres in an incredible star shape."}
              </div>
            </div>
          </motion.div>

          {/* Tertiary: Pine Forest */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="w-[85vw] shrink-0 md:w-auto relative rounded-[2rem] overflow-hidden group shadow-xl border border-border/50 snap-center active:scale-[0.98] transition-all"
          >
            <Image 
              src={getImageUrl(getSlot("explore_kodai_3"), "/assets/destination_2.png")} 
              alt={getSlot("explore_kodai_3")?.title || "Pine Forest"} 
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 85vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h4 className="text-white font-bold text-lg mb-1">{getSlot("explore_kodai_3")?.title || "Solar Observatory"}</h4>
              <p className="text-white/80 text-[10px] font-medium leading-relaxed mt-2 uppercase tracking-wide">
                {getSlot("explore_kodai_3")?.description || "Established 1899 Studying the sun from Kodai's highest peak"}
              </p>
            </div>
          </motion.div>

          {/* Quaternary: Quick Facts */}
          <div className="w-[85vw] shrink-0 md:w-auto glass rounded-[2rem] p-6 border border-border/50 flex flex-col justify-between snap-center active:scale-[0.98] transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-black text-foreground mb-1">{getSlot("explore_kodai_4")?.title || "7,200 ft"}</p>
              <p className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">{getSlot("explore_kodai_4")?.description || "Elevation Above Sea Level"}</p>
            </div>
            <Link href="/packages" className="flex items-center gap-2 text-primary font-bold text-xs group hover:opacity-80 transition-opacity">
              View Packages <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
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
