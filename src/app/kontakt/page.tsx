"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudioRecorder } from "@/components/ui/AudioRecorder";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: Mail,
    title: "Napisz do nas",
    value: "contact@77systems.com",
    href: "mailto:contact@77systems.com"
  },
  {
    icon: Phone,
    title: "Zadzwoń",
    value: "+48 699 715 591",
    href: "tel:+48699715591"
  },
  {
    icon: MapPin,
    title: "Lokalizacja",
    value: "Radoszyce, woj. Świętokrzyskie",
    href: "https://maps.google.com/?q=Radoszyce"
  }
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Adres email jest wymagany.");
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, audioBase64 }),
      });
      if (!res.ok) throw new Error("API error");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na contact@77systems.com");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-48 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-[22vw] whitespace-nowrap font-heading font-black text-primary/5 pointer-events-none select-none z-0 leading-none">
        KONTAKT
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Porozmawiajmy</h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Masz pytania, pomysł na projekt lub jesteś gotowy na transformację swojego biznesu z wykorzystaniem AI i automatyzacji?
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{method.title}</p>
                      <p className="text-sm text-muted-foreground">{method.value}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0A0A0A] border border-white/10 p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />

            {submitted ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <h2 className="text-2xl font-bold text-white">Wiadomość wysłana!</h2>
                <p className="text-muted-foreground max-w-xs">
                  Dziękujemy za kontakt. Odezwiemy się do Ciebie w ciągu 24 godzin.
                </p>
                <Button
                  onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); setAudioBase64(null); }}
                  variant="outline"
                  className="mt-4 border-white/10 hover:border-white/30"
                >
                  Wyślij kolejną wiadomość
                </Button>
              </div>
            ) : (
              <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">Imię i nazwisko</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jan Kowalski"
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">Adres Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jan@example.com"
                    required
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">Wiadomość (opcjonalnie)</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Napisz krótko o swoim projekcie..."
                    className="w-full bg-[#1A1A1A] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-colors placeholder:text-white/20 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">Albo zostaw wiadomość głosową</label>
                  <AudioRecorder onAudioReady={setAudioBase64} />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <div className="mt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-white hover:bg-white/90 text-black font-bold text-lg py-7 rounded-2xl mb-4 gap-2"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                    {submitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                  </Button>
                  <p className="text-xs text-muted-foreground leading-relaxed text-center px-2">
                    Administratorem Twoich danych osobowych jest Paweł Staciwa. Przetwarzamy Twoje dane wyłącznie w celu obsługi Twojego zapytania. Więcej informacji znajdziesz w <a href="/polityka-prywatnosci" className="text-primary hover:underline">Polityce Prywatności</a>.
                  </p>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
}
