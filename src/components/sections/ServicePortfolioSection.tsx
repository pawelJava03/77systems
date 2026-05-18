"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Bot } from "lucide-react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  imageUrl?: string;
}

interface ServicePortfolioSectionProps {
  category: string;
  title: string;
  description: string;
  accentColorClass: string; // e.g., "text-green-500", "text-primary", "text-pink-500"
  accentBgClass: string;    // e.g., "bg-green-500/5", "bg-primary/5", "bg-pink-500/5"
  showCtaBox?: boolean;
}

export function ServicePortfolioSection({ 
  category, 
  title, 
  description, 
  accentColorClass, 
  accentBgClass,
  showCtaBox = false 
}: ServicePortfolioSectionProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      console.log(`Fetching projects for category: "${category}"`);
      try {
        const q = query(
          collection(db, "portfolio"),
          where("category", "==", category),
          orderBy("createdAt", "desc"),
          limit(3)
        );
        const snap = await getDocs(q);
        console.log(`Found ${snap.docs.length} projects for ${category}`);
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(fetched);
      } catch (err) {
        console.error(`Error fetching projects for ${category}:`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, [category]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-6xl mb-32 flex justify-center py-20">
        <Loader2 className={`w-10 h-10 animate-spin ${accentColorClass}`} />
      </div>
    );
  }

  if (projects.length === 0) return null;

  return (
    <div className="container mx-auto px-4 max-w-6xl mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2>
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            {description}
          </p>
        </div>
        <Link href="/portfolio">
          <Button variant="outline" className="mt-6 md:mt-0 rounded-full border-white/10 hover:bg-white/5 text-white">
            Zobacz całe portfolio <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <Link 
            href={`/portfolio/${p.slug}`} 
            key={p.id} 
            className={`group block rounded-[2rem] bg-[#111] border border-white/5 hover:border-white/20 transition-all overflow-hidden flex flex-col`}
          >
            <div className="aspect-video bg-[#1A1A1A] relative overflow-hidden">
               <div className={`absolute inset-0 ${accentBgClass} group-hover:bg-transparent transition-colors z-10`} />
               {p.imageUrl ? (
                 <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               ) : (
                 <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-105 transition-transform duration-500">
                    <span className="font-heading font-black text-4xl text-white mix-blend-overlay">77SYSTEMS</span>
                 </div>
               )}
            </div>
            <div className="p-8 flex-grow flex flex-col justify-between">
              <div>
                <p className={`text-xs ${accentColorClass} mb-3 font-mono font-bold uppercase tracking-widest`}>{p.category}</p>
                <h3 className={`text-2xl font-bold text-white group-hover:${accentColorClass} transition-colors`}>{p.title}</h3>
              </div>
              <div className={`mt-8 flex items-center text-sm font-bold text-white group-hover:${accentColorClass} transition-colors`}>
                Zobacz case study <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}

        {showCtaBox && projects.length < 3 && (
          <div className={`group rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 p-8 flex flex-col justify-center items-center text-center`}>
             <Bot className="w-12 h-12 text-primary mb-4" />
             <h3 className="text-xl font-bold text-white mb-2">Twój Proces Tutaj</h3>
             <p className="text-sm text-muted-foreground mb-6">Masz proces, który wykonujesz ręcznie co tydzień? Zautomatyzujmy go.</p>
             <Link href="/kontakt">
               <Button className="rounded-full bg-white text-black hover:bg-gray-200">
                 Darmowa konsultacja
               </Button>
             </Link>
          </div>
        )}
      </div>
    </div>
  );
}
