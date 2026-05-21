"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const categories = [
  "Wszystkie",
  "Strony internetowe",
  "Sklepy internetowe",
  "Automatyzacje & AI",
  "SEO",
  "Social media",
];

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  image_url: string;
  description: string;
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Wszystkie");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredProjects = activeCategory === "Wszystkie"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-24">
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight">Nasze Portfolio</h1>
        <div className="flex items-center justify-center gap-3 text-muted-foreground font-mono text-sm uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-primary">Portfolio</span>
        </div>
      </div>

      <div className="w-[105vw] -ml-[2.5vw] bg-primary py-4 mb-24 relative rotate-[-2deg] border-y border-primary/20 flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center text-black font-black uppercase text-2xl tracking-tight mx-4">
              Realizacje <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
              Projekty <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
              Case Study <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
              Sukcesy <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-black shadow-[0_0_20px_rgba(255,85,0,0.3)]"
                  : "bg-[#111] text-white hover:bg-[#1A1A1A] border border-white/5 hover:border-white/20"
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <Link href={`/portfolio/${p.slug}`} key={p.id}
                className="group block rounded-[2rem] bg-[#111] border border-white/5 hover:border-primary/50 transition-all overflow-hidden flex flex-col">
                <div className="aspect-video bg-[#1A1A1A] relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-105 transition-transform duration-500">
                      <span className="font-heading font-black text-4xl text-white mix-blend-overlay">77SYSTEMS</span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-primary mb-3 font-mono font-bold uppercase tracking-widest">{p.category}</p>
                    <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{p.title}</h2>
                    {p.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>}
                  </div>
                  <div className="mt-8 flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors">
                    Zobacz case study <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">Brak projektów w tej kategorii.</div>
        )}
      </div>
    </main>
  );
}
