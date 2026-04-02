"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Luggage, Car, ArrowRight, Search, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type VehicleType = {
    id: string;
    name: string;
    capacity: string;
    luggage: string;
    image: string;
};

const VEHICLE_TYPES: VehicleType[] = [
    {
        id: "4seater",
        name: "4 Seater (Sedan)",
        capacity: "4 Passengers",
        luggage: "2-3 Bags",
        image: "/images/cabs/sedan.png"
    },
    {
        id: "7seater",
        name: "7 Seater (SUV)",
        capacity: "7 Passengers",
        luggage: "4-5 Bags",
        image: "/images/cabs/suv.png"
    },
    {
        id: "tempo",
        name: "Tempo Traveller",
        capacity: "12-14 Passengers",
        luggage: "8-10 Bags",
        image: "/images/cabs/tempo.png"
    },
    {
        id: "minibus",
        name: "Mini Bus",
        capacity: "20-22 Passengers",
        luggage: "15+ Bags",
        image: "/images/cabs/minibus.png"
    }
];

const POPULAR_LOCATIONS = [
    "Kodaikanal",
    "Kodai Road",
    "Dindigul",
    "Batlagundu",
    "Madurai",
    "Coimbatore",
    "Bangalore",
    "Chennai",
    "Ooty",
    "Munnar",
    "Kochi"
];

export default function CabsPage() {
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState<string>("4seater");

    function getWhatsappUrl() {
        const vehicleName = VEHICLE_TYPES.find(v => v.id === selectedVehicle)?.name || "a cab";
        const from = fromLocation || "[Pickup Location]";
        const to = toLocation || "[Drop Location]";
        const message = `Hello! I would like to book a cab.\n\nFrom: ${from}\nTo: ${to}\nVehicle Type: ${vehicleName}\n\nPlease let me know the pricing and availability.`;
        return `https://wa.me/919003922073?text=${encodeURIComponent(message)}`;
    }

    return (
        <main className="min-h-screen bg-background text-foreground uppercase tracking-tight pb-24">
            {/* Header */}
            <div className="pt-48 pb-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Book Your <span className="text-primary italic">Cab</span></h1>
                    <p className="text-foreground/70 text-lg">Safe, comfortable, and reliable rides for your Kodaikanal trip.</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6">
                {/* Main Form Container */}
                <div className="bg-card glass rounded-[2.5rem] p-8 md:p-12 border border-border shadow-2xl">
                    
                    {/* Route Selection */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
                            Select Route
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* From Location */}
                            <div>
                                <label className="block text-xs font-black tracking-widest text-foreground/50 mb-3">
                                    PICKUP LOCATION
                                </label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                                    <select
                                        value={fromLocation}
                                        onChange={(e) => setFromLocation(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground text-sm font-bold appearance-none cursor-pointer transition-all hover:bg-secondary/50"
                                        required
                                    >
                                        <option value="" disabled>Choose your starting point</option>
                                        {POPULAR_LOCATIONS.map((loc) => (
                                            <option key={loc} value={loc} className="bg-background">{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* To Location */}
                            <div>
                                <label className="block text-xs font-black tracking-widest text-foreground/50 mb-3">
                                    DROP LOCATION
                                </label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                                    <select
                                        value={toLocation}
                                        onChange={(e) => setToLocation(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-secondary/30 border border-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground text-sm font-bold appearance-none cursor-pointer transition-all hover:bg-secondary/50"
                                        required
                                    >
                                        <option value="" disabled>Choose your destination</option>
                                        {POPULAR_LOCATIONS.map((loc) => (
                                            <option key={loc} value={loc} className="bg-background">{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Selection */}
                    <div className="mb-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                            Choose Vehicle
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {VEHICLE_TYPES.map((vehicle) => {
                                const isSelected = selectedVehicle === vehicle.id;
                                return (
                                    <div 
                                        key={vehicle.id}
                                        onClick={() => setSelectedVehicle(vehicle.id)}
                                        className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-primary shadow-xl shadow-primary/20 scale-[1.02]' : 'border-border/50 hover:border-border bg-secondary/10'}`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 z-20 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                                                <CheckCircle2 className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <div className="aspect-[4/3] w-full relative bg-secondary/30">
                                            <Image 
                                                src={vehicle.image} 
                                                alt={vehicle.name} 
                                                fill 
                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            {/* Gradient overlay for text */}
                                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
                                            
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <h4 className="font-black text-sm lg:text-base leading-tight">{vehicle.name}</h4>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-card">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2 text-foreground/70 text-xs font-bold">
                                                    <Users className="w-4 h-4 text-primary" />
                                                    {vehicle.capacity}
                                                </div>
                                                <div className="flex items-center gap-2 text-foreground/70 text-xs font-bold">
                                                    <Luggage className="w-4 h-4 text-primary" />
                                                    {vehicle.luggage}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Submit Action */}
                    <div className="pt-8 border-t border-border flex flex-col items-center">
                        <a
                            href={getWhatsappUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary text-white py-5 px-12 rounded-2xl font-black text-lg tracking-widest shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all w-full md:w-auto text-center"
                        >
                            ENQUIRE NOW
                        </a>
                        <p className="text-xs font-bold text-foreground/40 mt-4 tracking-widest text-center">
                            Redirects to WhatsApp for instant booking
                        </p>
                    </div>

                </div>
            </div>
        </main>
    );
}
