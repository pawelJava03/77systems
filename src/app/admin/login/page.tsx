"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Błąd logowania.");
      }
    } catch {
      setError("Błąd połączenia z serwerem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-[#111] border border-white/10 rounded-[2rem] p-10 shadow-2xl">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <span className="font-heading font-black text-primary text-2xl">77</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2 text-center">Panel Administratora</h1>
          <p className="text-muted-foreground text-sm mb-8 text-center">Zaloguj się aby zarządzać stroną</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="contact@77systems.eu"
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Hasło</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                placeholder="••••••••"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-black font-bold rounded-2xl py-6 flex items-center justify-center gap-3 text-base"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
              Zaloguj się
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
