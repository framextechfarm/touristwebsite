"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  userRole: string;
  rating: number;
  comment: string;
  userImage: string;
}

export function ReviewCarousel({ API_URL }: { API_URL: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [API_URL]);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (loading || reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-50/50">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            What our explorers say
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative"
            >
              <div className="absolute top-8 left-8 text-slate-100">
                <Quote size={80} className="fill-current" />
              </div>
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${i < currentReview.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} 
                  />
                ))}
              </div>

              <p className="text-xl md:text-2xl font-body text-slate-700 leading-relaxed mb-10 relative z-10 italic">
                &quot;{currentReview.comment}&quot;
              </p>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400 border-2 border-primary/20">
                  <User size={32} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{currentReview.userName}</h4>
                <p className="text-xs font-black text-primary uppercase tracking-widest mt-1">{currentReview.userRole}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute -bottom-12 flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "w-6 bg-primary" : "bg-slate-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
