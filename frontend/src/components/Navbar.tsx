"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X, Home, Map, Bed, Car } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { EnquiryModal } from "./EnquiryModal";
import { API_URL } from "@/lib/config";

const navLinks = [
  { name: "Packages", href: "/packages" },
  { name: "Stays", href: "/stays" },
  { name: "Cabs", href: "/cabs" },
];

const mobileNavLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Packages", href: "/packages", icon: Map },
  { name: "Stays", href: "/stays", icon: Bed },
  { name: "Cabs", href: "/cabs", icon: Car },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 transition-all duration-300 ${scrolled ? 'py-4' : 'py-4 md:py-6'}`}>
      
      {/* --- DESKTOP NAVBAR --- */}
      <nav className={`hidden lg:flex max-w-7xl mx-auto rounded-[2rem] px-8 py-4 items-center justify-between transition-all duration-500 border border-white/10 ${scrolled ? 'bg-black/20 backdrop-blur-lg shadow-2xl' : 'bg-transparent backdrop-blur-md'}`}>
        <Link href="/" className="flex items-center gap-2 relative z-[60]">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center relative shrink-0">
            <span className="text-white font-bold text-xl">S</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap">SMR Holidays</span>
        </Link>
        <div className="flex items-center gap-10">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="text-[15px] font-medium text-white/70 hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsEnquiryOpen(true)}
            className="btn-primary py-2.5 px-6 min-h-[44px] flex items-center justify-center gap-2"
          >
            Enquire Now
          </button>
        </div>
      </nav>

      {/* --- MOBILE NAVBAR --- */}
      <motion.nav 
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`flex lg:hidden mx-auto overflow-hidden backdrop-blur-lg border border-white/10 ${
          scrolled 
            ? 'rounded-full px-4 py-2 w-fit bg-black/20' 
            : 'rounded-[2rem] px-5 py-3 w-full bg-transparent'
        }`}
      >
        <AnimatePresence mode="wait">
          {!scrolled ? (
            <motion.div 
              key="full-mobile"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex justify-between items-center w-full"
            >
              <Link href="/" className="flex items-center gap-2">
                <motion.div layout className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg">S</span>
                </motion.div>
                <motion.span layout className="text-lg font-bold tracking-tight text-foreground whitespace-nowrap">
                  SMR Holidays
                </motion.span>
              </Link>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsMenuOpen(true)} 
                  className="w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/20 active:scale-95 transition-all outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="icon-mobile"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center gap-4 md:gap-6"
            >
              {mobileNavLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link href={link.href} className="flex flex-col items-center justify-center p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 active:scale-90 transition-all">
                      <Icon className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" strokeWidth={2.5} />
                    </Link>
                  </motion.div>
                );
              })}
              <div className="w-px h-6 bg-border mx-1" />
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 active:scale-90 transition-all"
              >
                <Menu className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>


      {/* Mobile Slide-out Drawer (Sheet) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-background border-l border-border z-[55] lg:hidden flex flex-col pt-28 px-6 pb-10 overflow-y-auto shadow-2xl"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full glass hover:bg-white/20 active:scale-95 transition-all text-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col gap-6">
                {navLinks.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-semibold text-foreground hover:text-primary transition-colors block py-2 border-b border-border/50"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 flex flex-col gap-4">
                <button 
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full btn-primary py-4 text-lg text-center"
                >
                  Enquire Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <EnquiryModal 
        isOpen={isEnquiryOpen} 
        onClose={() => setIsEnquiryOpen(false)} 
      />
    </header>
  );
}
