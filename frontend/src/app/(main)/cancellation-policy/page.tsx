"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CalendarX, RefreshCcw, AlertTriangle } from "lucide-react";

export default function CancellationPolicy() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <CalendarX className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Cancellation <span className="text-primary italic">Policy.</span></h1>
                    <p className="text-foreground/60 text-lg font-medium">Transparent terms for a stress-free booking experience.</p>
                </motion.div>

                <div className="space-y-12">
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                                <RefreshCcw className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Standard Refund Policy</h2>
                        </div>
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 space-y-6 text-foreground/70 leading-relaxed font-medium">
                            <p>At SMR Holidays, we understand that plans can change. Our cancellation policy is designed to be fair to both our travelers and our local partners.</p>
                            <ul className="space-y-4 list-disc pl-6">
                                <li><strong>15 Days or More Before Trip:</strong> 90% refund of the total booking amount.</li>
                                <li><strong>7 to 14 Days Before Trip:</strong> 50% refund of the total booking amount.</li>
                                <li><strong>Less than 7 Days Before Trip:</strong> No refund possible, as local arrangements (stays & cabs) are pre-paid.</li>
                                <li><strong>No Show:</strong> No refund will be entertained in case of a no-show.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">Force Majeure</h2>
                        </div>
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 text-foreground/70 leading-relaxed font-medium">
                            <p>In case of unforeseen circumstances like natural disasters, government restrictions, or extreme weather conditions in hill stations (Kodaikanal/Ooty), SMR Holidays reserves the right to postpone the trip or offer credit notes for future bookings instead of cash refunds.</p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase tracking-tight">How to Cancel</h2>
                        </div>
                        <div className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 text-foreground/70 leading-relaxed font-medium">
                            <p>To initiate a cancellation, please contact us via WhatsApp at +91 9003922073 or email us at smrholidayskkl@gmail.com with your booking ID and reason for cancellation. Refunds are processed within 7-10 business days.</p>
                        </div>
                    </section>
                </div>

                <div className="mt-20 pt-12 border-t border-border text-center">
                    <p className="text-foreground/40 font-bold uppercase tracking-widest text-[10px]">Last Updated: April 2026</p>
                </div>
            </div>
        </main>
    );
}
