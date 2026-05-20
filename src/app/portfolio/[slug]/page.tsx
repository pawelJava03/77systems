"use client";

import { useEffect, useState, use } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Tag, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl?: string;
  content?: string;
  technologies?: string[];
  createdAt?: { seconds: number };
}

export default function SingleProject({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const q = query(
          collection(db, "portfolio"),
          where("slug", "==", resolvedParams.slug),
          limit(1)
        );
        const snap = await getDocs(q);
        if (snap.empty) {
          setProject(null);
        } else {
          const d = snap.docs[0];
          setProject({ id: d.id, ...d.data() } as Project);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!project) return notFound();

  const displayContent = project.content || project.description;

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Back */}
          <Link
            href="/portfolio"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Powrót do portfolio
          </Link>

          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end mb-16">
            <div className="lg:col-span-2">
              <p className="text-primary font-mono font-bold uppercase tracking-[0.2em] mb-4">{project.category}</p>
              <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight">
                {project.title}
              </h1>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-muted-foreground bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  Realizacja:{" "}
                  {project.createdAt
                    ? new Date(project.createdAt.seconds * 1000).toLocaleDateString("pl-PL", { year: "numeric", month: "long" })
                    : "Niedawno"}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                <Tag className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{project.category}</span>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl mb-16">
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#111] flex items-center justify-center">
                <span className="font-heading font-black text-6xl text-white/10 uppercase tracking-tighter">77Systems</span>
              </div>
            )}
          </div>

          {/* Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">O projekcie</h2>
              <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                {displayContent ? (
                  displayContent.split("\n").filter(Boolean).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))
                ) : (
                  <p>Pracujemy nad przygotowaniem szczegółowego opisu tej realizacji. Zapraszamy do kontaktu, aby dowiedzieć się więcej o tym wdrożeniu.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Technologie */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8">
                  <h3 className="text-lg font-bold text-white mb-4">Technologie</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-xl px-4 py-2"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-xl font-bold text-white mb-4">Interesuje Cię podobny efekt?</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  Każdy projekt realizujemy z pasją i precyzją, dbając o najmniejsze detale techniczne oraz estetyczne.
                </p>
                <Link href="/kontakt">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-14 rounded-2xl gap-2">
                    Skonsultuj projekt
                    <ArrowUpRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
