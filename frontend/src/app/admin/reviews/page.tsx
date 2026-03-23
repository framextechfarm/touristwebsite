"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, Plus, MessageSquare, ShieldCheck, ShieldAlert, User, Quote } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  userRole: string;
  rating: number;
  comment: string;
  userImage: string;
  isActive: boolean;
  createdAt: string;
}

export default function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: "",
    userRole: "Verified Traveler",
    rating: 5,
    comment: "",
    userImage: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_URL}/reviews/admin`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/reviews/admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        setNewReview({ userName: "", userRole: "Verified Traveler", rating: 5, comment: "", userImage: "" });
        setIsAdding(false);
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const response = await fetch(`${API_URL}/reviews/admin/${id}`, { method: "DELETE" });
      if (response.ok) fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/reviews/admin/${id}/toggle`, { method: "PATCH" });
      if (response.ok) fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Review Management</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage customer testimonials and feedback.</p>
        </div>
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            <Plus size={20} />
            Add Review
          </button>
        )}
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl mb-8">
              <h2 className="text-xl font-bold mb-6">Add New Testimonial</h2>
              <form onSubmit={handleAddReview} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">User Name</label>
                  <input 
                    type="text" 
                    required
                    value={newReview.userName}
                    onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Role/Label</label>
                  <input 
                    type="text" 
                    value={newReview.userRole}
                    onChange={(e) => setNewReview({...newReview, userRole: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="e.g. Verified Traveler"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Comment</label>
                  <textarea 
                    required
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Write the testimonial here..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Rating (1-5)</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((s) => (
                      <button 
                        key={s}
                        type="button"
                        onClick={() => setNewReview({...newReview, rating: s})}
                        className={`p-2 rounded-lg transition-all ${newReview.rating >= s ? "text-amber-500 bg-amber-50" : "text-slate-300 bg-slate-50"}`}
                      >
                        <Star className={newReview.rating >= s ? "fill-amber-500" : ""} size={24} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-primary/20 transition-all"
                  >
                    Save Review
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`bg-white rounded-[2rem] border p-8 flex flex-col relative group transition-all hover:shadow-xl ${review.isActive ? "border-slate-200" : "border-slate-200 opacity-60"}`}
          >
            {!review.isActive && (
              <div className="absolute top-4 right-4 bg-slate-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                Inactive
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{review.userName}</h4>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{review.userRole}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={`${i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} />
              ))}
            </div>

            <p className="text-slate-600 flex-1 leading-relaxed italic">
              &quot;{review.comment}&quot;
            </p>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <button 
                onClick={() => handleToggle(review.id)}
                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${review.isActive ? "text-emerald-500 hover:text-emerald-600" : "text-slate-400 hover:text-primary"}`}
              >
                {review.isActive ? <ShieldCheck size={16} /> : <ShieldAlert size={16} />}
                {review.isActive ? "Visible" : "Hidden"}
              </button>
              
              <button 
                onClick={() => handleDelete(review.id)}
                className="text-slate-300 hover:text-red-500 transition-colors p-2"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
