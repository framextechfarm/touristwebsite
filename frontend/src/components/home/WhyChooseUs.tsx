"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";

const features = [
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
];

export const WhyChooseUs = () => {
  return (
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
            {features.map((feature, i) => (
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
  );
};
