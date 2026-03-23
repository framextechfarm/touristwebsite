"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, User, Mail, Phone, Home, Download } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/lib/config";

type Booking = {
    id: number;
    booking_reference: string;
    booking_type: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    travel_date: string;
    end_date: string | null;
    total_amount: number;
    booking_status: string;
    payment_status: string;
    special_requests: string | null;
};

export default function BookingConfirmationPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchBooking() {
            try {
                const res = await fetch(`${API_URL}/bookings/${id}`);
                if (!res.ok) throw new Error("Booking not found");
                const data = await res.json();
                setBooking(data);
            } catch (error) {
                console.error("Failed to fetch booking", error);
            } finally {
                setLoading(false);
            }
        }

        fetchBooking();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-600">Loading...</div>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Booking Not Found</h2>
                    <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
            <div className="max-w-3xl mx-auto px-4 py-16">
                {/* Success Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500 rounded-full mb-6 shadow-lg">
                        <CheckCircle className="w-14 h-14 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                        Booking Confirmed!
                    </h1>
                    <p className="text-lg text-slate-600">
                        Your booking has been successfully confirmed
                    </p>
                </motion.div>

                {/* Booking Details Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-10 mb-6"
                >
                    {/* Booking Reference */}
                    <div className="text-center pb-6 mb-6 border-b border-slate-200">
                        <div className="text-sm text-slate-500 mb-1">Booking Reference</div>
                        <div className="text-3xl font-bold text-emerald-600 tracking-wide">
                            {booking.booking_reference}
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Customer Details</h3>

                        <div className="flex items-center gap-3 text-slate-700">
                            <User className="w-5 h-5 text-slate-400" />
                            <span>{booking.customer_name}</span>
                        </div>

                        <div className="flex items-center gap-3 text-slate-700">
                            <Mail className="w-5 h-5 text-slate-400" />
                            <span>{booking.customer_email}</span>
                        </div>

                        <div className="flex items-center gap-3 text-slate-700">
                            <Phone className="w-5 h-5 text-slate-400" />
                            <span>{booking.customer_phone}</span>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-4 mb-6 pt-6 border-t border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Details</h3>

                        <div className="flex items-center gap-3 text-slate-700">
                            <Home className="w-5 h-5 text-slate-400" />
                            <span className="capitalize font-semibold">{booking.booking_type}</span>
                        </div>

                        <div className="flex items-center gap-3 text-slate-700">
                            <Calendar className="w-5 h-5 text-slate-400" />
                            <span>
                                Travel Date: <span className="font-semibold">{booking.travel_date}</span>
                                {booking.end_date && (
                                    <> to <span className="font-semibold">{booking.end_date}</span></>
                                )}
                            </span>
                        </div>

                        {booking.special_requests && (
                            <div className="bg-slate-50 p-4 rounded-xl">
                                <div className="text-sm font-semibold text-slate-700 mb-1">Special Requests</div>
                                <div className="text-sm text-slate-600">{booking.special_requests}</div>
                            </div>
                        )}
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-slate-700">Total Amount</span>
                            <span className="text-3xl font-bold text-emerald-700">
                                ₹{booking.total_amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-600">Payment Status</span>
                            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full font-semibold capitalize">
                                {booking.payment_status}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button className="flex-1 bg-white text-slate-700 border-2 border-slate-200 py-4 rounded-xl font-bold hover:bg-slate-50 active:scale-98 transition-all flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Download Receipt
                    </button>

                    <Link
                        href="/"
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Confirmation Email Notice */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-8 text-sm text-slate-500"
                >
                    <p>A confirmation email has been sent to <span className="font-semibold">{booking.customer_email}</span></p>
                </motion.div>
            </div>
        </main>
    );
}
