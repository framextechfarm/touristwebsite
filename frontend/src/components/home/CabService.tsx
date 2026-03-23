"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2, Car, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const cabFeatures = [
  {
    title: "Professional Drivers",
    desc: "Experienced, verified, and courteous drivers who know the mountain routes like the back of their hand.",
    icon: CheckCircle2,
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    title: "Safety First",
    desc: "All our vehicles are regularly serviced and equipped with modern safety features for your peace of mind.",
    icon: ShieldCheck,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    title: "Always On Time",
    desc: "Punctuality is our promise. We ensure prompt pickups and drop-offs, making your travel stress-free.",
    icon: Clock,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  }
];

export const CabService = () => {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        {/* Car Image Showcases */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 aspect-[3/4]"
          >
            <Image
              src="/assets/car1.jpeg"
              alt="Premium Cab Service 1"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 aspect-[3/4] mt-12"
          >
            <Image
              src="/assets/car2.jpeg"
              alt="Premium Cab Service 2"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              <h4 className="text-primary font-bold uppercase tracking-widest text-[10px]">Premium Mountain Cabs</h4>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Comfortable Rides to Every <span className="text-primary italic">Mountain Peak.</span>
            </h2>
            <p className="text-foreground/60 text-lg max-w-lg leading-relaxed">
              Experience the scenic beauty of the hills from the comfort of our well-maintained, premium fleet. Your safety and comfort are our topmost priorities.
            </p>
          </motion.div>

          <div className="space-y-8">
            {cabFeatures.map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 group"
              >
                <div className={`w-14 h-14 shrink-0 rounded-2xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <div>
                  <h5 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{feature.title}</h5>
                  <p className="text-foreground/60 text-sm leading-relaxed max-w-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a 
              href="https://wa.me/919003922073?text=Hello!%20I'm%20interested%20in%20booking%20a%20cab%20service." 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:brightness-110 shadow-xl shadow-primary/20 active:scale-95 transition-all text-sm flex items-center gap-2"
            >
              Book on WhatsApp
            </a>
            <div className="flex flex-col">
              <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest leading-none mb-1">Call for Booking</span>
              <span className="text-lg font-black text-foreground">+91 9003922073</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
