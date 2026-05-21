"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Trash2, Play, Pause, Mic, Mail, Phone, Loader2 } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  audio_base64: string;
  contacted: boolean;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads");
    const data = await res.json();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const toggleContacted = async (lead: Lead) => {
    await fetch(`/api/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contacted: !lead.contacted }),
    });
    await fetchLeads();
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Czy na pewno chcesz usunąć to zgłoszenie?")) return;
    await fetch(`/api/leads/${id}`, { method: "DELETE" });
    await fetchLeads();
  };

  const togglePlay = (lead: Lead) => {
    if (!lead.audio_base64) return;
    if (playingId === lead.id && audioEl) {
      audioEl.pause();
      setPlayingId(null);
      setAudioEl(null);
    } else {
      if (audioEl) audioEl.pause();
      const el = new Audio(lead.audio_base64);
      el.play();
      el.onended = () => { setPlayingId(null); setAudioEl(null); };
      setAudioEl(el);
      setPlayingId(lead.id);
    }
  };

  const contacted = leads.filter((l) => l.contacted);
  const notContacted = leads.filter((l) => !l.contacted);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Leady / CRM</h1>
        <p className="text-muted-foreground">
          Łącznie <span className="text-white font-bold">{leads.length}</span> zgłoszeń ·
          Do kontaktu: <span className="text-primary font-bold">{notContacted.length}</span>
        </p>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-24 text-muted-foreground bg-[#111] rounded-[1.5rem] border border-white/5">
          <Mic className="w-8 h-8 mx-auto mb-4 opacity-30" />
          <p>Brak zgłoszeń. Gdy ktoś wypełni formularz kontaktowy, pojawi się tutaj.</p>
        </div>
      )}

      {notContacted.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Nowe • {notContacted.length}</h2>
          <div className="space-y-4">
            {notContacted.map((lead) => (
              <LeadCard key={lead.id} lead={lead} isPlaying={playingId === lead.id}
                onToggleContacted={toggleContacted} onDelete={deleteLead} onTogglePlay={togglePlay} />
            ))}
          </div>
        </div>
      )}

      {contacted.length > 0 && (
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Skontaktowano • {contacted.length}</h2>
          <div className="space-y-4 opacity-60">
            {contacted.map((lead) => (
              <LeadCard key={lead.id} lead={lead} isPlaying={playingId === lead.id}
                onToggleContacted={toggleContacted} onDelete={deleteLead} onTogglePlay={togglePlay} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LeadCard({
  lead, isPlaying, onToggleContacted, onDelete, onTogglePlay,
}: {
  lead: Lead;
  isPlaying: boolean;
  onToggleContacted: (l: Lead) => void;
  onDelete: (id: number) => void;
  onTogglePlay: (l: Lead) => void;
}) {
  const dateStr = lead.created_at
    ? new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lead.created_at))
    : "—";

  return (
    <div className={`bg-[#111] border rounded-[1.5rem] p-6 transition-all ${
      lead.contacted ? "border-white/5" : "border-primary/20 shadow-[0_0_20px_rgba(255,85,0,0.05)]"
    }`}>
      <div className="flex items-start gap-4">
        <button onClick={() => onToggleContacted(lead)} className="mt-1 shrink-0 transition-transform hover:scale-110">
          {lead.contacted
            ? <CheckCircle2 className="w-6 h-6 text-green-500" />
            : <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <p className="font-bold text-white">{lead.name || "Nieznane imię"}</p>
            <span className="text-xs text-muted-foreground">{dateStr}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 flex-wrap">
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                <Mail className="w-3 h-3" /> {lead.email}
              </a>
            )}
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-green-400 transition-colors font-medium text-green-500/80">
                <Phone className="w-3 h-3" /> {lead.phone}
              </a>
            )}
          </div>
          {lead.message && (
            <p className="text-sm text-white/70 bg-[#1A1A1A] rounded-xl px-4 py-3 border border-white/5 mb-3 leading-relaxed">
              {lead.message}
            </p>
          )}
          {lead.audio_base64 && (
            <button onClick={() => onTogglePlay(lead)}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-primary/10 border border-primary/20 rounded-xl px-4 py-2">
              {isPlaying
                ? <><Pause className="w-4 h-4" /> Zatrzymaj głosówkę</>
                : <><Play className="w-4 h-4" /> Odtwórz głosówkę</>}
            </button>
          )}
        </div>

        <button onClick={() => onDelete(lead.id)}
          className="shrink-0 text-muted-foreground hover:text-red-400 transition-colors p-2 rounded-xl hover:bg-red-500/10">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
