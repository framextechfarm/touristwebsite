"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import { MessageSquare, Images, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    reviews: 0,
    slots: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [reviewsRes, slotsRes] = await Promise.all([
          fetch(`${API_URL}/reviews/admin`),
          fetch(`${API_URL}/admin/image-slots`),
        ]);
        
        if (reviewsRes.ok && slotsRes.ok) {
          const [reviews, slots] = await Promise.all([
            reviewsRes.json(),
            slotsRes.json(),
          ]);
          setStats({
            reviews: reviews.length,
            slots: slots.length,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Reviews", value: stats.reviews, icon: MessageSquare, color: "bg-blue-500" },
    { title: "Image Slots", value: stats.slots, icon: Images, color: "bg-emerald-500" },
    { title: "Avg. Rating", value: "4.9", icon: Star, color: "bg-amber-500" },
    { title: "Active Users", value: "2.4k", icon: Users, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-500 mt-2 font-medium">Welcome back! Here&apos;s an overview of your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
              <card.icon size={24} />
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">{card.title}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-all text-left group">
              <span className="block font-bold text-slate-900">Add New Review</span>
              <span className="text-sm text-slate-500">Post a customer testimonial</span>
            </button>
            <button className="p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-all text-left group">
              <span className="block font-bold text-slate-900">Manage Images</span>
              <span className="text-sm text-slate-500">Update homepage slots</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-primary/20">
          <h2 className="text-xl font-bold mb-4">Mountain Growth</h2>
          <p className="text-white/80 font-medium mb-6">Your hill station platform is growing! You have 3 new bookings today.</p>
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white w-3/4 rounded-full"></div>
          </div>
          <p className="mt-4 text-sm font-bold">75% of monthly target reached</p>
        </div>
      </div>
    </div>
  );
}
