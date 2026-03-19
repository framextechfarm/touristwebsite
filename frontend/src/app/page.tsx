"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/config";
import { Hero } from "@/components/home/Hero";
import { CategoryCards } from "@/components/home/CategoryCards";
import { FeaturedPackages } from "@/components/home/FeaturedPackages";
import { Stats } from "@/components/home/Stats";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

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
  const [packages, setPackages] = useState<Package[]>([]);
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      try {
        setLoading(true);
        setError(null);

        const [slotsRes, pkgsRes] = await Promise.all([
          fetch(`${API_URL}/admin/image-slots`, { signal: controller.signal }),
          fetch(`${API_URL}/packages`, { signal: controller.signal })
        ]);

        clearTimeout(timeoutId);

        if (!slotsRes.ok || !pkgsRes.ok) {
          throw new Error(`Fetch failed: Slots(${slotsRes.status}) Packages(${pkgsRes.status})`);
        }

        const [slotsData, pkgsData] = await Promise.all([
          slotsRes.json(),
          pkgsRes.json()
        ]);

        setSlots(slotsData);
        setPackages(pkgsData);
      } catch (err: any) {
        console.error("Connection Diagnostic Error:", err);
        setError(err.name === 'AbortError' ? "Connection timed out" : (err.message || "Failed to connect to backend"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary selection:text-white">
      <Hero heroImages={heroImages} currentHero={currentHero} />
      <CategoryCards />
      
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest animate-pulse">Loading Adventures...</p>
          <p className="text-[10px] text-foreground/20 uppercase tracking-widest">
            Connecting to: {API_URL}
          </p>
        </div>
      ) : error ? (
        <div className="py-24 px-6 max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-[2rem] p-12 text-center">
            <h3 className="text-xl font-bold text-red-500 mb-2">Connection Error</h3>
            <p className="text-foreground/60 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              Retry Connection
            </button>
            <p className="mt-4 text-[10px] text-foreground/30 uppercase tracking-widest">
              API: {API_URL}
            </p>
          </div>
        </div>
      ) : (
        <FeaturedPackages packages={packages} API_URL={API_URL} />
      )}
      
      <Stats />
      <WhyChooseUs />
    </main>
  );
}
