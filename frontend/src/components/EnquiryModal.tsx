"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Phone, MapPin, Send, CheckCircle2, ChevronRight, Moon, ShieldCheck } from "lucide-react";
import { API_URL } from "@/lib/config";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal = ({ isOpen, onClose }: EnquiryModalProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    tripDate: "",
    nights: "3",
    category: "Family",
    totalPersons: "2",
    males: "1",
    females: "1",
    children: "0",
    mobileNumber: "",
    needCab: "yes",
    location: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        // Also open WhatsApp as a fallback/secondary action
        const whatsappMsg = `*New Enquiry Form Submission*\n\n` +
          `*Date:* ${formData.tripDate}\n` +
          `*Nights:* ${formData.nights}\n` +
          `*Category:* ${formData.category}\n` +
          `*Total Persons:* ${formData.totalPersons} (M: ${formData.males}, F: ${formData.females}, C: ${formData.children})\n` +
          `*Mobile:* ${formData.mobileNumber}\n` +
          `*Cab Facility:* ${formData.needCab}\n` +
          `*Location:* ${formData.location}`;
        
        setTimeout(() => {
          window.open(`https://wa.me/919003922073?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
          onClose();
          // Reset form
          setStep(1);
          setIsSuccess(false);
          setFormData({
            tripDate: "",
            nights: "3",
            category: "Family",
            totalPersons: "2",
            males: "1",
            females: "1",
            children: "0",
            mobileNumber: "",
            needCab: "yes",
            location: ""
          });
        }, 2000);
      } else {
        alert("Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-card border border-border shadow-2xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row relative"
          >
            {/* Left Side - Info */}
            <div className="hidden md:flex md:w-1/3 bg-primary p-10 flex-col justify-between text-white relative overflow-hidden">
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-black leading-tight mb-4 tracking-tighter">Plan Your <br/>Perfect <br/>Trip.</h2>
                  <p className="text-white/70 text-sm font-medium leading-relaxed">
                    Fill out the form and our travel experts will curate the best experience for you.
                  </p>
               </div>
               
               <div className="relative z-10">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Trusted by 1000+ Travelers
                  </div>
               </div>

               {/* Decorative Circles */}
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-8 md:p-10 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-foreground/20 hover:text-foreground transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>

              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter mb-2">Request Received!</h3>
                  <p className="text-foreground/60 font-medium">Opening WhatsApp for final confirmation...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-secondary'}`} />
                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-secondary'}`} />
                  </div>

                  {step === 1 ? (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Trip Details</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                            <input 
                              type="date" 
                              name="tripDate"
                              value={formData.tripDate}
                              onChange={handleChange}
                              required
                              className="w-full bg-secondary/50 border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all font-bold text-sm"
                            />
                          </div>
                          <div className="relative">
                            <Moon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                            <input 
                              type="number" 
                              name="nights"
                              placeholder="Nights"
                              value={formData.nights}
                              onChange={handleChange}
                              required
                              className="w-full bg-secondary/50 border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all font-bold text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Traveler Category</label>
                        <div className="grid grid-cols-3 gap-3">
                          {["Family", "Friends", "Couple"].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                              className={`py-3 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                formData.category === cat 
                                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                                  : 'bg-secondary/50 border-border text-foreground/40 hover:border-primary/50'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Group Breakdown</label>
                         <div className="grid grid-cols-4 gap-3">
                            <div className="relative col-span-1">
                               <input type="number" name="totalPersons" placeholder="Total" value={formData.totalPersons} onChange={handleChange} required className="w-full bg-secondary/50 border border-border rounded-xl py-3 px-3 text-center font-bold text-sm outline-none focus:border-primary" />
                               <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-card text-[8px] font-black text-primary">ALL</span>
                            </div>
                            <div className="relative col-span-1">
                               <input type="number" name="males" placeholder="M" value={formData.males} onChange={handleChange} className="w-full bg-secondary/50 border border-border rounded-xl py-3 px-3 text-center font-bold text-sm outline-none focus:border-primary" />
                               <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-card text-[8px] font-black text-blue-500">MALE</span>
                            </div>
                            <div className="relative col-span-1">
                               <input type="number" name="females" placeholder="F" value={formData.females} onChange={handleChange} className="w-full bg-secondary/50 border border-border rounded-xl py-3 px-3 text-center font-bold text-sm outline-none focus:border-primary" />
                               <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-card text-[8px] font-black text-pink-500">FEMALE</span>
                            </div>
                            <div className="relative col-span-1">
                               <input type="number" name="children" placeholder="C" value={formData.children} onChange={handleChange} className="w-full bg-secondary/50 border border-border rounded-xl py-3 px-3 text-center font-bold text-sm outline-none focus:border-primary" />
                               <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 bg-card text-[8px] font-black text-amber-500">KIDS</span>
                            </div>
                         </div>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => setStep(2)}
                        className="w-full bg-foreground text-background py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
                      >
                        Next Step <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Contact Information</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                          <input 
                            type="tel" 
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary/50 border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all font-bold text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Your Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                          <input 
                            type="text" 
                            name="location"
                            placeholder="E.g. Bangalore, Chennai"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full bg-secondary/50 border border-border rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary transition-all font-bold text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Cab Facility Required?</label>
                         <div className="grid grid-cols-2 gap-4">
                            {["yes", "no"].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, needCab: opt }))}
                                className={`py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                  formData.needCab === opt 
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                                    : 'bg-secondary/50 border-border text-foreground/40 hover:border-primary/50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                         </div>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          type="button" 
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-secondary text-foreground/60 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px]"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-2xl shadow-primary/30 disabled:opacity-50"
                        >
                          {isSubmitting ? "Submitting..." : "Book My Trip"} <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
