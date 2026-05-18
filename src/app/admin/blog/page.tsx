"use client";

import { useEffect, useState } from "react";
import {
  collection, query, orderBy, onSnapshot,
  addDoc, deleteDoc, doc, serverTimestamp, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Trash2, Plus, Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  createdAt: Timestamp;
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "" });

  useEffect(() => {
    const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setArticles(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Article)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return alert("Tytuł i slug są wymagane.");
    setSaving(true);
    try {
      await addDoc(collection(db, "blog"), { ...form, createdAt: serverTimestamp() });
      setForm({ title: "", slug: "", excerpt: "", content: "" });
    } catch (err) {
      console.error(err);
      alert("Błąd zapisu.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Usuń artykuł?")) return;
    await deleteDoc(doc(db, "blog", id));
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Blog</h1>
        <p className="text-muted-foreground">{articles.length} artykułów</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Formularz */}
        <div className="bg-[#111] border border-white/5 rounded-[1.5rem] p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-500" /> Nowy artykuł
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Tytuł *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="Tytuł artykułu"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Slug (URL) *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="tytul-artykulu"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Zajawka (krótki opis)</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                placeholder="Krótki opis widoczny na liście..."
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Treść (Markdown)</label>
              <textarea
                rows={8}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none font-mono text-sm"
                placeholder="# Nagłówek&#10;&#10;Tutaj wklej treść artykułu w formacie Markdown..."
              />
            </div>
            <Button type="submit" disabled={saving} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Dodaj artykuł
            </Button>
          </form>
        </div>

        {/* Lista */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Opublikowane</h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground bg-[#111] rounded-[1.5rem] border border-white/5">
              <FileText className="w-8 h-8 mx-auto mb-4 opacity-30" />
              <p>Brak artykułów. Dodaj pierwszy wpis!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {articles.map((a) => {
                const date = a.createdAt?.toDate?.();
                const dateStr = date ? new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" }).format(date) : "—";
                return (
                  <div key={a.id} className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">/{a.slug}</p>
                      <p className="text-xs text-muted-foreground mt-1">{dateStr}</p>
                    </div>
                    <button onClick={() => handleDelete(a.id)} className="shrink-0 text-muted-foreground hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
