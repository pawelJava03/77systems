"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const ALL = "Wszystkie";
const categories = [ALL, "Web development", "Automatyzacje & AI", "SEO", "Social media"];

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(ALL);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === ALL ? posts : posts;

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-24">
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight">Nasz Blog</h1>
        <div className="flex items-center justify-center gap-3 text-muted-foreground font-mono text-sm uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-primary">Blog</span>
        </div>
      </div>

      <div className="w-[105vw] -ml-[2.5vw] bg-primary py-4 mb-24 relative rotate-[-2deg] border-y border-primary/20 flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center text-black font-black uppercase text-2xl tracking-tight mx-4">
              Artykuły <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
              Wiedza <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
              Poradniki <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
              Nowości <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
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
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">Brak artykułów.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const dateStr = p.created_at
                ? new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(new Date(p.created_at))
                : "";
              return (
                <Link href={`/blog/${p.slug}`} key={p.id}
                  className="group flex flex-col rounded-[2rem] bg-[#111] border border-white/5 hover:border-primary/50 transition-all overflow-hidden min-h-[380px]">
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
                      <p className="text-xs text-muted-foreground font-mono mb-4">{dateStr}</p>
                      <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors leading-snug">{p.title}</h2>
                      {p.excerpt && <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>}
                    </div>
                    <div className="mt-8 flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors">
                      Czytaj dalej <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
