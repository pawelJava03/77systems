import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bot, Cpu, Gauge, Clock, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';
import { ServicePortfolioSection } from '@/components/sections/ServicePortfolioSection';

export const metadata: Metadata = {
  title: 'Automatyzacje & AI dla Firm (Śląsk, Mazowsze, Świętokrzyskie) | 77systems',
  description: 'Wdrażamy sztuczną inteligencję i automatyzujemy procesy biznesowe. Oszczędzaj czas z dedykowanymi asystentami AI i systemami automatyzacji. Zobacz case study!',
  keywords: 'automatyzacja procesów biznesowych, wdrażanie AI w firmie, sztuczna inteligencja dla firm, automatyzacja zadań, asystenci ai, czatboty ai, n8n, make, zapier, automatyzacje kielce, automatyzacje warszawa, ai śląsk',
  alternates: {
    canonical: 'https://77systems.eu/uslugi/automatyzacje-ai',
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://77systems.eu/" },
    { "@type": "ListItem", "position": 2, "name": "Usługi", "item": "https://77systems.eu/uslugi" },
    { "@type": "ListItem", "position": 3, "name": "Automatyzacje & AI", "item": "https://77systems.eu/uslugi/automatyzacje-ai" },
  ],
};

export default function AutomationsAIPage() {
  const faqList = [
    {
      question: "Od czego zacząć automatyzację procesów w mojej firmie?",
      answer: "Rozpoczynamy od darmowego audytu Twoich codziennych zadań. Szukamy powtarzalnych, nużących procesów operacyjnych (przepisywanie danych, fakturowanie, obsługa zapytań), które pochłaniają najwięcej czasu. Następnie mapujemy je w środowiskach takich jak n8n czy Make i integrujemy z AI."
    },
    {
      question: "Czym są dedykowani Asystenci AI i jak pomagają?",
      answer: "Dedykowani asystenci to chatboty oparte o zaawansowane modele językowe (np. GPT-4o, Claude 3), które są trenowane wyłącznie na wewnętrznej wiedzy Twojej firmy. Mogą działać jako obsługa klienta na Twojej stronie internetowej, lub jako asystent dla pracowników pomagający w szybkim przeszukiwaniu dokumentacji firmowej."
    },
    {
      question: "Czy automatyzacje są bezpieczne dla danych firmy?",
      answer: "Bezpieczeństwo to absolutny priorytet. Wykorzystujemy sprawdzone rozwiązania, posiadające certyfikaty SOC2/ISO (np. Make.com). Przy bardzo rygorystycznych politykach wdrażamy open-source'owe środowisko n8n bezpośrednio na wewnętrznych serwerach Twojej firmy, odcinając dane od chmury zewnętrznej."
    },
    {
      question: "Ile czasu faktycznie oszczędzimy po wdrożeniu?",
      answer: "Średnio, poprawnie zidentyfikowany i zautomatyzowany proces uwalnia od 10 do nawet 40 godzin miesięcznie w skali jednego działu. To czas, który pracownicy mogą przeznaczyć na pracę kreatywną i strategiczną, zamiast na odtwórcze wklepywanie rekordów do arkuszy kalkulacyjnych."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* 1. Header Section */}
      <div className="container mx-auto px-4 mb-24 max-w-6xl">
        <div className="flex items-center gap-3 text-muted-foreground font-mono text-sm uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <Link href="/uslugi" className="hover:text-primary transition-colors">Usługi</Link>
          <span className="text-white/20">/</span>
          <span className="text-primary">Automatyzacje & AI</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight leading-tight">
              Wdróż <span className="text-primary">AI</span> i Zautomatyzuj Swój Biznes
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Sztuczna inteligencja to nie przyszłość, to teraźniejszość. Optymalizujemy procesy biznesowe uwalniając tysiące godzin rocznie Twoich pracowników, by mogli skupić się na tym co ważne.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kontakt">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_30px_rgba(255,85,0,0.3)] bg-primary text-white hover:bg-primary/90 hover:scale-105 transition-transform">
                  Umów darmowy audyt
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 relative z-10 grid grid-cols-2 gap-4">
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <Clock className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">-40<span className="text-primary">%</span></p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Czasu na rutynę</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <Gauge className="w-8 h-8 text-green-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">24<span className="text-primary">/7</span></p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Dostępność AI</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 col-span-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Bot className="w-24 h-24" />
                  </div>
                  <Cpu className="w-8 h-8 text-primary mb-4 relative z-10" />
                  <p className="text-xl font-bold text-white mb-1 relative z-10">GPT-4o, Claude, n8n, Make</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2 relative z-10">Technologie napędzające transformację</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Marquee Band */}
      <div className="w-[105vw] -ml-[2.5vw] bg-[#111] border-y border-white/5 py-4 mb-24 relative rotate-[1deg] flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee opacity-70">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center text-white font-mono text-xl tracking-tight mx-4">
              OpenAI <span className="mx-6 text-primary">/</span> 
              Anthropic <span className="mx-6 text-primary">/</span> 
              n8n <span className="mx-6 text-primary">/</span> 
              Make.com <span className="mx-6 text-primary">/</span>
              Zapier <span className="mx-6 text-primary">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="container mx-auto px-4 max-w-6xl mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Jak skalujemy Twój biznes?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Wdrażanie sztucznej inteligencji to nie dodawanie modnych gadżetów. To twarda, systemowa architektura uodparniająca firmę na koszty operacyjne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-primary/50 transition-colors">
            <Cpu className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Integracje Systemów</h3>
            <p className="text-muted-foreground leading-relaxed">
              Łączymy oprogramowanie (CRM, ERP, mailing, księgowość), tworząc szczelną magistralę wymiany danych. System A automatycznie wymienia się informacjami z systemem B bez ręcznego przeklikiwania i błędów ludzkich.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-primary/50 transition-colors">
            <Sparkles className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Asystenci AI z Wiedzą Firmy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Budujemy chatboty wewnętrzne (np. do pomocy pracownikom w dziale HR/Supportu) zasilane tysiącami stron Twojej dokumentacji wewnętrznej. Błyskawiczna analiza i inteligentne odpowiedzi 24/7.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-primary/50 transition-colors">
            <Gauge className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Zwinne Skalowanie (SaaS)</h3>
            <p className="text-muted-foreground leading-relaxed">
              Do automatyzacji wykorzystujemy infrastrukturę "no-code/low-code" taką jak Make czy n8n. Pozwala to na skrócenie czasu wdrożenia i ewentualnych poprawek z miesięcy do dosłownie godzin, diametralnie obniżając koszty.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Lokalizacja SEO i Informacje */}
      <div className="bg-[#111] border-y border-white/5 py-24 mb-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Wdrażamy innowacje w sercu Polski</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Nasze systemy automatyzacji pracują dla prężnie rozwijających się przedsiębiorstw w <strong className="text-white">województwa mazowieckim (Warszawa)</strong>, firm produkcyjnych na terenie <strong className="text-white">Śląska</strong> (w tym aglomeracji takich jak Katowice) oraz prężnie rozwijających się biznesów z rodzimego <strong className="text-white">Świętokrzyskiego</strong> (Kielce). Dostarczamy bezpieczne wdrożenia cyfrowe na odległość lub spotykamy się w siedzibie Twojej firmy, by dokładnie zgłębić zawiłości Twoich procesów.
          </p>
        </div>
      </div>

      {/* 4.5. Portfolio / Ostatnie realizacje */}
      <ServicePortfolioSection 
        category="Automatyzacje & AI"
        title="Ostatnie realizacje AI"
        description="Zobacz, jak realnie uwolniliśmy czas naszych klientów."
        accentColorClass="text-primary"
        accentBgClass="bg-primary/5"
        showCtaBox={true}
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
                <ChevronDown className="w-5 h-5 text-primary transition-transform group-open:rotate-180" />
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
