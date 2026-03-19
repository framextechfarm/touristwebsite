"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/config";
import { motion } from "framer-motion";
import { Upload, Save, Image as ImageIcon, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ImageSlot {
  id: number;
  slot_key: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

export default function AdminImagesPage() {
  const [slots, setSlots] = useState<ImageSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/image-slots`);
      if (response.ok) {
        const data = await response.json();
        setSlots(data);
      }
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (slotKey: string, file: File) => {
    const formData = new FormData();
    formData.append("slot_key", slotKey);
    formData.append("file", file);

    setSaving(slotKey);
    try {
      const response = await fetch("http://localhost:8000/admin/image-slots/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Image uploaded successfully!" });
        fetchSlots();
      } else {
        setMessage({ type: "error", text: "Upload failed." });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Network error." });
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleUpdate = async (slotKey: string, title: string, description: string) => {
    const formData = new FormData();
    formData.append("slot_key", slotKey);
    formData.append("title", title);
    formData.append("description", description);

    setSaving(slotKey);
    try {
      const response = await fetch("http://localhost:8000/admin/image-slots/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage({ type: "success", text: "Slot updated successfully!" });
        fetchSlots();
      } else {
        setMessage({ type: "error", text: "Update failed." });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Network error." });
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex justify-between items-center">
          <div>
            <Link href="/" className="flex items-center gap-2 text-primary hover:underline mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Admin Image Manager</h1>
            <p className="text-muted-foreground mt-2">Manage homepage image slots and descriptions</p>
          </div>
          
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl glass border ${
                message.type === "success" ? "border-emerald-500/50 text-emerald-500" : "border-red-500/50 text-red-500"
              }`}
            >
              {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="font-medium">{message.text}</span>
            </motion.div>
          )}
        </header>

        {/* Slots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {slots.map((slot) => (
            <SlotCard 
              key={slot.id} 
              slot={slot} 
              onUpload={handleUpload} 
              onUpdate={handleUpdate}
              isSaving={saving === slot.slot_key}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function SlotCard({ slot, onUpload, onUpdate, isSaving }: { 
  slot: ImageSlot, 
  onUpload: (key: string, file: File) => void,
  onUpdate: (key: string, title: string, desc: string) => void,
  isSaving: boolean
}) {
  const [title, setTitle] = useState(slot.title);
  const [desc, setDesc] = useState(slot.description);

  // Backend image URL might be relative to /uploads, so we need to point to localhost:8000
  const imageUrl = slot.image_url 
    ? (slot.image_url.startsWith("http") ? slot.image_url : `${API_URL}${slot.image_url}`)
    : null;

  return (
    <div className="glass rounded-[2rem] border border-border/50 overflow-hidden flex flex-col">
      <div className="relative h-64 bg-secondary/20 group">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={slot.slot_key} 
            fill 
            className="object-cover transition-opacity group-hover:opacity-75"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">No Image Uploaded</p>
          </div>
        )}
        
        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
          <Upload className="w-8 h-8 text-white" />
          <input 
            type="file" 
            className="hidden" 
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) onUpload(slot.slot_key, e.target.files[0]);
            }}
          />
        </label>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
            Slot ID: {slot.slot_key}
          </span>
          {isSaving && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              placeholder="Enter title..."
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase mb-2 block">Description</label>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className="w-full bg-background/50 border border-border/50 rounded-xl px-4 py-3 text-foreground focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
              placeholder="Enter description..."
            />
          </div>
        </div>

        <button 
          onClick={() => onUpdate(slot.slot_key, title, desc)}
          disabled={isSaving}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
