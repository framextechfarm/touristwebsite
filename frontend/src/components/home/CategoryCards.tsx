"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Packages", desc: "Tours", icon: MapPin, href: "/packages", color: "bg-primary" },
  { title: "Stays", desc: "Cottages", icon: Calendar, href: "/stays", color: "bg-emerald-500" },
  { title: "Cabs", desc: "Transfers", icon: Users, href: "/cabs", color: "bg-blue-500" },
];

export const CategoryCards = () => {
  return (
    <div className="w-full max-w-5xl -mt-10 md:-mt-20 px-4 relative z-20 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-3 md:gap-6"
      >
        {categories.map((category) => (
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
  );
};
