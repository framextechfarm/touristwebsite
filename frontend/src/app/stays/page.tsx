"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Star, Bed, Bath, Zap, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/lib/config";

type Amenity = {
    id: number;
    name: string;
    icon: string;
};

type StayImage = {
    id: number;
    url: string;
};

type Stay = {
    id: number;
    name: string;
    slug: string;
    property_type: string;
    location: string;
    price_per_night: number;
    capacity: number;
    bedrooms: number;
    bathrooms: number;
    rating: number;
    is_featured: boolean;
    images: StayImage[];
    amenities: Amenity[];
};

const PROPERTY_TYPES = ["cottage", "villa", "tent", "homestay"];

export default function StaysPage() {
    const [stays, setStays] = useState<Stay[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [priceRange] = useState<[number, number]>([0, 10000]);

    useEffect(() => {
        async function fetchStays() {
            try {
                let url = `${API_URL}/stays`;
                const params = new URLSearchParams();

                if (selectedType) params.append("property_type", selectedType);
                if (priceRange[0] > 0) params.append("min_price", priceRange[0].toString());
                if (priceRange[1] < 10000) params.append("max_price", priceRange[1].toString());

                if (params.toString()) url += `?${params.toString()}`;

                const res = await fetch(url);
                const data = await res.json();
                setStays(data);
            } catch (error) {
                console.error("Failed to fetch stays", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStays();
    }, [selectedType, priceRange]);

    return (
        <main className="min-h-screen bg-background text-foreground">


            {/* Header Content Section */}
            <div className="pt-48 pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border mb-6"
                    >
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold tracking-widest uppercase">Premium Stays</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Find Your Perfect <span className="text-primary italic">Stay</span></h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Cottages, villas, tents & homestays in the hills of Kodaikanal.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Desktop Filters */}
                <div className="hidden md:block bg-card glass rounded-[2rem] p-6 mb-12 border border-border">
                    <h3 className="font-bold text-foreground mb-4 opacity-70 text-sm uppercase tracking-widest">Filter by Property Type</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedType(null)}
                            className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${selectedType === null
                                ? "bg-primary text-white shadow-xl shadow-primary/20"
                                : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary active:scale-95"
                                }`}
                        >
                            All
                        </button>
                        {PROPERTY_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest capitalize transition-all ${selectedType === type
                                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                                    : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary active:scale-95"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stays Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-[450px] bg-secondary rounded-[2.5rem] animate-pulse border border-border"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stays.map((stay, index) => (
                            <motion.div
                                key={stay.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-card rounded-[2.5rem] overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 shadow-lg group flex flex-col"
                            >
                                <Link href={`/stays/${stay.id}`} className="flex flex-col h-full">
                                    {/* Image */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={stay.images[0]?.url || "https://placehold.co/600x400"}
                                            alt={stay.name}
                                            width={600}
                                            height={400}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                                {stay.property_type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{stay.name}</h3>

                                        <div className="flex items-center text-foreground/70 text-sm font-medium mb-6">
                                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                                            {stay.location}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-6 text-sm text-foreground/60 font-bold uppercase tracking-widest text-[10px] mb-8">
                                            <span className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4 text-primary" /> {stay.capacity}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Bed className="w-4 h-4 text-primary" /> {stay.bedrooms}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Bath className="w-4 h-4 text-primary" /> {stay.bathrooms}
                                            </span>
                                        </div>

                                        {/* Price & Rating */}
                                        <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] text-foreground/60 uppercase font-black tracking-widest mb-1">Per night</p>
                                                <span className="text-3xl font-black text-foreground">
                                                    ₹{stay.price_per_night.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border group-hover:bg-primary transition-colors">
                                                <ArrowRight className="w-5 h-5 text-foreground group-hover:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- TRUST BADGES --- */}
            <section className="bg-secondary/50 py-12 border-y border-border hidden md:block mt-20">
                <div className="max-w-7xl mx-auto px-6 flex justify-around">
                    {[
                        { icon: Shield, text: "Verified Stays" },
                        { icon: Zap, text: "Instant Booking" },
                        { icon: Star, text: "Premium Comfort" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-muted-foreground uppercase tracking-widest text-[11px] font-black">
                            <item.icon className="w-5 h-5 text-primary" />
                            {item.text}
                        </div>
                    ))}
                </div>
            </section>

            {/* Mobile Filter FAB and Overlay */}
            <div className="md:hidden fixed bottom-24 right-6 z-40">
                <button 
                  onClick={() => document.getElementById('filter-overlay')?.classList.remove('hidden')}
                  className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 active:scale-90 transition-all shadow-primary/30"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                </button>
            </div>

            <div id="filter-overlay" className="fixed inset-0 bg-background/95 backdrop-blur-3xl z-[100] hidden flex-col">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button 
                        onClick={() => document.getElementById('filter-overlay')?.classList.add('hidden')}
                        className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                    <h3 className="font-bold text-foreground mb-4 opacity-70 text-sm uppercase tracking-widest">Property Type</h3>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => { setSelectedType(null); document.getElementById('filter-overlay')?.classList.add('hidden'); }}
                            className={`p-4 rounded-xl font-bold text-left transition-all ${selectedType === null
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "bg-secondary text-foreground border border-transparent"
                                }`}
                        >
                            All Properties
                        </button>
                        {PROPERTY_TYPES.map((type) => (
                            <button
                                key={type}
                                onClick={() => { setSelectedType(type); document.getElementById('filter-overlay')?.classList.add('hidden'); }}
                                className={`p-4 rounded-xl font-bold text-left capitalize transition-all ${selectedType === type
                                    ? "bg-primary/20 text-primary border border-primary/30"
                                    : "bg-secondary text-foreground border border-transparent"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
