"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, User } from "lucide-react";
import { staticReviews, type Review } from "@/data/reviews";

export function ReviewCarousel({ API_URL }: { API_URL: string }) {
  const [reviews, setReviews] = useState<Review[]>(staticReviews);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);
        if (response.ok) {
          const data = await response.json();
          // Only update if we have new reviews and they are different from static ones
          if (data && data.length > 0) {
            setReviews(data);
          }
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [API_URL]);

  useEffect(() => {
    if (reviews.length === 0) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews.length, currentIndex]);

  if (loading) {
    return (
      <section className="py-24 px-6 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-pulse">
            <div className="w-24 h-4 bg-slate-200 rounded-full mx-auto mb-4" />
            <div className="w-64 h-10 bg-slate-200 rounded-xl mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto h-[400px] bg-white rounded-[3rem] p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center animate-pulse">
            <div className="w-40 h-8 bg-slate-100 rounded-lg mb-8" />
            <div className="w-full h-24 bg-slate-50 rounded-2xl mb-12" />
            <div className="w-16 h-16 bg-slate-100 rounded-full mb-4" />
            <div className="w-32 h-6 bg-slate-100 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

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

        <div className="relative max-w-4xl mx-auto min-h-[450px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center relative cursor-grab active:cursor-grabbing w-full"
            >
              <div className="absolute top-8 left-8 text-slate-100 pointer-events-none">
                <Quote size={80} className="fill-current" />
              </div>
              
              <div className="flex gap-1 mb-6 relative z-10 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={`${i < currentReview.rating ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} 
                  />
                ))}
              </div>

              <p className="text-xl md:text-2xl font-body text-slate-700 leading-relaxed mb-10 relative z-10 italic pointer-events-none select-none">
                &quot;{currentReview.comment}&quot;
              </p>

              <div className="flex flex-col items-center pointer-events-none">
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
