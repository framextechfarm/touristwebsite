"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Clock, Star, CheckCircle, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { staticPackages } from "@/data/packages";
import { notFound } from "next/navigation";

type ItineraryItem = {
    id: number;
    day: number;
    title: string;
    description: string;
};

type Package = {
    id: number;
    title: string;
    slug: string;
    duration: string;
    price: number;
    location: string;
    rating: number;
    description: string;
    images: { url: string }[];
    itinerary: ItineraryItem[];
};

export default function PackageDetailsPage() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState("itinerary");

    const idString = Array.isArray(id) ? id[0] : id;
    const pkg = staticPackages.find(p => p.id.toString() === idString);

    if (!pkg) return notFound();

    return (
        <main className="min-h-screen bg-background text-foreground pb-24 md:pb-10">


            {/* Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <Image
                    src={pkg.images[0]?.url || "/images/tours/valley.png"}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20 mb-6"
                    >
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-white text-xs font-bold tracking-widest uppercase">Best Seller</span>
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight"
                    >
                        {pkg.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap items-center gap-8"
                    >
                        <div className="flex items-center text-white/90 font-bold uppercase tracking-widest text-[11px]">
                            <MapPin className="w-4 h-4 mr-2 text-primary" /> {pkg.location}
                        </div>
                        <div className="flex items-center text-white/90 font-bold uppercase tracking-widest text-[11px]">
                            <Clock className="w-4 h-4 mr-2 text-primary" /> {pkg.duration}
                        </div>
                        <div className="flex items-center text-amber-400 font-bold uppercase tracking-widest text-[11px]">
                            <Star className="w-4 h-4 mr-2 fill-current" /> {pkg.rating} Rating
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        <div className="bg-card glass rounded-[2.5rem] p-8 md:p-12 border border-border shadow-2xl">
                            {/* Tabs */}
                            <div className="flex gap-4 border-b border-border mb-12 overflow-x-auto pb-4">
                                {["Overview", "Itinerary", "Policies"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={`pb-4 px-2 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === tab.toLowerCase()
                                            ? "text-primary"
                                            : "text-foreground/40 hover:text-primary"
                                            }`}
                                    >
                                        {tab}
                                        {activeTab === tab.toLowerCase() && (
                                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="min-h-[400px]">
                                {activeTab === "overview" && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-6">About this Trip</h3>
                                            <p className="text-muted-foreground text-lg leading-relaxed">{pkg.description}</p>
                                        </div>

                                        <div className="pt-8 border-t border-border">
                                            <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-6">Package Highlights</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {[
                                                    "Premium Accommodation included",
                                                    "Private Cab for sightseeing",
                                                    "Breakfast & Dinner included",
                                                    "Expert Local Guide",
                                                    "24/7 Concierge Support"
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 border border-border/50">
                                                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                                                        <span className="text-sm font-medium">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "itinerary" && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                        <div className="relative border-l-2 border-primary/20 ml-6 space-y-16 py-4">
                                            {pkg.itinerary.map((item, index) => (
                                                <div key={index} className="relative pl-12">
                                                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/20"></div>
                                                    <div className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                                                        Day {item.day}
                                                    </div>
                                                    <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                                                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "policies" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 rounded-[2rem] bg-secondary/30 border border-border">
                                        <h3 className="text-xl font-bold mb-6">Booking & Cancellation</h3>
                                        <ul className="space-y-4 text-muted-foreground text-sm">
                                            <li className="flex gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                Free cancellation up to 48 hours before the trip starts.
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                Partial refund (50%) between 24 and 48 hours.
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                                No refund if cancelled less than 24 hours before trip.
                                            </li>
                                        </ul>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Widget */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-card glass rounded-[2.5rem] p-8 border border-border shadow-2xl">
                                <p className="text-xs font-black uppercase tracking-widest text-foreground/40 mb-2">Total Package Price</p>
                                <div className="flex items-baseline gap-2 mb-8">
                                    {pkg.price > 0 ? (
                                        <>
                                            <span className="text-5xl font-black text-foreground">₹{pkg.price.toLocaleString()}</span>
                                            <span className="text-xs font-bold text-foreground/40 uppercase">ALL INCLUSIVE</span>
                                        </>
                                    ) : (
                                        <span className="text-3xl font-black text-primary uppercase tracking-tight">Seasonal (Negotiable)</span>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm py-3 border-b border-border">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-bold">{pkg.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-3 border-b border-border">
                                        <span className="text-muted-foreground">Travelers</span>
                                        <span className="font-bold">Min 1 Person</span>
                                    </div>
                                    <div className="flex justify-between text-sm py-3 border-b border-border">
                                        <span className="text-muted-foreground">Category</span>
                                        <span className="font-bold text-primary">Premium</span>
                                    </div>
                                </div>

                                <a
                                    href={`https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in the "${pkg.title}" package for ${pkg.duration}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all block text-center"
                                >
                                    Enquire Now
                                </a>
                                
                                <p className="text-center text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-6">
                                    Chat with our experts for custom quotes
                                </p>
                            </div>

                            {/* Help Card */}
                            <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                                <h5 className="font-bold text-lg mb-2">Need Help?</h5>
                                <p className="text-muted-foreground text-sm mb-6">Talk to our travel experts for customization or group bookings.</p>
                                <button className="text-primary font-bold text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
                                    Chat with us <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-3xl border-t border-border p-6 md:hidden z-50">
                <div className="flex items-center justify-between gap-6">
                    <div>
                        <span className="text-[10px] text-foreground/40 font-black uppercase tracking-widest block mb-1">
                            {pkg.price > 0 ? "Starting from" : "Pricing Label"}
                        </span>
                        <span className="text-2xl font-black">
                            {pkg.price > 0 ? `₹${pkg.price.toLocaleString()}` : "Negotiable"}
                        </span>
                    </div>
                    <a
                        href={`https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in the "${pkg.title}" package for ${pkg.duration}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
                    >
                        Enquire Now
                    </a>
                </div>
            </div>
        </main>
    );
}
