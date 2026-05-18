"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Loader2 } from "lucide-react";

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category?: string;
  createdAt: Timestamp;
}

function formatDate(ts: Timestamp) {
  return new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(ts.toDate());
}

export default function SinglePost() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const q = query(collection(db, "blog"), where("slug", "==", slug));
      const snap = await getDocs(q);
      if (!snap.empty) {
        setArticle(snap.docs[0].data() as Article);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="pt-32 pb-24 container mx-auto px-4 min-h-screen">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-xl mb-6">Artykuł nie istnieje.</p>
          <Link href="/blog" className="text-primary font-bold hover:underline">← Wróć do bloga</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 container mx-auto px-4 min-h-screen">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
            ← Blog
          </Link>
        </div>
        {article.category && (
          <p className="text-xs text-primary font-mono font-bold uppercase tracking-widest mb-4">{article.category}</p>
        )}
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">{article.title}</h1>
        <p className="text-sm text-muted-foreground font-mono mb-10">{formatDate(article.createdAt)}</p>
        {article.excerpt && (
          <p className="text-xl text-muted-foreground mb-10 border-l-2 border-primary pl-6">{article.excerpt}</p>
        )}
        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-white/80 leading-relaxed">
          {article.content}
        </div>
      </article>
    </main>
  );
}
