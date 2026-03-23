"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { MapPin, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { API_URL } from "@/lib/config";

type ItemDetails = {
    id: number;
    name?: string;
    title?: string;
    location?: string;
    from_location?: string;
    to_location?: string;
    price?: number;
    price_per_night?: number;
    vehicle_name?: string;
    vehicle_price?: number;
};

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const bookingType = searchParams.get("type"); // 'package', 'stay', 'cab'
    const itemId = searchParams.get("id");
    const vehicleId = searchParams.get("vehicleId");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");

    const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form state
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [travelDate, setTravelDate] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("upi");

    useEffect(() => {
        async function fetchItemDetails() {
            if (!bookingType || !itemId) {
                setLoading(false);
                return;
            }

            try {
                let url = "";
                if (bookingType === "package") {
                    url = `${API_URL}/packages/${itemId}`;
                } else if (bookingType === "stay") {
                    url = `${API_URL}/stays/${itemId}`;
                } else if (bookingType === "cab") {
                    url = `${API_URL}/cabs/routes`;
                }

                const res = await fetch(url);
                const data = await res.json();

                if (bookingType === "cab") {
                    const route = data.find((r: { id: number; from_location: string; to_location: string }) => r.id === parseInt(itemId!));
                    if (route && vehicleId) {
                        const vehicleRes = await fetch(`${API_URL}/cabs/vehicles`);
                        const vehicles = await vehicleRes.json();
                        const vehicle = vehicles.find((v: { id: number; name: string }) => v.id === parseInt(vehicleId!));

                        // Get pricing
                        const searchRes = await fetch(`${API_URL}/cabs/search`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                from_location: route.from_location,
                                to_location: route.to_location
                            })
                        });
                        const searchData = await searchRes.json();
                        const pricing = searchData.find((s: { vehicle: { id: number }; price: number }) => s.vehicle.id === parseInt(vehicleId!));

                        setItemDetails({
                            id: route.id,
                            from_location: route.from_location,
                            to_location: route.to_location,
                            vehicle_name: vehicle?.name,
                            vehicle_price: pricing?.price
                        });
                    }
                } else {
                    setItemDetails(data);
                }
            } catch (error) {
                console.error("Failed to fetch item details", error);
            } finally {
                setLoading(false);
            }
        }

        fetchItemDetails();
    }, [bookingType, itemId, vehicleId]);

    const calculateTotal = () => {
        if (!itemDetails) return 0;

        if (bookingType === "package") {
            return itemDetails.price || 0;
        } else if (bookingType === "stay") {
            if (checkin && checkout) {
                const nights = Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24));
                return (itemDetails.price_per_night || 0) * nights;
            }
            return itemDetails.price_per_night || 0;
        } else if (bookingType === "cab") {
            return itemDetails.vehicle_price || 0;
        }
        return 0;
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);

        try {
            const bookingData = {
                booking_type: bookingType,
                item_id: parseInt(itemId!),
                vehicle_id: vehicleId ? parseInt(vehicleId) : null,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
                travel_date: travelDate || checkin || new Date().toISOString().split('T')[0],
                end_date: checkout || null,
                total_amount: calculateTotal(),
                special_requests: specialRequests || null
            };

            const res = await fetch(`${API_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData)
            });

            if (!res.ok) throw new Error("Booking failed");

            const booking = await res.json();

            // Confirm payment (mock)
            await fetch(`${API_URL}/bookings/${booking.id}/confirm`, {
                method: "POST"
            });

            // Redirect to confirmation
            router.push(`/booking-confirmation/${booking.id}`);
        } catch (error) {
            console.error("Booking failed", error);
            alert("Booking failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-slate-600">Loading...</div>
            </div>
        );
    }

    if (!itemDetails) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Invalid Booking</h2>
                    <Link href="/" className="text-blue-600 hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    const total = calculateTotal();

    return (
        <main className="min-h-screen bg-slate-50 pb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold">Complete Your Booking</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Form */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Customer Details</h2>

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={customerPhone}
                                        onChange={(e) => setCustomerPhone(e.target.value)}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                        required
                                    />
                                </div>

                                {bookingType === "package" && (
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Travel Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={travelDate}
                                            onChange={(e) => setTravelDate(e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                )}

                                {bookingType === "cab" && (
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Travel Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={travelDate}
                                            onChange={(e) => setTravelDate(e.target.value)}
                                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                                            required
                                        />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Special Requests
                                    </label>
                                    <textarea
                                        value={specialRequests}
                                        onChange={(e) => setSpecialRequests(e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                                        placeholder="Any special requirements..."
                                    />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Method</h2>
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {["upi", "card", "netbanking"].map((method) => (
                                    <button
                                        key={method}
                                        type="button"
                                        onClick={() => setPaymentMethod(method)}
                                        className={`p-4 border-2 rounded-xl font-semibold capitalize transition-all ${paymentMethod === method
                                            ? "border-purple-600 bg-purple-50 text-purple-700"
                                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                                            }`}
                                    >
                                        {method}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-purple-700 active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <CreditCard className="w-5 h-5" />
                                {submitting ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                            </button>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Booking Summary</h3>

                            {bookingType === "package" && (
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">{itemDetails.title}</h4>
                                    <p className="text-sm text-slate-500 mb-4 flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" /> {itemDetails.location}
                                    </p>
                                </div>
                            )}

                            {bookingType === "stay" && (
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">{itemDetails.name}</h4>
                                    <p className="text-sm text-slate-500 mb-2 flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" /> {itemDetails.location}
                                    </p>
                                    {checkin && checkout && (
                                        <p className="text-sm text-slate-600 mb-4">
                                            {checkin} to {checkout}
                                            <br />
                                            <span className="font-semibold">
                                                {Math.ceil((new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24))} nights
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {bookingType === "cab" && (
                                <div>
                                    <h4 className="font-bold text-slate-800 mb-1">{itemDetails.vehicle_name}</h4>
                                    <p className="text-sm text-slate-500 mb-4">
                                        {itemDetails.from_location} → {itemDetails.to_location}
                                    </p>
                                </div>
                            )}

                            <div className="border-t border-slate-200 pt-4 mt-4">
                                <div className="flex justify-between text-sm text-slate-600 mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-600 mb-4">
                                    <span>Taxes & Fees</span>
                                    <span>₹0</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-slate-900">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
