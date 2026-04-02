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
import { GroupToursSection } from "@/components/home/GroupToursSection";
import { staticPackages } from "@/data/packages";

type Slot = {
  slot_key: string;
  image_url: string;
  title?: string;
  description?: string;
  category?: string;
};

type Package = {
  id: number;
  title: string;
  slug: string;
  duration: string;
  price: number;
  location: string;
  rating: number;
  images: { url: string }[];
};

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
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

  const [loading, setLoading] = useState(true);
  const [showWakingUp, setShowWakingUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Show "Waking up" notice if server takes more than 3 seconds
    const timeoutId = setTimeout(() => {
      if (loading) setShowWakingUp(true);
    }, 3000);

    const fetchData = async () => {
      try {
        setLoading(true);
        const slotsRes = await fetch(`${API_URL}/admin/image-slots`);
 
         if (slotsRes.ok) {
           const slotsData = await slotsRes.json();
           setSlots(slotsData);
         }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Connection failed");
      } finally {
        setLoading(false);
        setShowWakingUp(false);
      }
    };

    fetchData();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary selection:text-white">
      <Hero heroImages={heroImages} currentHero={currentHero} />
      <CategoryCards />
      
      {/* "Server Waking Up" Notice */}
      {loading && showWakingUp && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
          <div className="bg-primary/90 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-2xl animate-in fade-in slide-in-from-bottom-5">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-bold text-white">Waking up the mountain servers...</p>
          </div>
        </div>
      )}

      {error ? (
        <div className="py-24 px-6 max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-[2rem] p-12 text-center">
            <h3 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h3>
            <p className="text-foreground/60 mb-6 font-medium">We couldn&apos;t reach the server. It might be cold-starting.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-red-500/20 active:scale-95 transition-all"
            >
              Retry Connection
            </button>
          </div>
        </div>
      ) : (
        <FeaturedPackages packages={packages} API_URL={API_URL} loading={loading} />
      )}
      
      <GroupToursSection />
      <Stats />
      <StaysSection />
      <CabService />
      <ReviewCarousel API_URL={API_URL} />
    </main>
  );
}
