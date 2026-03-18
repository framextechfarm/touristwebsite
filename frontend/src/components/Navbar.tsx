"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Destinations", href: "/#destinations" },
    { name: "Packages", href: "/packages" },
    { name: "Stays", href: "/stays" },
    { name: "Cabs", href: "/cabs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4 md:py-6 transition-all">
      <nav className={`max-w-7xl mx-auto rounded-[2rem] px-6 md:px-8 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'glass shadow-lg backdrop-blur-3xl' : 'glass'}`}>
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-[60]">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center relative shrink-0">
            <span className="text-white font-bold text-xl">S</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background" />
          </div>
          <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground whitespace-nowrap">SMR Holidays</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="text-[15px] font-medium text-foreground/70 hover:text-primary transition-colors">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <ThemeToggle />
          <button className="text-[15px] font-medium text-foreground/70 hover:text-primary transition-colors">Login</button>
          <button className="btn-primary py-2.5 px-6 min-h-[44px]">Sign Up</button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden relative z-[60]">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="w-12 h-12 flex items-center justify-center rounded-full glass hover:bg-white/20 active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>
      </nav>

      {/* Floating Top Destination Card (Desktop only) */}
      <div className="absolute top-24 right-10 hidden xl:block">
        <div className="glass px-5 py-3 rounded-2xl flex items-center gap-4 shadow-2xl backdrop-blur-2xl">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Top destination</p>
            <p className="text-sm font-bold text-foreground">Kodaikanal</p>
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Drawer (Sheet) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
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
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-semibold text-foreground hover:text-primary transition-colors block py-2 border-b border-border/50"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8 flex flex-col gap-4">
                <button className="w-full py-4 text-lg font-medium text-foreground border border-border rounded-xl active:scale-95 transition-all">
                  Login
                </button>
                <button className="w-full btn-primary py-4 text-lg">
                  Sign Up
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
