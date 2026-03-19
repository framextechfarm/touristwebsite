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
      try {
        setLoading(true);
        const [slotsRes, pkgsRes] = await Promise.all([
          fetch(`${API_URL}/admin/image-slots`),
          fetch(`${API_URL}/packages`)
        ]);

        if (slotsRes.ok && pkgsRes.ok) {
          const [slotsData, pkgsData] = await Promise.all([
            slotsRes.json(),
            pkgsRes.json()
          ]);
          setSlots(slotsData);
          setPackages(pkgsData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
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
        </div>
      ) : error ? (
        <div className="py-24 px-6 max-w-7xl mx-auto">
          <div className="bg-red-500/10 border border-red-500/20 rounded-[2rem] p-12 text-center">
            <h3 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h3>
            <p className="text-foreground/60 mb-6">We couldn't load the latest packages. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 transition-all"
            >
              Retry
            </button>
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
