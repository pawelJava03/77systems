"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CookieConsent } from "@/components/ui/CookieConsent";

export default function PolitykaCookiesPage() {
  const [showManageBanner, setShowManageBanner] = useState(false);

  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-4 max-w-4xl">
      <div className="mb-12">
        <Link href="/" className="text-primary hover:underline text-sm font-bold uppercase tracking-wider mb-4 inline-block">
          &larr; Powrót
        </Link>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">Polityka Cookies</h1>
        <p className="text-muted-foreground text-sm">Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}</p>
      </div>

      <div className="prose prose-invert prose-orange max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">1. Czym są pliki cookies?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pliki cookies (tzw. „ciasteczka”) to małe pliki tekstowe, które są zapisywane na urządzeniu końcowym użytkownika (komputerze, smartfonie, tablecie) podczas przeglądania stron internetowych. Służą one m.in. do zapamiętywania preferencji użytkownika, zbierania danych analitycznych oraz wyświetlania spersonalizowanych reklam.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">2. Jakich rodzajów cookies używamy?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Na naszej stronie (77systems.eu) wykorzystujemy następujące rodzaje plików cookies:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li><strong>Niezbędne:</strong> Pliki wymagane do prawidłowego działania strony, zapamiętywania ustawień (np. wyboru zgód na cookies). Bez tych plików strona nie może funkcjonować prawidłowo.</li>
            <li><strong>Analityczne:</strong> Pliki wykorzystywane do zbierania anonimowych informacji o tym, jak użytkownicy korzystają ze strony (np. Google Analytics), co pozwala nam poprawiać jej wydajność i zawartość.</li>
            <li><strong>Marketingowe:</strong> Pliki używane do śledzenia użytkowników na różnych stronach internetowych. Służą one do wyświetlania reklam, które są relewantne i angażujące (np. Meta Pixel, Google Ads).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">3. Zarządzanie plikami cookies i wycofanie zgody</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Masz pełną kontrolę nad tym, jakie pliki cookies zapisujemy na Twoim urządzeniu. W każdej chwili możesz zmienić swoje preferencje lub wycofać wcześniej udzieloną zgodę, korzystając z poniższego przycisku.
          </p>
          
          <button 
            onClick={() => {
              localStorage.removeItem("cookieConsent");
              window.location.reload();
            }}
            className="bg-[#111] border border-white/10 hover:border-primary/50 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Zmień preferencje / Zresetuj zgody
          </button>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">4. Skrypty zewnętrzne a Twoja prywatność</h2>
          <p className="text-muted-foreground leading-relaxed">
            Stosujemy rygorystyczne zasady blokowania skryptów (Google Consent Mode v2). Oznacza to, że żadne kody śledzące czy wtyczki analityczne od zewnętrznych dostawców nie zostaną załadowane do Twojej przeglądarki, dopóki wyraźnie nie zaakceptujesz odpowiedniej kategorii plików cookies. Wszelkie zapytania kierowane do np. usług Google odbywają się z odpowiednimi flagami informującymi o braku zgody, aby chronić Twoją prywatność.
          </p>
        </section>
      </div>
    </main>
  );
}
