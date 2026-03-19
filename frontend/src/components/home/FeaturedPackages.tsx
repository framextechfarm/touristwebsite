"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PackageCard, PackageSkeleton } from "./PackageCard";

interface Package {
  id: number;
  title: string;
  slug: string;
  duration: string;
  price: number;
  location: string;
  rating: number;
  images: { url: string }[];
}

interface FeaturedPackagesProps {
  packages: Package[];
  API_URL: string;
  loading?: boolean;
}

export const FeaturedPackages = ({ packages, API_URL, loading = false }: FeaturedPackagesProps) => {
  const chips = ["All", "Trending", "Mountains", "Forest", "Budget", "Luxury"];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="space-y-4">
            <h4 className="text-primary font-bold uppercase tracking-widest text-xs">Handpicked Adventures</h4>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Packages</h2>
          </div>
          <Link href="/packages" className="group flex items-center gap-2 text-primary font-bold hover:opacity-80 transition-opacity">
            Explore All Packages <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {chips.map((chip) => (
            <button
              key={chip}
              className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all shrink-0 ${
                chip === "All"
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-background text-foreground/60 border-border/50 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar px-6">
          {loading ? (
            <>
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
            </>
          ) : (
            packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} API_URL={API_URL} />
            ))
          )}
          {/* Empty card at the end for spacing */}
          <div className="min-w-[20px] shrink-0" />
        </div>
      </div>
    </section>
  );
};
