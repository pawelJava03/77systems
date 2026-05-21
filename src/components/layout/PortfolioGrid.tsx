"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
}

export function PortfolioGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((data: Project[]) => { setProjects(data.slice(0, 3)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="container px-4 py-16 md:py-32 bg-background flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground mt-4 font-mono uppercase tracking-widest text-sm">Ładowanie realizacji...</p>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="container px-4 py-16 md:py-32 bg-background">
      <div className="mb-16">
        <h2>
          Przykładowe<br /><span className="text-primary">realizacje</span> dla klientów
        </h2>
      </div>

      <div className="flex flex-col gap-12 md:gap-16">
        {projects[0] && (
          <div className="w-full group cursor-pointer">
            <Link href={`/portfolio/${projects[0].slug}`} className="block w-full">
              <div className="w-full relative aspect-[16/9] md:aspect-[2/1] rounded-3xl overflow-hidden mb-6 bg-card border border-border">
                {projects[0].image_url ? (
                  <Image src={projects[0].image_url} alt={projects[0].title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full bg-[#111] flex items-center justify-center">
                    <span className="font-heading font-black text-4xl text-white/5 uppercase">77Systems</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-2">
                <div>
                  <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{projects[0].title}</h3>
                  <p className="text-muted-foreground">{projects[0].description || "Szczegółowa realizacja dla naszego klienta."}</p>
                </div>
                <span className="flex items-center gap-2 text-primary font-bold group-hover:underline shrink-0">
                  Case Study <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </div>
        )}

        {projects.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {projects.slice(1, 3).map((p) => (
              <div key={p.id} className="w-full group cursor-pointer">
                <Link href={`/portfolio/${p.slug}`} className="block w-full">
                  <div className="w-full relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-card border border-border">
                    {p.image_url ? (
                      <Image src={p.image_url} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-[#111] flex items-center justify-center">
                        <span className="font-heading font-black text-2xl text-white/5 uppercase">77Systems</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 px-2">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <p className="text-muted-foreground text-sm">{p.category}</p>
                    </div>
                    <span className="flex items-center gap-2 text-primary font-bold group-hover:underline shrink-0 text-sm">
                      Case Study <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
