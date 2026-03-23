"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Luggage, Car, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/lib/config";

type Vehicle = {
    id: number;
    name: string;
    capacity: number;
    luggage_capacity: string;
    features: string;
    is_active: boolean;
};

type CabRoute = {
    id: number;
    from_location: string;
    to_location: string;
    distance_km: number;
    duration_hours: number;
    is_active: boolean;
};

type CabSearchResult = {
    route: CabRoute;
    vehicle: Vehicle;
    price: number;
};

const POPULAR_LOCATIONS = [
    "Bangalore",
    "Ooty",
    "Kodaikanal",
    "Munnar",
    "Coonoor",
    "Coimbatore",
    "Chennai",
    "Kochi",
    "Madurai"
];

export default function CabsPage() {
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [searchResults, setSearchResults] = useState<CabSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        if (!fromLocation || !toLocation) {
            alert("Please select both from and to locations");
            return;
        }

        setLoading(true);
        setSearched(true);

        try {
            const res = await fetch(`${API_URL}/cabs/search`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    from_location: fromLocation,
                    to_location: toLocation
                })
            });

            if (!res.ok) {
                const error = await res.json();
                alert(error.detail || "No route found");
                setSearchResults([]);
                return;
            }

            const data = await res.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Search failed", error);
            alert("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground uppercase tracking-tight">


            {/* Header */}
            <div className="pt-48 pb-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Book Your <span className="text-primary italic">Cab</span></h1>
                    <p className="text-foreground/70 text-lg">Comfortable rides to hill stations across Kodaikanal.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Search Form */}
                <div className="bg-card glass rounded-[2rem] p-8 mb-12 border border-border">
                    <form onSubmit={handleSearch}>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* From Location */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                                    From
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <select
                                        value={fromLocation}
                                        onChange={(e) => setFromLocation(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
                                        required
                                    >
                                        <option value="">Select pickup location</option>
                                        {POPULAR_LOCATIONS.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* To Location */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground/80 mb-2">
                                    To
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <select
                                        value={toLocation}
                                        onChange={(e) => setToLocation(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-secondary/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground"
                                        required
                                    >
                                        <option value="">Select drop location</option>
                                        {POPULAR_LOCATIONS.map((loc) => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:brightness-110 active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            {loading ? "Searching..." : "Search Cabs"}
                        </button>
                    </form>
                </div>

                {/* Route Info */}
                {searched && searchResults.length > 0 && (
                    <div className="bg-secondary/40 rounded-[2rem] p-6 mb-8 border border-border">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-3 rounded-xl shadow-sm">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-foreground/60">Route</div>
                                    <div className="font-bold text-foreground text-lg">
                                        {searchResults[0].route.from_location} <ArrowRight className="inline w-4 h-4 mx-1" /> {searchResults[0].route.to_location}
                                    </div>
                                </div>
                            </div>
                             <div className="flex gap-6">
                                <div>
                                    <div className="text-sm text-foreground/60">Distance</div>
                                    <div className="font-bold text-foreground">{searchResults[0].route.distance_km} km</div>
                                </div>
                                <div>
                                    <div className="text-sm text-foreground/60">Duration</div>
                                    <div className="font-bold text-foreground">{searchResults[0].route.duration_hours} hrs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Vehicle Results */}
                {searched && searchResults.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">Available Vehicles</h2>
                        <div className="space-y-4">
                            {searchResults.map((result, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card rounded-[2rem] p-8 border border-border hover:border-primary/20 transition-all shadow-lg"
                                >
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        {/* Vehicle Info */}
                                        <div className="flex items-center gap-4">
                                            <div className="bg-secondary p-4 rounded-xl">
                                                <Car className="w-8 h-8 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground mb-1">
                                                    {result.vehicle.name}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-foreground/60">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="w-4 h-4" /> {result.vehicle.capacity} seats
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Luggage className="w-4 h-4" /> {result.vehicle.luggage_capacity}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-slate-500 mt-2">
                                                    {result.vehicle.features}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price & CTA */}
                                         <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-sm text-foreground/40">Total Fare</div>
                                                <div className="text-3xl font-bold text-foreground">
                                                    ₹{result.price.toLocaleString()}
                                                </div>
                                            </div>
                                            <Link
                                                href={`/checkout?type=cab&id=${result.route.id}&vehicleId=${result.vehicle.id}`}
                                                className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shadow-xl shadow-primary/20"
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {searched && searchResults.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <Car className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No cabs available</h3>
                        <p className="text-slate-500">Try a different route</p>
                    </div>
                )}

                {/* Initial State */}
                {!searched && (
                    <div className="text-center py-16">
                        <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-10 h-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Search for cabs</h3>
                        <p className="text-slate-500">Select your pickup and drop locations to see available vehicles</p>
                    </div>
                )}
            </div>
        </main>
    );
}
