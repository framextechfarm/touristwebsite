"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Users, Star, Bed, Bath, Wifi, Car, ChefHat, Wind, Flame, Tv, Mountain, Trees, Home as HomeIcon, Droplets, Dog, LucideIcon, Shield, Zap } from "lucide-react";
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
    description: string;
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

// Icon mapping for amenities
const iconMap: Record<string, LucideIcon> = {
    Wifi, Car, ChefHat, Wind, Flame, Tv, Mountain, Trees, Home: HomeIcon, Droplets, Dog
};

export default function StayDetailsPage() {
    const { id } = useParams();
    const [stay, setStay] = useState<Stay | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (!id) return;
        async function fetchStay() {
            try {
                const res = await fetch(`${API_URL}/stays/${id}`);
                if (!res.ok) throw new Error("Not found");
                const data = await res.json();
                setStay(data);
            } catch (error) {
                console.error("Failed to fetch stay", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStay();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-background relative pb-24 md:pb-10">
            <div className="h-[60vh] md:h-[70vh] bg-secondary animate-pulse" />
            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
                <div className="bg-card glass rounded-[2.5rem] p-8 md:p-12 h-[400px] border border-border animate-pulse shadow-2xl" />
            </div>
        </div>
    );

    if (!stay) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
            <h2 className="text-3xl font-bold">Stay not found</h2>
            <Link href="/stays" className="btn-primary">Back to Stays</Link>
        </div>
    );

    return (
        <main className="min-h-screen bg-background text-foreground pb-24 md:pb-10">


            {/* Image Gallery */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <motion.div 
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={stay.images[currentImageIndex]?.url || "https://placehold.co/800x600"}
                        alt={stay.name}
                        fill
                        className="object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/10 to-black/40" />

                {/* Image Navigation Dots */}
                {stay.images.length > 1 && (
                    <div className="absolute bottom-32 left-0 right-0 flex justify-center gap-3 z-20">
                        {stay.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentImageIndex
                                    ? "bg-primary w-10 shadow-lg"
                                    : "bg-white/40 hover:bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Property Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-7xl mx-auto z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <span className="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                            {stay.property_type}
                        </span>
                        {stay.is_featured && (
                            <span className="bg-amber-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                <Star className="inline w-3 h-3 mr-1 fill-current" /> Featured
                            </span>
                        )}
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
                    >
                        {stay.name}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-8"
                    >
                        <div className="flex items-center text-white/90 font-bold uppercase tracking-widest text-[11px]">
                            <MapPin className="w-4 h-4 mr-2 text-primary" /> {stay.location}
                        </div>
                        <div className="flex items-center text-amber-400 font-bold uppercase tracking-widest text-[11px]">
                            <Star className="w-4 h-4 mr-2 fill-current" /> {stay.rating} Rating
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-card glass rounded-[2.5rem] p-8 md:p-12 border border-border shadow-2xl">
                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-6 pb-12 border-b border-border mb-12">
                                <div className="text-center">
                                    <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest text-foreground/40">{stay.capacity} Guests</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Bed className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest text-foreground/40">{stay.bedrooms} Bedrooms</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-14 h-14 bg-secondary/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Bath className="w-6 h-6 text-primary" />
                                    </div>
                                    <p className="text-xs font-black uppercase tracking-widest text-foreground/40">{stay.bathrooms} Baths</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-16">
                                <h3 className="text-2xl font-bold mb-6">Experience Wilderness Luxury</h3>
                                <p className="text-foreground/70 text-lg leading-relaxed">{stay.description}</p>
                            </div>

                            {/* Amenities */}
                            <div className="mb-16">
                                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-8">Included Amenities</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {stay.amenities.map((amenity) => {
                                        const Icon = iconMap[amenity.icon] || HomeIcon;
                                        return (
                                            <div
                                                key={amenity.id}
                                                className="flex items-center gap-4 p-5 bg-secondary/30 rounded-2xl border border-border/50 group hover:border-primary/30 transition-all"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center group-hover:bg-primary transition-colors">
                                                    <Icon className="w-5 h-5 text-primary group-hover:text-white" />
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-wide">
                                                    {amenity.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* House Rules */}
                            <div className="pt-12 border-t border-border">
                                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-6">House Rules</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    {[
                                        "Check-in: After 2:00 PM",
                                        "Check-out: Before 11:00 AM",
                                        "No smoking inside the property",
                                        "Parties require prior approval",
                                        "Quiet hours after 10:00 PM",
                                        "Respect local wildlife"
                                    ].map((rule, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm text-foreground/60 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {rule}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Pricing & Verification */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-card glass rounded-[2.5rem] p-8 border border-border shadow-2xl sticky top-32">
                            <p className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-2">Price per night</p>
                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-5xl font-black text-foreground">₹{stay.price_per_night.toLocaleString()}</span>
                                <span className="text-xs font-bold text-foreground/40 uppercase">EXCLUDING TAX</span>
                            </div>

                            <a
                                href={`https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in the "${stay.name}" in ${stay.location}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all block text-center mb-8"
                            >
                                Enquire Now
                            </a>

                            <div className="space-y-6 pt-8 border-t border-border">
                                {[
                                    { icon: Shield, text: "Safety First Policy" },
                                    { icon: Zap, text: "Verified Excellence" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-foreground/60">
                                        <item.icon className="w-5 h-5 text-primary" />
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-3xl border-t border-border p-6 md:hidden z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between gap-6">
                    <div>
                        <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest block mb-1">
                            Price per night
                        </span>
                        <span className="text-xl font-black">
                            ₹{stay.price_per_night.toLocaleString()}
                        </span>
                    </div>
                    <a
                        href={`https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in the "${stay.name}" in ${stay.location}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-center"
                    >
                        Enquire Now
                    </a>
                </div>
            </div>
        </main>
    );
}
