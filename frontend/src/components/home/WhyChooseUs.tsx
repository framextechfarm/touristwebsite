"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "15+ Years of Expertise",
    desc: "Deep-rooted knowledge of Kodaikanal tourism, ensuring you see the best parts of the mountains safely.",
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  },
  {
    title: "All-in-One Service",
    desc: "From premium cottages and villas to reliable cab services and exotic forest tours, we handle everything.",
    icon: MapPin,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500"
  },
  {
    title: "12k+ Happy Travelers",
    desc: "Our commitment to quality has earned the trust of thousands of explorers from across the globe.",
    icon: Star,
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  }
];

export const WhyChooseUs = () => {
  return (
    <section id="about" className="py-32 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Shoe Image */}
        <div className="relative">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-border/50 bg-secondary/20 aspect-square group">
            <Image
              src="/assets/destination_1.png"
              alt="Mountain Adventure"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          {/* Rating Card */}
          <div className="absolute -bottom-10 right-0 md:right-10 glass p-6 rounded-[2rem] shadow-2xl backdrop-blur-3xl border border-white/10 max-w-[240px] animate-bounce-slow">
            <div className="flex -space-x-2 mb-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden relative bg-slate-200">
                  <div className="w-full h-full bg-slate-700" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
                12k+
              </div>
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-foreground/50 mb-1">Global Community</p>
            <p className="text-sm font-bold text-foreground mb-2">Happy Travelers</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
              ))}
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">Est. 2009</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-foreground leading-[1.1] tracking-tighter">
              About SMR holidays <span className="text-primary italic">Kodaikanal.</span>
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed font-medium">
              We started with a simple mission: to make the majestic beauty of Kodaikanal accessible to every explorer. Today, SMR holidays is a premier destination for travelers seeking original, curated, and safe mountain adventures.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-6 group">
                <div className={`w-14 h-14 shrink-0 rounded-2xl ${feature.iconBg} flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor} group-hover:text-white transition-colors`} />
                </div>
                <div>
                  <h5 className="font-black text-[13px] uppercase tracking-widest text-primary mb-2">{feature.title}</h5>
                  <p className="text-foreground/60 text-sm leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <a 
              href="https://wa.me/919003922073?text=Hello! I'd like to plan a trip with SMR holidays Kodaikanal."
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all inline-block"
            >
              Start Your Journey
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
