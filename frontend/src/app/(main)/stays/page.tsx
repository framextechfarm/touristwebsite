"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Star, Bed, Bath, Zap, Shield, ArrowRight, ArrowLeft } from "lucide-react";
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
    propertyType: string;
    location: string;
    pricePerNight: number;
    capacity: number;
    bedrooms: number;
    bathrooms: number;
    rating: number;
    isFeatured: boolean;
    images: StayImage[];
    amenities: Amenity[];
};

const PROPERTY_TYPES = ["cottage", "villa", "tent", "hut", "aframe", "homestay"];

const StaysContent = () => {
    const searchParams = useSearchParams();
    const initialType = searchParams.get("type");

    const [stays, setStays] = useState<Stay[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string | null>(initialType);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [error, setError] = useState<string | null>(null);

    const fetchStays = async () => {
        setLoading(true);
        setError(null);
        try {
            let url = `${API_URL}/stays`;
            const params = new URLSearchParams();
            
            if (selectedType && selectedType !== "tent-hut") {
                params.append("property_type", selectedType);
            }
            if (priceRange[0] > 0) params.append("min_price", priceRange[0].toString());
            if (priceRange[1] < 10000) params.append("max_price", priceRange[1].toString());

            if (params.toString()) url += `?${params.toString()}`;

            const res = await fetch(url);
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                console.error("API error:", res.status, errorData);
                setError(`Server returned ${res.status}. It might be cold-starting.`);
                setStays([]);
                return;
            }
            const data = await res.json();
            
            if (!Array.isArray(data)) {
                console.error("Expected an array of stays but received:", data);
                setError("Invalid data format received from server.");
                setStays([]);
                return;
            }

            // Parity check for property_type vs propertyType
            const normalizedData = data.map((s: any) => ({
                ...s,
                propertyType: s.propertyType || s.property_type
            }));

            // Filter for tent-hut mode if needed
            if (selectedType === "tent-hut") {
                setStays(normalizedData.filter((s: Stay) => ["tent", "hut", "aframe"].includes(s.propertyType)));
            } else {
                setStays(normalizedData);
            }
        } catch (error) {
            console.error("Failed to fetch stays:", error);
            setError("Unable to connect to the server. Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStays();
    }, [selectedType, priceRange]);

    const [activeStay, setActiveStay] = useState<Stay | null>(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const renderStayCard = (stay: Stay, index: number) => {
        const whatsappUrl = `https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in enquiring about the ${stay.name}.`)}`;
        
        return (
            <motion.div
                key={stay.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="min-w-[85vw] md:min-w-[450px] bg-card rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-border hover:border-primary/20 transition-all duration-500 shadow-2xl group flex flex-col h-full cursor-pointer"
                onClick={() => {
                    setActiveStay(stay);
                    setActiveImageIndex(0);
                }}
            >
                <div className="flex flex-col h-full">
                    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                        <Image
                            src={stay.images[0]?.url || "https://placehold.co/600x400"}
                            alt={stay.name}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute top-6 left-6 md:top-8 md:left-8">
                            <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] md:text-[12px] font-black px-4 md:px-6 py-1.5 md:py-2 rounded-full uppercase tracking-widest shadow-2xl">
                                {stay.propertyType}
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8 md:p-12">
                            <p className="text-white font-bold text-sm md:text-lg flex items-center gap-2">
                                <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" /> View Gallery
                            </p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 flex flex-col flex-1 bg-gradient-to-b from-card to-secondary/30">
                        <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-2 md:mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">{stay.name}</h3>
                        <div className="flex items-center text-foreground/60 text-base md:text-lg font-medium mb-6 md:mb-8">
                            <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-primary" />
                            {stay.location}
                        </div>
                        
                        <div className="flex items-center gap-6 md:gap-8 text-sm text-foreground/40 font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] mb-8 md:mb-10">
                            <span className="flex items-center gap-1.5 md:gap-2">
                                <Users className="w-4 h-4 md:w-5 md:h-5 text-primary/50" /> {stay.capacity} Guests
                            </span>
                            <span className="flex items-center gap-1.5 md:gap-2">
                                <Bed className="w-4 h-4 md:w-5 md:h-5 text-primary/50" /> {stay.bedrooms} BR
                            </span>
                        </div>
                        
                        <div className="mt-auto">
                            <a 
                                href={whatsappUrl}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 md:py-5 bg-primary text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2 md:gap-3 hover:brightness-110 transition-all active:scale-95 shadow-2xl shadow-primary/30"
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                Enquire Now
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <div className="pt-32 md:pt-48 pb-8 md:pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-6 md:mb-8"
                    >
                        <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                        <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase text-primary">Limited Edition Stays</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-8xl font-black mb-6 md:mb-8 tracking-tighter leading-none">
                        Escape to the <span className="text-primary italic">Hills.</span>
                    </h1>
                    <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto font-medium">Discover our exclusive collection of handpicked stays in Kodaikanal.</p>
                </div>
            </div>

            <div className="py-12 md:py-24 relative">
                {error ? (
                    <div className="max-w-4xl mx-auto px-6 text-center py-20">
                        <div className="bg-red-500/10 border border-red-500/20 rounded-[3rem] p-12 md:p-20">
                            <Zap className="w-16 h-16 text-red-500 mx-auto mb-6 opacity-50" />
                            <h3 className="text-2xl md:text-3xl font-black mb-4">Connection Issue</h3>
                            <p className="text-foreground/60 text-lg mb-10 max-w-md mx-auto">{error}</p>
                            <button 
                                onClick={() => fetchStays()}
                                className="bg-red-500 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-red-500/20"
                            >
                                Retry Connection
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex overflow-x-auto pb-8 md:pb-12 px-6 md:px-24 gap-8 md:gap-12 no-scrollbar scroll-smooth">
                            {loading ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="min-w-[85vw] md:min-w-[450px] h-[500px] md:h-[700px] bg-secondary rounded-[2.5rem] md:rounded-[3rem] animate-pulse border border-border"></div>
                                ))
                            ) : (
                                stays.map((stay, index) => renderStayCard(stay, index))
                            )}
                        </div>
                        
                        <div className="flex justify-center gap-2 md:gap-3 mt-4 md:mt-8">
                            {stays.map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary/30" />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <AnimatePresence>
                {activeStay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-2xl"
                    >
                        <button 
                            onClick={() => setActiveStay(null)}
                            className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors z-[110]"
                        >
                            <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="w-full max-w-7xl flex flex-col h-full">
                            <div className="flex-1 relative mb-4 md:mb-8 rounded-[2rem] md:rounded-[3rem] overflow-hidden group">
                                <AnimatePresence initial={false} custom={activeImageIndex}>
                                    <motion.div
                                        key={activeImageIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        drag="x"
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.2}
                                        onDragEnd={(e, { offset, velocity }) => {
                                            const swipe = Math.abs(offset.x) * velocity.x;
                                            if (swipe < -500) {
                                                setActiveImageIndex(prev => (prev < activeStay.images.length - 1 ? prev + 1 : 0));
                                            } else if (swipe > 500) {
                                                setActiveImageIndex(prev => (prev > 0 ? prev - 1 : activeStay.images.length - 1));
                                            }
                                        }}
                                        className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
                                    >
                                        <Image
                                            src={activeStay.images[activeImageIndex]?.url}
                                            alt={activeStay.name}
                                            fill
                                            className="object-contain pointer-events-none"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/800x600?text=Image+Not+Found';
                                            }}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                                
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-20 pointer-events-none">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveImageIndex(prev => (prev > 0 ? prev - 1 : activeStay.images.length - 1));
                                        }}
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 pointer-events-auto"
                                    >
                                        <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveImageIndex(prev => (prev < activeStay.images.length - 1 ? prev + 1 : 0));
                                        }}
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 pointer-events-auto"
                                    >
                                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="flex gap-4 overflow-x-auto py-6 no-scrollbar h-24">
                                {activeStay.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className={`relative w-24 h-full rounded-2xl overflow-hidden shrink-0 transition-all ${
                                            activeImageIndex === idx ? "ring-4 ring-primary ring-offset-4 ring-offset-black" : "opacity-40 hover:opacity-100"
                                        }`}
                                    >
                                        <Image 
                                            src={img.url} 
                                            alt="thumbnail" 
                            fill 
                                            className="object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.opacity = '0';
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex items-center justify-between py-8">
                                <div>
                                    <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">{activeStay.name}</h2>
                                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> {activeStay.location}
                                    </p>
                                </div>
                                <a 
                                    href={`https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in enquiring about the ${activeStay.name}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-12 py-5 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 transition-all border border-white/10 shadow-2xl shadow-primary/30 flex items-center gap-3"
                                >
                                    Enquire Now
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="bg-secondary/50 py-12 border-y border-border hidden md:block mt-20">
                <div className="max-w-7xl mx-auto px-6 flex justify-around">
                    {[
                        { icon: Shield, text: "Verified Stays" },
                        { icon: Zap, text: "Quality Service" },
                        { icon: Star, text: "Premium Comfort" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 text-muted-foreground uppercase tracking-widest text-[11px] font-black">
                            <item.icon className="w-5 h-5 text-primary" />
                            {item.text}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default function StaysPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StaysContent />
        </Suspense>
    );
}
