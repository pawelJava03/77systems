"use client";

import { useEffect, useState, useRef } from "react";
import {
  collection, query, orderBy, onSnapshot,
  addDoc, deleteDoc, doc, serverTimestamp, writeBatch, getDocs
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Trash2, Plus, Loader2, Download, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "Strony internetowe",
  "Sklepy internetowe",
  "Automatyzacje & AI",
  "SEO",
  "Social media",
];

const STATIC_PROJECTS = [
  { title: "Nowoczesna strona dla dewelopera", slug: "strona-deweloper", category: "Strony internetowe", description: "", imageUrl: "" },
  { title: "Landing page dla branży fitness", slug: "landing-fitness", category: "Strony internetowe", description: "", imageUrl: "" },
  { title: "Sklep z odzieżą premium", slug: "sklep-odziez", category: "Sklepy internetowe", description: "", imageUrl: "" },
  { title: "Platforma e-commerce B2B", slug: "ecommerce-b2b", category: "Sklepy internetowe", description: "", imageUrl: "" },
  { title: "System ERP dla Logistyki", slug: "erp-logistyka", category: "Automatyzacje & AI", description: "", imageUrl: "" },
  { title: "Zautomatyzowany obieg dokumentów", slug: "obieg-dokumentow", category: "Automatyzacje & AI", description: "", imageUrl: "" },
  { title: "Wzrost ruchu organicznego o 300%", slug: "seo-ecommerce", category: "SEO", description: "", imageUrl: "" },
  { title: "Lokalne SEO dla sieci klinik", slug: "seo-klinika", category: "SEO", description: "", imageUrl: "" },
  { title: "Audyt techniczny i ratowanie spadków", slug: "seo-audyt-techniczny", category: "SEO", description: "", imageUrl: "" },
  { title: "Kampania Meta Ads dla restauracji", slug: "meta-ads-restauracja", category: "Social media", description: "", imageUrl: "" },
  { title: "Prowadzenie profilu marki modowej", slug: "profil-modowy", category: "Social media", description: "", imageUrl: "" },
  { title: "Viralowe wideo na TikTok dla salonu", slug: "tiktok-salon-urody", category: "Social media", description: "", imageUrl: "" },
];

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [migrating, setMigrating] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: CATEGORIES[0],
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const q = query(collection(db, "portfolio"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project)));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleMigrate = async () => {
    if (!confirm("Zmigrujesz stare projekty do bazy Firestore. Kontynuować?")) return;
    setMigrating(true);
    try {
      const batch = writeBatch(db);
      const existing = await getDocs(collection(db, "portfolio"));
      const existingSlugs = new Set(existing.docs.map((d) => d.data().slug));
      let count = 0;
      STATIC_PROJECTS.forEach((p) => {
        if (!existingSlugs.has(p.slug)) {
          const newRef = doc(collection(db, "portfolio"));
          batch.set(newRef, { ...p, createdAt: serverTimestamp() });
          count++;
        }
      });
      await batch.commit();
      alert(`Migracja zakończona! Dodano ${count} nowych projektów.`);
    } catch (e) {
      console.error(e);
      alert("Błąd podczas migracji.");
    } finally {
      setMigrating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) return alert("Tytuł i slug są wymagane.");
    setSaving(true);
    try {
      await addDoc(collection(db, "portfolio"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setForm({ title: "", slug: "", category: CATEGORIES[0], description: "", imageUrl: "" });
    } catch (e) {
      console.error(e);
      alert("Błąd podczas dodawania projektu.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Usuń projekt?")) return;
    await deleteDoc(doc(db, "portfolio", id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Portfolio</h1>
          <p className="text-muted-foreground">{projects.length} projektów w bazie</p>
        </div>
        <Button
          onClick={handleMigrate}
          disabled={migrating}
          variant="outline"
          className="border-white/10 hover:border-white/30 gap-2"
        >
          {migrating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          Importuj stare projekty
        </Button>
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
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="Tytuł projektu"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Slug (URL) *</label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="nazwa-projektu"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Kategoria</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Opis (opcjonalnie)</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 resize-none"
                placeholder="Krótki opis projektu..."
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Image className="w-3 h-3" /> URL zdjęcia (opcjonalnie)
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="https://przykład.pl/zdjecie.jpg"
              />
              {form.imageUrl && (
                <div className="mt-2 rounded-xl overflow-hidden border border-white/10">
                  <img src={form.imageUrl} alt="Podgląd" className="w-full h-32 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                </div>
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
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {projects.map((p) => (
                <div key={p.id} className="bg-[#111] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-[#1A1A1A] border border-white/5 flex items-center justify-center shrink-0">
                      <Image className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm truncate">{p.title}</p>
                    <p className="text-xs text-primary mt-0.5">{p.category}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">/{p.slug}</p>
                  </div>
                  <button onClick={() => handleDelete(p.id)} className="shrink-0 text-muted-foreground hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10">
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
