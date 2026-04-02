"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "pkgs", title: "Packages", desc: "Adventure & Hill Treks", icon: MapPin, href: "/packages", color: "from-primary/20", count: "14+ Tours", span: "col-span-2 lg:col-span-2" },
  { id: "stays", title: "Stays", desc: "Cottages, Aframes & Tents", icon: Calendar, href: "/stays/cottages", color: "from-emerald-500/20", count: "50+ Options", span: "col-span-1 lg:col-span-1" },
  { id: "cabs", title: "Cabs", desc: "Intercity Transfers", icon: Users, href: "/cabs", color: "from-blue-500/20", count: "10+ Fleets", span: "col-span-1 lg:col-span-1" },
];

export const CategoryCards = () => {
  return (
    <div className="w-full max-w-6xl -mt-6 md:-mt-20 px-4 relative z-20 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
      >
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={category.href} 
            className={`group relative overflow-hidden flex flex-col justify-between p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] bg-[#005D71] ${category.span}`}
          >
            {/* Background Gradient Glow */}
            <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-gradient-to-br ${category.color} to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4 md:mb-12">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <category.icon className="w-5 h-5 md:w-8 md:h-8 text-primary group-hover:text-white transition-colors" />
                </div>
                
                <span className="px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-primary border border-primary text-[8px] md:text-xs font-bold text-white uppercase tracking-widest shadow-lg shadow-primary/20">
                  {category.count}
                </span>
              </div>

              <div>
                <h3 className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2 tracking-tight group-hover:text-primary transition-colors">{category.title}</h3>
                <p className="text-white/60 text-[10px] md:text-base font-medium line-clamp-1">{category.desc}</p>
              </div>

              <div className="mt-4 md:mt-12 flex items-center gap-2 text-primary font-bold text-[10px] md:text-sm opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 lg:translate-x-[-10px] lg:group-hover:translate-x-0 duration-500">
                Explore <ArrowRight className="w-3 h-3 md:w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
