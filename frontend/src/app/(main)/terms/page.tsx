"use client";

import { motion } from "framer-motion";
import { Scale, Shield, Users, MapPin, Search } from "lucide-react";

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Scale className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Terms of <span className="text-blue-500 italic">Service.</span></h1>
                    <p className="text-foreground/60 text-lg font-medium">Clear guidelines for a smooth hill station journey.</p>
                </motion.div>

                <div className="space-y-12">
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-500" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Booking & Confirmation</h2>
                        </div>
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 space-y-6 text-foreground/70 leading-relaxed font-medium">
                            <p>SMR holidays Kodaikanal acts as an aggregator for hill station services. Bookings are confirmed only upon receipt of the advance payment.</p>
                            <ul className="space-y-4 list-disc pl-6">
                                <li>All prices are subject to availability and seasonal fluctuations.</li>
                                <li>Identification documents (Aadhaar/Voter ID) are mandatory for all guests at check-in.</li>
                                <li>Guests must strictly follow check-in and check-out timings of the respective properties.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Travel & Transport</h2>
                        </div>
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 text-foreground/70 leading-relaxed font-medium">
                            <p>For cab services, the route must be pre-confirmed. Any last-minute diversions or extra stops may incur additional charges payable directly to the driver. SMR holidays Kodaikanal is not responsible for delays caused by traffic, landslides, or vehicle breakdowns, though we will assist in alternative arrangements where possible.</p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                                <Shield className="w-5 h-5 text-amber-500" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Liability Limitation</h2>
                        </div>
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 text-foreground/70 leading-relaxed font-medium">
                            <p>SMR holidays Kodaikanal is not liable for any personal injury, loss of belongings, or damages occurring during the stay or travel. Travelers are encouraged to have their own travel insurance for mountain trekking and adventure activities.</p>
                        </div>
                    </section>
                </div>

                <div className="mt-20 pt-12 border-t border-border text-center">
                    <p className="text-foreground/40 font-bold uppercase tracking-widest text-[10px]">© 2026 SMR holidays Kodaikanal | ALL RIGHTS RESERVED</p>
                </div>
            </div>
        </main>
    );
}
