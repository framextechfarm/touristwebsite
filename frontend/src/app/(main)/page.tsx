"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/config";
import { Hero } from "@/components/home/Hero";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { Stats } from "@/components/home/Stats";
import { StaysSection } from "@/components/home/StaysSection";
import { CabService } from "@/components/home/CabService";
import { ReviewCarousel } from "@/components/home/ReviewCarousel";
import { staticPackages } from "@/data/packages";

export default function Home() {
  const packages = staticPackages;
  const [currentHero, setCurrentHero] = useState(0);

  const heroImages = [
    "/assets/hero.jpg",
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

  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary selection:text-white">
      <Hero heroImages={heroImages} currentHero={currentHero} />
      <CategoryCards />
      
      <FeaturedPackages packages={packages} API_URL={API_URL} loading={false} />
      
      <Stats />
      <StaysSection />
      <CabService />
      <ReviewCarousel API_URL={API_URL} />
    </main>
  );
}
