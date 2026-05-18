"use client";

import Link from "next/link";
import { Briefcase, MessageSquare, FileText, ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/admin/leads",
    icon: MessageSquare,
    title: "Leady / CRM",
    description: "Przeglądaj zgłoszenia z formularza kontaktowego, odsłuchuj głosówki i zaznaczaj kontakty.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    href: "/admin/portfolio",
    icon: Briefcase,
    title: "Portfolio",
    description: "Dodawaj i usuwaj realizacje widoczne na stronie. Migruj stare projekty jednym kliknięciem.",
    color: "text-green-500",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    href: "/admin/blog",
    icon: FileText,
    title: "Blog",
    description: "Zarządzaj artykułami. Dodawaj nowe wpisy i usuwaj stare.",
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Witaj z powrotem! Wybierz sekcję do zarządzania.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group block bg-[#111] border border-white/5 hover:border-white/20 rounded-[1.5rem] p-8 transition-all hover:shadow-lg hover:shadow-black/50"
          >
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
              {card.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{card.description}</p>
            <div className="flex items-center text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors">
              Przejdź <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
