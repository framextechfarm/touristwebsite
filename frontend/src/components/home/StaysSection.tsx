"use client";

import { ArrowRight, Zap, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const STAY_CATEGORIES = [
  {
    id: "cottages",
    title: "Cottages / Rooms",
    description: "Cozy spaces with breathtaking views of the valley.",
    image: "/images/cottages/10.jpeg",
    link: "/stays/cottages"
  },
  {
    id: "tents",
    title: "Tent / Hut Stay",
    description: "Experience nature up close with our secure camping setups.",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=600&h=800&fit=crop",
    link: "/stays?type=tent-hut"
  },
  {
    id: "homestays",
    title: "Home Stays",
    description: "Authentic local hospitality and home-cooked meals.",
    image: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=600&h=800&fit=crop",
    link: "/stays?type=homestay"
  }
];

export const StaysSection = () => {
  return (
    <section className="py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="space-y-4">
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm md:text-xs">Stay in Comfort</h4>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">Premium<br className="md:hidden" /> Accommodations</h2>
          </div>
          <Link href="/stays" className="group flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity whitespace-nowrap bg-primary/10 px-5 py-2.5 rounded-full md:bg-transparent md:px-0 md:py-0 w-full md:w-auto justify-center md:justify-start">
            Explore All Stays <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-6 max-w-7xl mx-auto items-stretch">
          
          {STAY_CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              className="snap-center sm:snap-start shrink-0 w-[280px] sm:w-[350px] relative rounded-3xl sm:rounded-[2rem] overflow-hidden group border border-border flex flex-col h-[400px] sm:h-[450px]"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-end p-8 text-white">
                <div className="mb-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-white/80 text-sm font-medium mb-6 line-clamp-2 md:line-clamp-none">{category.description}</p>
                
                <Link prefetch={false} href={category.link} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors mt-auto">
                  View Stays <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {/* View More Card Redirecting to Stays */}
          <Link 
            href="/stays"
            className="snap-center sm:snap-start shrink-0 w-[280px] sm:w-[350px] bg-secondary/80 hover:bg-primary/5 rounded-3xl sm:rounded-[2rem] border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center p-8 group transition-all duration-500 h-[400px] sm:h-[450px]"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-2">View More</h3>
            <p className="text-center text-muted-foreground text-sm">Discover our exclusive premium stays and accommodations.</p>
          </Link>
          
          <div className="min-w-[20px] shrink-0" />
        </div>
      </div>
    </section>
  );
};
