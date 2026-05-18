import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, BarChart, Target, MapPin, ChevronDown } from 'lucide-react';
import { ServicePortfolioSection } from '@/components/sections/ServicePortfolioSection';

export const metadata: Metadata = {
  title: 'Pozycjonowanie Stron SEO (Śląsk, Świętokrzyskie, Warszawa) | 77systems',
  description: 'Zwiększ widoczność swojej strony w Google. Skuteczne pozycjonowanie SEO, audyty techniczne i link building. Obsługujemy firmy z całej Polski, w tym Kielce i Śląsk.',
  keywords: 'pozycjonowanie stron, seo, audyt seo, pozycjonowanie lokalne, pozycjonowanie śląsk, seo kielce, seo warszawa, agencja seo, optymalizacja seo, widoczność w google, link building',
  alternates: {
    canonical: 'https://77systems.eu/uslugi/seo',
  }
};

export default function SEOPage() {

  const faqList = [
    {
      question: "Kiedy zobaczę pierwsze efekty pozycjonowania?",
      answer: "SEO to proces długoterminowy. Zazwyczaj pierwsze mierzalne wzrosty pozycji i ruchu organicznego zauważamy po 3-6 miesiącach systematycznej pracy (zależnie od konkurencyjności branży i historii domeny). Unikamy obiecywania 'szybkich efektów', ponieważ bezpieczne i trwałe SEO wymaga czasu, odpowiednich treści i jakościowego profilu linków."
    },
    {
      question: "Czym różni się SEO od Google Ads (SEM)?",
      answer: "SEO (Search Engine Optimization) skupia się na budowaniu darmowego, organicznego ruchu z wyników wyszukiwania, podczas gdy Google Ads to system płatnych reklam (PPC - Pay-Per-Click). Ruch z SEO jest bardziej stabilny, tańszy w długim okresie i często budzi większe zaufanie internautów. Reklamy Ads dają za to efekty natychmiastowe. Najlepsze efekty przynosi często synergia obu tych działań."
    },
    {
      question: "Na czym polega audyt SEO?",
      answer: "Nasz audyt SEO to głęboka analiza techniczna i semantyczna Twojej strony. Weryfikujemy m.in. architekturę linków, szybkość ładowania, responsywność (mobile-friendly), obecność błędów indeksacji, duplikację treści (duplicate content) oraz jakość backlinków. Na jego podstawie tworzymy dokładną listę wytycznych optymalizacyjnych dla Twojego zespołu lub wdrażamy je sami."
    },
    {
      question: "Czy pozycjonujecie lokalne biznesy?",
      answer: "Tak! Lokalne SEO to jedna z naszych specjalności. Optymalizujemy wizytówki Google Profil Firmy (GMB) i dbamy o zgodność NAP (Name, Address, Phone) w lokalnych katalogach. Dzięki temu firmy np. z Kielc, Warszawy czy Śląska zdobywają klientów bezpośrednio ze swojej najbliższej okolicy."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-24">
      {/* 1. Header Section */}
      <div className="container mx-auto px-4 mb-24 max-w-6xl">
        <div className="flex items-center gap-3 text-muted-foreground font-mono text-sm uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/uslugi" className="hover:text-primary transition-colors">Usługi</Link>
          <span className="text-white/20">/</span>
          <span className="text-primary">SEO</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight leading-tight">
              Dominuj w Google ze <span className="text-blue-500">Skutecznym SEO</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Zdobądź darmowy ruch organiczny i wyprzedź konkurencję w wynikach wyszukiwania. Przeprowadzamy zaawansowane audyty i realizujemy długoterminowe strategie wzrostu.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kontakt">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-blue-500 text-white hover:bg-blue-400 hover:scale-105 transition-transform">
                  Zamów audyt SEO
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 relative z-10 grid grid-cols-2 gap-4">
               {/* Tech stats visually represented */}
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">Top 3</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Nasze Cele</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <Search className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">+200%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Więcej Ruchu</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 col-span-2">
                  <BarChart className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-xl font-bold text-white mb-1">Strategie Data-Driven</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Bez zgadywania, same twarde dane</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Marquee Band */}
      <div className="w-[105vw] -ml-[2.5vw] bg-[#111] border-y border-white/5 py-4 mb-24 relative rotate-[-1deg] flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee opacity-70">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center text-white font-mono text-xl tracking-tight mx-4">
              Google <span className="mx-6 text-blue-500">/</span> 
              Audyt <span className="mx-6 text-blue-500">/</span> 
              Keywords <span className="mx-6 text-blue-500">/</span> 
              Local SEO <span className="mx-6 text-blue-500">/</span>
              Link Building <span className="mx-6 text-blue-500">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="container mx-auto px-4 max-w-6xl mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Kompleksowe Podejście do SEO
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pozycjonowanie to nie tylko słowa kluczowe. To technologia, UX, treść i autorytet. U nas otrzymujesz gwarancję działań zgodnych ze sztuką.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/50 transition-colors">
            <Search className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Audyt i Techniczne SEO</h3>
            <p className="text-muted-foreground leading-relaxed">
              Analizujemy każdy szczegół techniczny Twojej strony - od błędów indeksacji po parametry Core Web Vitals. Zapewniamy doskonały fundament pod wzrosty.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/50 transition-colors">
            <Target className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Content i Słowa Kluczowe</h3>
            <p className="text-muted-foreground leading-relaxed">
              Znajdujemy luki (keyword gaps) u konkurencji i przygotowujemy strategię treści, która odpowiada na prawdziwe intencje wyszukiwania (Search Intent) Twoich klientów.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-blue-500/50 transition-colors">
            <MapPin className="w-12 h-12 text-blue-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Lokalne SEO</h3>
            <p className="text-muted-foreground leading-relaxed">
              Optymalizujemy wizytówki Google i pomagamy dominować w lokalnych wynikach wyszukiwania. Idealne rozwiązanie dla biznesów stacjonarnych z obszaru Śląska czy Świętokrzyskiego.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Lokalizacja SEO i Informacje */}
      <div className="bg-[#111] border-y border-white/5 py-24 mb-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Więcej Klientów Z Twojego Regionu</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Nasze strategie świetnie sprawdzają się w działaniach ogólnopolskich, ale równie mocno koncentrujemy się na SEO Lokalnym. Niezależnie od tego, czy szukasz pozycjonowania firm ze <strong className="text-white">Śląska</strong>, walczysz o klienta w rejonie <strong className="text-white">woj. świętokrzyskiego (Kielce, Skarżysko)</strong>, czy chcesz opanować trudny rynek na <strong className="text-white">Mazowszu (Warszawa)</strong>. Dobierzemy plan działania optymalny dla Twojej branży.
          </p>
        </div>
      </div>

      {/* 4.5. Portfolio / Ostatnie realizacje */}
      <ServicePortfolioSection
        category="SEO"
        title="Nasze Realizacje SEO"
        description="Sprawdź wyniki, które wypracowaliśmy dla innych."
        accentColorClass="text-blue-500"
        accentBgClass="bg-blue-500/5"
      />

      {/* 5. FAQ Section */}
      <div className="container mx-auto px-4 max-w-3xl mb-32">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-12 text-center">
          Często zadawane pytania
        </h2>
        
        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <details key={index} className="group bg-[#111] border border-white/5 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg select-none">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-blue-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-white/5 mt-2">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map((item) => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })
        }}
      />
    </main>
  );
}
