"use client";

import { motion } from "framer-motion";
import { Users, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";

export const GroupToursSection = () => {
  const points = [
    "We provide group tours in Kodaikanal at affordable price.",
    "Suitable for friends, families, and groups.",
    "Includes Valley Tour, Village Tour, and Forest Tour.",
    "Travel in a comfortable 20-seater vehicle.",
    "Experienced guide to assist you during the tour.",
    "We give enough time at each place to enjoy and explore.",
    "Safe and well-organized trip for everyone.",
    "Easy and best way to enjoy Kodaikanal together."
  ];

  const whatsappMessage = "Hello! I am interested in booking a Group Tour Package in Kodaikanal. Please provide more details.";
  const whatsappUrl = `https://wa.me/919003922073?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-20 md:py-32 bg-secondary/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl">
              <Image 
                src="/images/tours/group_tour.png" 
                alt="Group Tour in Kodaikanal" 
                fill 
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-tight">Group Special</h4>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-widest mt-1">20-Seater Vehicle Included</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-[2rem] -z-10 rotate-12 opacity-20 blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-[2rem] -z-10 -rotate-12 opacity-10 blur-xl" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <span className="text-primary text-[10px] font-black uppercase tracking-widest">Affordable & Fun</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] tracking-tight text-foreground">
              Group Tour Packages
            </h2>

            <div className="space-y-4 mb-10">
              {points.map((point, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-foreground/80 font-medium leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:gap-4 hover:brightness-110 active:scale-95 transition-all"
            >
              Enquire Now <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
