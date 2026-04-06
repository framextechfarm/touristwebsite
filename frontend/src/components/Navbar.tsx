"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X, Home, Map, Bed, Car } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      <nav className={`hidden lg:flex max-w-7xl mx-auto rounded-[2rem] px-8 py-4 items-center justify-between transition-all duration-500 border border-white/10 relative ${scrolled ? 'bg-black/20 backdrop-blur-lg shadow-2xl' : 'bg-transparent backdrop-blur-md'}`}>
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-2 relative z-[60]">
            <Image 
              src="/images/logo/smr holidays 3D.png" 
              alt="SMR holidays Kodaikanal" 
              width={200} 
              height={80} 
              className="h-12 md:h-16 w-auto object-contain brightness-110 drop-shadow-2xl"
              priority
            />
          </Link>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-10">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="text-[15px] font-medium text-white/70 hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex-1 flex justify-end items-center gap-6">
          <button 
            onClick={() => setIsEnquiryOpen(true)}
            className="btn-primary py-2.5 px-6 min-h-[44px] flex items-center justify-center gap-2"
          >
            Enquire Now
          </button>
        </div>
      </nav>

      {/* --- MOBILE TOP NAVBAR --- */}
      <nav className={`flex lg:hidden w-full items-center justify-between px-5 py-3 transition-all duration-300 ${
        scrolled ? 'bg-black/20 backdrop-blur-lg shadow-xl border border-white/10 rounded-[2rem]' : 'bg-transparent'
      }`}>
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/images/logo/smr holidays 3D.png" 
            alt="SMR holidays Kodaikanal" 
            width={120} 
            height={48} 
            className="h-8 md:h-10 w-auto object-contain brightness-110"
            priority
          />
        </Link>
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <button 
                onClick={() => setIsEnquiryOpen(true)}
                className="btn-primary py-2 px-4 shadow-lg shadow-primary/20 text-xs flex items-center justify-center gap-2 font-black tracking-widest uppercase rounded-xl"
              >
                Enquire Now
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MOBILE BOTTOM NAVBAR (PILL) --- */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] lg:hidden w-[95%] max-w-[350px]">
        <nav className="flex items-center justify-around gap-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-[2rem] px-4 py-2.5 shadow-2xl w-full">
          {mobileNavLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href} className="flex flex-col items-center justify-center p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all">
                <Icon className="w-5 h-5 text-white/80 hover:text-primary transition-colors" strokeWidth={2.5} />
              </Link>
            );
          })}
          <div className="w-px h-6 bg-white/20 mx-1" />
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-white/80 hover:text-primary transition-colors" strokeWidth={2.5} />
          </button>
        </nav>
      </div>


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
