"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "smrholidays") {
            localStorage.setItem("admin_auth", "true");
            router.push("/admin");
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <Link href="/" className="fixed top-12 left-12 group flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-primary transition-all">
                    <ArrowRight className="w-5 h-5 group-hover:text-white rotate-180" />
                </div>
                <span className="text-foreground/40 font-black uppercase tracking-widest text-[10px]">Back to Website</span>
            </Link>

            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-12">
                        <Shield className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">Admin <span className="text-primary italic">Access.</span></h1>
                    <p className="text-foreground/40 font-bold uppercase tracking-widest text-[10px]">Authorization Required</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Security Key"
                            className={`w-full bg-secondary/50 border ${error ? 'border-red-500 shadow-lg shadow-red-500/10' : 'border-border'} rounded-2xl py-5 pl-16 pr-6 outline-none focus:border-primary transition-all font-bold placeholder:text-foreground/20`}
                            required
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        Authenticate <Zap className="w-4 h-4" />
                    </button>
                    
                    {error && (
                        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-bounce">Access Denied</p>
                    )}
                </form>

                <p className="mt-12 text-center text-foreground/20 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                    © 2026 FRAMEX TECH<br />PRIVATE ADMINISTRATIVE SECTOR
                </p>
            </div>
        </main>
    );
}
