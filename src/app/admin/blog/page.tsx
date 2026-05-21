"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2, FileText, Upload, X, Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  meta_title: string;
  meta_description: string;
  created_at: string;
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image_url: "",
  meta_title: "",
  meta_description: "",
};

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploadProgress, setUploadProgress] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchArticles = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setArticles(data);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleImageUpload = async (file: File) => {
    setUploadProgress(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setForm((f) => ({ ...f, image_url: url }));
    } catch {
      alert("Błąd podczas wgrywania zdjęcia.");
    } finally {
      setUploadProgress(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return alert("Tytuł i slug są wymagane.");
    setSaving(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "Błąd zapisu.");
        return;
      }
      setForm(emptyForm);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await fetchArticles();
    } catch {
      alert("Błąd zapisu.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Usuń artykuł?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    await fetchArticles();
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
              <input type="text" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="Tytuł artykułu" />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Slug (URL) *</label>
              <input type="text" value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="tytul-artykulu" />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Zajawka</label>
              <textarea rows={2} value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                placeholder="Krótki opis widoczny na liście..." />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Treść (Markdown)</label>
              <textarea rows={8} value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none font-mono text-sm"
                placeholder="# Nagłówek&#10;&#10;Tutaj wklej treść w formacie Markdown..." />
            </div>

            {/* SEO */}
            <div className="border border-white/5 rounded-xl p-4 space-y-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <Search className="w-3 h-3" /> SEO
              </p>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Meta Title</label>
                <input type="text" value={form.meta_title}
                  onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="Tytuł strony — ok. 60 znaków" />
                <p className="text-xs text-muted-foreground mt-1">{form.meta_title.length}/60 znaków</p>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Meta Description</label>
                <textarea rows={2} value={form.meta_description}
                  onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                  placeholder="Opis strony — ok. 160 znaków" />
                <p className="text-xs text-muted-foreground mt-1">{form.meta_description.length}/160 znaków</p>
              </div>
            </div>

            {/* Zdjęcie featured */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Image className="w-3 h-3" /> Zdjęcie wyróżniające
              </label>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
              {form.image_url ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <img src={form.image_url} alt="Podgląd" className="w-full h-40 object-cover" />
                  <button type="button"
                    onClick={() => { setForm({ ...form, image_url: "" }); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    className="absolute top-2 right-2 bg-black/70 hover:bg-black rounded-full p-1 text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : uploadProgress ? (
                <div className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-5 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Wgrywanie zdjęcia...</span>
                </div>
              ) : (
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-[#1A1A1A] border border-dashed border-white/20 hover:border-primary/50 rounded-xl px-4 py-8 flex flex-col items-center gap-2 text-muted-foreground hover:text-white transition-colors">
                  <Upload className="w-6 h-6" />
                  <span className="text-sm">Kliknij aby wybrać zdjęcie</span>
                </button>
              )}
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
                const dateStr = a.created_at
                  ? new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium" }).format(new Date(a.created_at))
                  : "—";
                return (
                  <div key={a.id} className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                    {a.image_url ? (
                      <img src={a.image_url} alt={a.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-[#1A1A1A] border border-white/5 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm">{a.title}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">/{a.slug}</p>
                      <p className="text-xs text-muted-foreground mt-1">{dateStr}</p>
                    </div>
                    <button onClick={() => handleDelete(a.id)}
                      className="shrink-0 text-muted-foreground hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10">
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
