import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, MonitorSmartphone, LayoutTemplate, Zap, ShieldCheck, ChevronDown, ArrowRight } from 'lucide-react';
import { ServicePortfolioSection } from '@/components/sections/ServicePortfolioSection';

export const metadata: Metadata = {
  title: 'Tworzenie Stron Internetowych (Warszawa, Śląsk, Kielce) | 77systems',
  description: 'Zbuduj ultraszybką stronę na WordPress lub aplikację webową z React/Next.js. Gwarancja 12 miesięcy, doskonałe SEO i Core Web Vitals. Działamy w Świętokrzyskiem, na Śląsku i Mazowszu.',
  keywords: 'tworzenie stron internetowych, projektowanie stron www, strony internetowe Warszawa, strony internetowe Kielce, agencja interaktywna śląsk, aplikacje next.js, strony na wordpress, optymalizacja core web vitals, gwarancja na strony internetowe, react, next.js, javascript',
  alternates: {
    canonical: 'https://77systems.eu/uslugi/web-development',
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://77systems.eu/" },
    { "@type": "ListItem", "position": 2, "name": "Usługi", "item": "https://77systems.eu/uslugi" },
    { "@type": "ListItem", "position": 3, "name": "Web Development", "item": "https://77systems.eu/uslugi/web-development" },
  ],
};

export default function WebDevelopmentPage() {
  const faqList = [
    {
      question: "W jakich technologiach tworzycie strony internetowe?",
      answer: "Specjalizujemy się w nowoczesnym stosie technologicznym opartym o JavaScript: React oraz Next.js, co pozwala na tworzenie niesamowicie szybkich i bezpiecznych aplikacji webowych (tzw. Jamstack). Wykorzystujemy również system CMS WordPress, jeśli zależy Ci na swobodnym zarządzaniu treścią bez ingerencji w kod źródłowy, wsparty lekkim motywem lub bezgłową (headless) architekturą."
    },
    {
      question: "Czym jest gwarancja jakości i na jak długo ją otrzymam?",
      answer: "Standardowo udzielamy 12-miesięcznej gwarancji SLA (Service Level Agreement) na każdy oddany projekt internetowy. Oznacza to, że przez pełny rok pokrywamy koszty napraw wszystkich ewentualnych błędów czy luk bezpieczeństwa, które mogą pojawić się po wdrożeniu. Gwarancję tę można przedłużyć o kolejne lata w ramach pakietu stałej opieki technicznej."
    },
    {
      question: "Czy strona będzie widoczna w wyszukiwarce Google (SEO)?",
      answer: "Absolutnie tak. Optymalizacja pod kątem SEO On-Page oraz wskaźników Core Web Vitals (prędkość ładowania, stabilność wizualna) to nasz absolutny standard. Oddając projekt upewniamy się, że Twoja strona internetowa od razu trafia z czystym kontem do topowych pozycji wyszukiwania w Google. Nie oddajemy stron ładujących się dłużej niż 2 sekundy."
    },
    {
      question: "Gdzie działacie geograficznie?",
      answer: "Działamy w 100% cyfrowo dla firm z całego świata. Fizycznie jesteśmy mocno zlokalizowani wokół rynków województwa świętokrzyskiego (Kielce), śląskiego (Katowice, Gliwice) oraz mazowieckiego (Warszawa). Chętnie spotkamy się z Tobą na wideorozmowie lub na żywo w powyższych regionach."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* 1. Header Section */}
      <div className="container mx-auto px-4 mb-24 max-w-6xl">
        <div className="flex items-center gap-3 text-muted-foreground font-mono text-sm uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-green-500 transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/uslugi" className="hover:text-green-500 transition-colors">Usługi</Link>
          <span className="text-white/20">/</span>
          <span className="text-green-500">Web Development</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight leading-tight">
              Tworzenie Stron <span className="text-green-500">WWW</span> i Aplikacji Webowych
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Nowoczesny kod dla biznesu, który nie ma czasu na wolne strony. Specjalizujemy się w technologiach React, Next.js i szybkim środowisku WordPress. 
              Zbudujmy coś niesamowitego!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kontakt">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_30px_rgba(34,197,94,0.3)] bg-green-500 text-black hover:bg-green-400 hover:scale-105 transition-transform">
                  Rozpocznij projekt
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 relative z-10 grid grid-cols-2 gap-4">
               {/* Tech stats visually represented */}
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">99<span className="text-green-500">/100</span></p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Google PageSpeed</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">12<span className="text-green-500"> msc.</span></p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Gwarancji na start</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 col-span-2">
                  <MonitorSmartphone className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-xl font-bold text-white mb-1">React, Next.js, WordPress</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Dedykowany stos technologiczny</p>
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
              React <span className="mx-6 text-green-500">/</span> 
              Next.js <span className="mx-6 text-green-500">/</span> 
              TypeScript <span className="mx-6 text-green-500">/</span> 
              WordPress <span className="mx-6 text-green-500">/</span>
              TailwindCSS <span className="mx-6 text-green-500">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="container mx-auto px-4 max-w-6xl mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Gwarancja i Jakość w Standardzie
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nasze strony nie tylko wyglądają pięknie, ale przede wszystkim zarabiają. Piszemy kod oparty o twarde wytyczne wyszukiwarek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-green-500/50 transition-colors">
            <LayoutTemplate className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Core Web Vitals na zielono</h3>
            <p className="text-muted-foreground leading-relaxed">
              Optymalizujemy wagi obrazów, stosujemy nowoczesne formaty WebP/AVIF oraz wymuszamy leniwe ładowanie. Twoja strona będzie ładować się w mgnieniu oka, gwarantując niskie wskaźniki odrzuceń.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-green-500/50 transition-colors">
            <ShieldCheck className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">12-miesięczna gwarancja</h3>
            <p className="text-muted-foreground leading-relaxed">
              Bierzemy pełną odpowiedzialność za nasz kod. Udzielamy solidnej, rocznej gwarancji technicznej SLA. Dowolny bug występujący z naszej winy naprawiany jest bezkosztowo i priorytetowo.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-green-500/50 transition-colors">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Podstawy SEO Wbudowane</h3>
            <p className="text-muted-foreground leading-relaxed">
              Poprawna struktura H1-H6, audyt techniczny przed wypuszczeniem w sieć i dodanie znaczników Schema.org to fundamenty, od których nie pobieramy ukrytych i dodatkowych prowizji.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Lokalizacja SEO i Informacje */}
      <div className="bg-[#111] border-y border-white/5 py-24 mb-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Wspieramy biznes w całej Polsce</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Niezależnie od tego, czy prowadzisz biznes na <strong className="text-white">Śląsku</strong> (w tym Katowice czy Gliwice), potrzebujesz cyfrowej reprezentacji z <strong className="text-white">województwa świętokrzyskiego</strong> (np. strony dla firm w Kielcach), czy obsługujesz globalnych klientów z <strong className="text-white">Mazowsza i Warszawy</strong>. Nasz zespół działa w pełni zdalnie, dostarczając innowacje bezpośrednio pod Twoje wirtualne drzwi, dopasowane do Twojego lokalnego rynku.
          </p>
        </div>
      </div>

      {/* 4.5. Portfolio / Ostatnie realizacje */}
      <ServicePortfolioSection 
        category="Strony internetowe"
        title="Ostatnie realizacje"
        description="Zobacz, jak pomagamy innym firmom budować silną obecność w internecie."
        accentColorClass="text-green-500"
        accentBgClass="bg-green-500/5"
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
                <ChevronDown className="w-5 h-5 text-green-500 transition-transform group-open:rotate-180" />
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
