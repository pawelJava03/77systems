"use client";

import { useEffect, useState, useRef } from "react";
import { Trash2, Plus, Loader2, Image, Upload, X, Tag, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
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
  description: string;
  image_url: string;
  project_url: string;
  content: string;
  technologies: string[];
  meta_title: string;
  meta_description: string;
}

const emptyForm = {
  title: "",
  slug: "",
  category: CATEGORIES[0],
  description: "",
  content: "",
  image_url: "",
  project_url: "",
  technologies: [] as string[],
  meta_title: "",
  meta_description: "",
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [techInput, setTechInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

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

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.technologies.includes(t)) {
      setForm((f) => ({ ...f, technologies: [...f.technologies, t] }));
    }
    setTechInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return alert("Tytuł i slug są wymagane.");
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
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
      setTechInput("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      await fetchProjects();
    } catch {
      alert("Błąd podczas dodawania projektu.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Usuń projekt?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    await fetchProjects();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Portfolio</h1>
        <p className="text-muted-foreground">{projects.length} projektów w bazie</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Formularz */}
        <div className="bg-[#111] border border-white/5 rounded-[1.5rem] p-8">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Dodaj projekt
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Tytuł *</label>
              <input type="text" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="Tytuł projektu" />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Slug (URL) *</label>
              <input type="text" value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="nazwa-projektu" />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Kategoria</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Krótki opis</label>
              <textarea rows={2} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                placeholder="Jedno zdanie — widoczne na liście projektów" />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1">Treść realizacji</label>
              <textarea rows={5} value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-y"
                placeholder="Szczegółowy opis projektu..." />
            </div>

            {/* Link do projektu */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> Link do projektu (opcjonalnie)
              </label>
              <input type="url" value={form.project_url}
                onChange={(e) => setForm({ ...form, project_url: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="https://example.com" />
            </div>

            {/* Technologie */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Technologie
              </label>
              <div className="flex gap-2">
                <input type="text" value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                  className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="np. n8n, REST API, React..." />
                <button type="button" onClick={addTech}
                  className="px-4 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-white hover:border-primary/50 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {form.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.technologies.map((t) => (
                    <span key={t} className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-sm rounded-lg px-3 py-1">
                      {t}
                      <button type="button" onClick={() => setForm((f) => ({ ...f, technologies: f.technologies.filter((x) => x !== t) }))}>
                        <X className="w-3 h-3 hover:text-white" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
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

            {/* Zdjęcie */}
            <div>
              <label className="block text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Image className="w-3 h-3" /> Zdjęcie
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

            <Button type="submit" disabled={saving} className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-6 rounded-xl gap-2">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Dodaj projekt
            </Button>
          </form>
        </div>

        {/* Lista */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Istniejące projekty</h2>
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-3 max-h-[900px] overflow-y-auto pr-1">
              {projects.map((p) => (
                <div key={p.id} className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[#1A1A1A] border border-white/5 flex items-center justify-center shrink-0">
                      <Image className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm truncate">{p.title}</p>
                    <p className="text-xs text-primary mt-0.5">{p.category}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">/{p.slug}</p>
                    {p.project_url && (
                      <a href={p.project_url} target="_blank" rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-0.5">
                        <ExternalLink className="w-3 h-3" /> Projekt
                      </a>
                    )}
                    {p.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.technologies.map((t) => (
                          <span key={t} className="text-xs bg-white/5 border border-white/10 text-muted-foreground rounded-md px-2 py-0.5">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => handleDelete(p.id)}
                    className="shrink-0 text-muted-foreground hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
