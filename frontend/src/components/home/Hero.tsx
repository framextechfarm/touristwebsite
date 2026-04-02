"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface HeroProps {
  heroImages: string[];
  currentHero: number;
}

export const Hero = ({ heroImages, currentHero }: HeroProps) => {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden z-0">
          <div className="absolute inset-0 transition-opacity duration-1000">
            <Image
              src={heroImages[currentHero % heroImages.length]}
              alt="Majestic Mountains"
              fill
              className="object-cover brightness-[0.75]"
              priority
            />
          </div>
        {/* Subtle Bottom-to-Top Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center flex flex-col items-center">
        <h1 className="text-6xl md:text-[100px] font-bold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight">
          Take only <br />
          <span className="text-primary italic">Memories,</span> <br />
          leave footprints.
        </h1>

        <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-16">
          Experience the beauty and charm of Kodaikanal with our thoughtfully planned travel services. Your perfect getaway starts here.
        </p>

        {/* Floating Top Destination Card (Desktop only) */}
        <div className="hidden xl:block absolute top-40 right-10">
          <div className="glass px-5 py-3 rounded-2xl flex items-center gap-4 shadow-2xl backdrop-blur-2xl">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Top destination</p>
              <p className="text-sm font-bold text-foreground font-sans">Kodaikanal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
