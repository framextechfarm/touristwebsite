"use client";

const stats = [
  { label: "Hidden Gems", val: "50+", desc: "Off-beat locations" },
  { label: "Expert Guides", val: "20+", desc: "Local mountain specialists" },
  { label: "Safety Rating", val: "4.9/5", desc: "Top-tier equipment" },
  { label: "Experience", val: "15 Yrs", desc: "In Kodaikanal tourism" }
];

export const Stats = () => {
  return (
    <section className="py-20 bg-secondary/10 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-3xl font-black text-foreground">{stat.val}</p>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.label}</p>
                <p className="text-[10px] text-foreground/40 font-medium">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
