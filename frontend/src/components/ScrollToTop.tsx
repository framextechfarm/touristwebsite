"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 50% of the viewport height
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 md:bottom-10 md:right-10 w-12 h-12 md:w-14 md:h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-primary/90 active:scale-90 transition-all z-[45] backdrop-blur-sm shadow-primary/30"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 md:w-7 md:h-7" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
