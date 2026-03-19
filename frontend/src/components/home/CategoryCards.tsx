"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "pkgs", title: "Packages", desc: "Adventure & Hill Treks", icon: MapPin, href: "/packages", color: "from-primary/20", count: "14+ Tours", span: "lg:col-span-2" },
  { id: "stays", title: "Stays", desc: "Cozy Cottages", icon: Calendar, href: "/stays", color: "from-emerald-500/20", count: "25+ Rooms", span: "lg:col-span-1" },
  { id: "cabs", title: "Cabs", desc: "Intercity Transfers", icon: Users, href: "/cabs", color: "from-blue-500/20", count: "10+ Fleets", span: "lg:col-span-1" },
];

export const CategoryCards = () => {
  return (
    <div className="w-full max-w-6xl -mt-10 md:-mt-20 px-4 relative z-20 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={category.href} 
            className={`group relative overflow-hidden flex flex-col justify-between p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(20,241,149,0.3)] bg-white/5 dark:bg-black/20 ${category.span}`}
          >
            {/* Background Gradient Glow */}
            <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br ${category.color} to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-8 md:mb-12">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <category.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] items-center md:text-xs font-bold text-white/50 uppercase tracking-widest backdrop-blur-md">
                  {category.count}
                </span>
              </div>

              <div>
                <h3 className="text-xl md:text-3xl font-bold text-white mb-2 tracking-tight">{category.title}</h3>
                <p className="text-white/40 text-sm md:text-base font-medium line-clamp-1">{category.desc}</p>
              </div>

              <div className="mt-8 md:mt-12 flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 duration-500">
                Explore Now <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
