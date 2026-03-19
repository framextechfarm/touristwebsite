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

  useEffect(() => {
    fetch("http://localhost:8000/admin/image-slots")
      .then(res => res.json())
      .then(data => setSlots(data))
      .catch(err => console.error("Error fetching slots:", err));

    fetch("http://localhost:8000/packages")
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error("Error fetching packages:", err));
  }, []);

  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary selection:text-white">
      <Hero heroImages={heroImages} currentHero={currentHero} />
      <CategoryCards />
      <FeaturedPackages packages={packages} API_URL={API_URL} />
      <Stats />
      <WhyChooseUs />
    </main>
  );
}
