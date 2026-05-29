"use client";

import { VoiceRecorderModal } from "@/components/VoiceRecorderModal";
import { HeroDashboardMockup } from "@/components/layout/HeroDashboardMockup";
import { InfiniteMarquee } from "@/components/layout/InfiniteMarquee";
import { ServicesBentoGrid } from "@/components/layout/ServicesBentoGrid";
import { ScrollRevealText } from "@/components/layout/ScrollRevealText";
import { PortfolioGrid } from "@/components/layout/PortfolioGrid";
import { CtaSection } from "@/components/layout/CtaSection";
import Link from "next/link";
import { ArrowRight, ChevronRight, Star, MousePointer2, Plus, Minus } from "lucide-react";
import { useState } from "react";

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border px-6 py-4 rounded-xl bg-card mb-4 cursor-pointer transition-colors hover:border-primary/50" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center text-lg font-bold hover:text-primary transition-colors">
        {question}
        {open ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5" />}
      </div>
      {open && (
        <div className="mt-4 text-muted-foreground text-base animate-in fade-in slide-in-from-top-2">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ile kosztuje stworzenie strony internetowej?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Zależy od zakresu — i to naprawdę uczciwa odpowiedź. Prosta strona wizytówkowa lub landing page zaczyna się od kilku tysięcy złotych i powstaje w 2–4 tygodnie. Rozbudowana aplikacja webowa, sklep e-commerce lub system z integracjami to budżet rzędu kilkunastu–kilkudziesięciu tysięcy i czas realizacji 2–4 miesiące. Zawsze dostajesz wycenę z dokładnym zakresem — zanim podpiszesz cokolwiek."
        }
      },
      {
        "@type": "Question",
        "name": "Jak długo trwa realizacja projektu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Proste strony i landing page'e — 2 do 4 tygodni. Systemy automatyzacji procesów — zazwyczaj pierwsze wdrożenie w ciągu 1–3 tygodni. Rozbudowane platformy i aplikacje — od 2 do 5 miesięcy. Każdy projekt ma harmonogram z konkretnymi kamieniami milowymi. Znasz termin zanim prace ruszą."
        }
      },
      {
        "@type": "Question",
        "name": "Czy zapewniacie utrzymanie po wdrożeniu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak — i to jest nasza specjalność. Nie zostawiamy projektu po wdrożeniu. Oferujemy pakiety abonamentowe SLA, w ramach których monitorujemy systemy, aktualizujemy oprogramowanie i reagujemy na błędy (zazwyczaj w ciągu 2 godzin). Twoja strona lub automatyzacja nie stanie w środku nocy bez naszej wiedzy."
        }
      },
      {
        "@type": "Question",
        "name": "Czy muszę być z Kielc lub Śląska, żeby z Wami współpracować?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nie. Pracujemy z firmami z całej Polski — i nie tylko. Audyt, wycena, projekt i wdrożenie — całość możemy przeprowadzić zdalnie. Jeśli jednak wolisz spotkanie twarzą w twarz, dojeżdżamy do klientów w Kielcach, Warszawie i aglomeracji śląskiej."
        }
      },
      {
        "@type": "Question",
        "name": "Co jeśli nie wiem, które procesy można zautomatyzować?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To właśnie nasza praca. Zaczynamy od bezpłatnego audytu procesów — rozmawiamy z Tobą o codziennych operacjach i sami wskazujemy, co pochłania najwięcej czasu i pieniędzy. Nie musisz być ekspertem od technologii. Wystarczy, że opiszesz nam swój dzień pracy."
        }
      }
    ]
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero Section (Roasti Style) */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center pt-40 md:pt-48 pb-16 md:pb-32 px-4">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[#050505] overflow-hidden">

          {/* Flat grid — widoczna na wszystkich ekranach */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(to right,rgba(255,85,0,0.35) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,85,0,0.35) 1px,transparent 1px)',
              backgroundSize: '3.5rem 3.5rem',
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)',
            }}
          />

          {/* 3D Grid Floor — tylko desktop */}
          <div
            className="hidden md:block absolute inset-x-[-50%] bottom-[-20%] h-[120%] origin-bottom opacity-40"
            style={{
              transform: 'rotateX(65deg)',
              maskImage: 'linear-gradient(to top, black 10%, transparent 75%)',
              WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 75%)',
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,85,0,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,85,0,0.25)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid-move" />
          </div>

          {/* Pomarańczowa poświata — centrum */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] md:w-[800px] md:h-[400px] bg-primary/15 blur-[80px] rounded-[100%] pointer-events-none" />

          {/* Fioletowy akcent — prawy dół */}
          <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[200px] bg-[#8B5CF6]/10 blur-[80px] rounded-[100%] pointer-events-none" />

          {/* Winieta góra/dół */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto space-y-8 z-10">
          <div className="relative">
            <h1 className="text-[42px] sm:text-6xl md:text-8xl lg:text-[110px] leading-[1.15] sm:leading-[1.1] md:leading-[0.9] font-heading font-bold tracking-tighter text-foreground">
              Zautomatyzujemy<br/>
              procesy w<br/>
              Twojej <span className="relative inline-block text-primary">
                firmie
                {/* Premium underline highlight */}
                <svg className="absolute -bottom-1 lg:-bottom-3 left-0 w-full h-4 lg:h-6 text-primary pointer-events-none" viewBox="0 0 200 20" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5,15 Q100,0 195,15" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200">
                    <animate attributeName="stroke-dashoffset" from="200" to="0" dur="1.2s" fill="freeze" begin="0.3s" />
                  </path>
                </svg>
              </span>
            </h1>

            {/* Tooltip 1 */}
            <div className="hidden lg:block absolute top-[-5%] -left-28 xl:-left-40 animate-in fade-in zoom-in-50 duration-700 [animation-delay:400ms] [animation-fill-mode:backwards]">
              <div className="flex items-center gap-2 bg-primary text-primary-foreground text-base tracking-normal font-sans font-bold px-6 py-3 rounded-2xl shadow-2xl rotate-[-6deg] whitespace-nowrap hover:scale-110 transition-transform duration-300">
                 <Star className="w-5 h-5 fill-current" />
                 5.0/5 · Google Reviews
                 <div className="absolute -bottom-2 right-6 w-4 h-4 bg-primary rotate-45" />
              </div>
            </div>

            {/* Tooltip 2 */}
            <div className="hidden lg:block absolute bottom-[5%] -right-24 xl:-right-32 animate-in fade-in zoom-in-50 duration-700 [animation-delay:600ms] [animation-fill-mode:backwards]">
              <div className="flex items-center bg-[#8B5CF6] text-white text-base tracking-normal font-sans font-bold px-6 py-3 rounded-2xl shadow-2xl rotate-[6deg] whitespace-nowrap hover:scale-110 transition-transform duration-300">
                 Reakcja &lt;2h
                 <MousePointer2 className="absolute -top-6 -left-4 w-8 h-8 text-[#8B5CF6] fill-[#8B5CF6] animate-bounce" />
              </div>
            </div>
          </div>
          
          <p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mt-8 relative z-10">
            Powtarzalne zadania zabijają Wasz czas — i pieniądze. Wdrażamy inteligentne automatyzacje oraz budujemy błyskawiczne strony internetowe, które razem pracują na wzrost Twojego biznesu 24/7. Bez rekrutacji. Bez nadgodzin. Bez błędów.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 relative z-10">
            <Link href="/uslugi" className="inline-flex h-12 items-center justify-center rounded-full bg-secondary border border-border px-8 font-bold text-foreground transition-all hover:bg-secondary/80 hover:scale-105">
              Zobacz, co automatyzujemy
            </Link>
            <VoiceRecorderModal />
          </div>
        </div>

        {/* Laptop Mockup */}
        <div className="w-full max-w-5xl mx-auto mt-32 relative perspective-[2000px]">
          {/* Animated Dashboard Mockup Component */}
          <HeroDashboardMockup />
        </div>
      </section>

      {/* 2. Infinite Marquee */}
      <section className="w-full">
         <InfiniteMarquee />
      </section>

      {/* 3. Process / How it works */}
      <section className="container px-4 py-16 md:py-32 text-center">
        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Od pomysłu do wdrożenia</p>
        <h2 className="mb-6">Prosto. Szybko. <span className="text-primary">Bez zbędnych formalności.</span></h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-20">Nie czekasz miesiącami na efekty. Nasz sprawdzony 3-etapowy proces pozwala uruchomić pierwsze automatyzacje lub stronę już w ciągu kilku tygodni.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 relative max-w-4xl mx-auto">
          {/* Step 1 */}
          <div className="flex flex-col items-center relative z-10 w-full md:w-1/3">
             <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center text-3xl font-heading font-bold text-primary mb-6 bg-background shadow-[0_0_30px_rgba(255,85,0,0.2)]">1</div>
             <h3 className="text-xl font-bold mb-2">Bezpłatny audyt</h3>
             <p className="text-muted-foreground text-sm">Spotykamy się (online lub u Ciebie), mapujemy procesy i wskazujemy, gdzie tracisz najwięcej czasu i pieniędzy. Zero zobowiązań.</p>
          </div>
          
          <svg className="hidden md:block w-32 h-12 text-muted-foreground/30 absolute left-[22%] top-10" fill="none" viewBox="0 0 100 20" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M0,10 Q50,20 100,10" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M90,0 L100,10 L90,20" />
          </svg>

          {/* Step 2 */}
          <div className="flex flex-col items-center relative z-10 w-full md:w-1/3">
             <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center text-3xl font-heading font-bold mb-6 bg-background">2</div>
             <h3 className="text-xl font-bold mb-2">Strategia & Design</h3>
             <p className="text-muted-foreground text-sm">Projektujemy architekturę systemu lub makiety strony. Dostajesz plan, wycenę i termin — zanim zatwierdzisz zlecenie.</p>
          </div>

          <svg className="hidden md:block w-32 h-12 text-muted-foreground/30 absolute right-[22%] top-10" fill="none" viewBox="0 0 100 20" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M0,10 Q50,0 100,10" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M90,0 L100,10 L90,20" />
          </svg>

          {/* Step 3 */}
          <div className="flex flex-col items-center relative z-10 w-full md:w-1/3">
             <div className="w-20 h-20 rounded-full border-2 border-border flex items-center justify-center text-3xl font-heading font-bold mb-6 bg-background">3</div>
             <h3 className="text-xl font-bold mb-2">Uruchomienie & Opieka</h3>
             <p className="text-muted-foreground text-sm">Kodujemy, testujemy i wdrażamy. Po starcie jesteśmy z Tobą — monitorujemy systemy i reagujemy zanim Ty w ogóle zauważysz problem.</p>
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="container px-4 py-16 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="mb-4">Wszystko, czego potrzebuje Twój biznes — pod jednym dachem.</h2>
            <p className="text-muted-foreground text-xl">Jeden partner. Pełna odpowiedzialność. Żadnych wymówek.</p>
          </div>
          <Link href="/uslugi" className="flex items-center gap-2 text-primary font-bold hover:underline mt-4 md:mt-0">
            Pełna oferta <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <ServicesBentoGrid />
      </section>

      {/* 4.5 Scroll Reveal Text */}
      <ScrollRevealText />

      {/* 5. Social Proof / Testimonials */}
      <section className="container px-4 py-16 md:py-32">
         <h2 className="text-center mb-16">Klienci <span className="text-primary">nie kłamią.</span></h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Mateusz Sobierski */}
            <a
              href="https://www.instagram.com/mateusz_sobierski/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors relative block"
            >
              <div className="flex gap-1 mb-6 text-primary">
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
              </div>
              <p className="text-lg italic mb-8">"Paweł to prawdziwy profesjonalista, jeśli chodzi o tworzenie stron, jak i całe podejście do tematu. Doskonale rozumie potrzeby klienta i rzeczy niemożliwe załatwia od ręki, a na cuda trzeba kilka dni poczekać."</p>
              <div className="flex items-center gap-4">
                <img src="/testimonials/mateusz-sobierski.jpg" alt="Mateusz Sobierski" className="w-12 h-12 rounded-full object-cover bg-secondary" />
                <div>
                  <p className="font-bold group-hover:text-primary transition-colors">Mateusz Sobierski</p>
                  <p className="text-sm text-muted-foreground">Marketingowiec</p>
                </div>
              </div>
            </a>

            {/* Agnieszka — formapsyche.pl */}
            <a
              href="https://formapsyche.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors relative block"
            >
              <div className="flex gap-1 mb-6 text-primary">
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
              </div>
              <p className="text-lg italic mb-8">"Dziękuję za pomoc. Po raz pierwszy spotkałam się w tej branży z tak szybkim i profesjonalnym podejściem. Będę polecać dalej."</p>
              <div className="flex items-center gap-4">
                <img src="https://formapsyche.pl/wp-content/uploads/2025/12/Aga-szara.webp" alt="Agnieszka" className="w-12 h-12 rounded-full object-cover bg-secondary" />
                <div>
                  <p className="font-bold group-hover:text-primary transition-colors">Agnieszka</p>
                  <p className="text-sm text-muted-foreground">formapsyche.pl</p>
                </div>
              </div>
            </a>

            {/* Krystian — lidmir.pl */}
            <a
              href="https://lidmir.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors relative block"
            >
              <div className="flex gap-1 mb-6 text-primary">
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
              </div>
              <p className="text-lg italic mb-8">"Pełen profesjonalizm! 77systems stworzyło dla mnie nowoczesną stronę internetową, która realnie zwiększyła liczbę zapytań i zamówień. Strona szybka, responsywna i dobrze widoczna w Google. Widać duże doświadczenie w SEO i marketingu internetowym. Zdecydowanie polecam!"</p>
              <div className="flex items-center gap-4">
                <img src="https://lidmir.pl/wp-content/uploads/2026/04/logo-lidmir.png" alt="lidmir.pl" className="w-12 h-12 rounded-full object-cover bg-secondary p-1" />
                <div>
                  <p className="font-bold group-hover:text-primary transition-colors">Krystian</p>
                  <p className="text-sm text-muted-foreground">lidmir.pl</p>
                </div>
              </div>
            </a>

         </div>
         <div className="mt-12 text-center">
           <a
             href="https://maps.app.goo.gl/HBea9AgEoFnunDRN8"
             target="_blank"
             rel="noopener noreferrer"
             className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest"
           >
             Zobacz nasze opinie na Google Maps <ArrowRight className="ml-2 w-4 h-4" />
           </a>
         </div>
      </section>

      {/* 6. Portfolio Snippet */}
      <PortfolioGrid />

      {/* 7. Blog Snippet */}
      <section className="container px-4 py-16 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="mb-4">Wiedza, którą możesz zastosować jutro.</h2>
            <p className="text-muted-foreground text-xl">Bez lania wody. Tylko konkretne porady o automatyzacji, AI i tworzeniu stron dla firm takich jak Twoja.</p>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-primary font-bold hover:underline mt-4 md:mt-0">
            Wszystkie artykuły <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/blog/ai-w-biznesie" className="group border border-border rounded-3xl p-6 bg-card hover:border-primary/50 transition-colors">
            <p className="text-sm text-muted-foreground mb-4">12 Maj 2026</p>
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Jak AI zmienia współczesny e-commerce?</h3>
            <span className="text-primary font-medium text-sm flex items-center gap-1">Czytaj <ChevronRight className="w-4 h-4"/></span>
          </Link>
          <Link href="/blog/nextjs-14" className="group border border-border rounded-3xl p-6 bg-card hover:border-primary/50 transition-colors">
            <p className="text-sm text-muted-foreground mb-4">05 Maj 2026</p>
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Przyszłość tworzenia aplikacji w Next.js</h3>
            <span className="text-primary font-medium text-sm flex items-center gap-1">Czytaj <ChevronRight className="w-4 h-4"/></span>
          </Link>
          <Link href="/blog/chmura" className="group border border-border rounded-3xl p-6 bg-card hover:border-primary/50 transition-colors">
            <p className="text-sm text-muted-foreground mb-4">28 Kwi 2026</p>
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">Bezpieczeństwo w infrastrukturze chmurowej</h3>
            <span className="text-primary font-medium text-sm flex items-center gap-1">Czytaj <ChevronRight className="w-4 h-4"/></span>
          </Link>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="container max-w-4xl px-4 py-16 md:py-32">
        <div className="text-center mb-16">
          <h2 className="mb-6">Masz pytania? <span className="text-primary">Mamy odpowiedzi.</span></h2>
          <p className="text-xl text-muted-foreground">Jeśli nie znajdziesz odpowiedzi poniżej — napisz lub zadzwoń. Odpiszemy tego samego dnia.</p>
        </div>

        <div className="w-full">
          <FAQItem
            question="Ile kosztuje stworzenie strony internetowej?"
            answer="Zależy od zakresu — i to naprawdę uczciwa odpowiedź. Prosta strona wizytówkowa lub landing page zaczyna się od kilku tysięcy złotych i powstaje w 2–4 tygodnie. Rozbudowana aplikacja webowa, sklep e-commerce lub system z integracjami to budżet rzędu kilkunastu–kilkudziesięciu tysięcy i czas realizacji 2–4 miesiące. Zawsze dostajesz wycenę z dokładnym zakresem — zanim podpiszesz cokolwiek."
          />
          <FAQItem
            question="Jak długo trwa realizacja projektu?"
            answer="Proste strony i landing page'e — 2 do 4 tygodni. Systemy automatyzacji procesów — zazwyczaj pierwsze wdrożenie w ciągu 1–3 tygodni. Rozbudowane platformy i aplikacje — od 2 do 5 miesięcy. Każdy projekt ma harmonogram z konkretnymi kamieniami milowymi. Znasz termin zanim prace ruszą."
          />
          <FAQItem
            question="Czy zapewniacie utrzymanie po wdrożeniu?"
            answer="Tak — i to jest nasza specjalność. Nie zostawiamy projektu po wdrożeniu. Oferujemy pakiety abonamentowe SLA, w ramach których monitorujemy systemy, aktualizujemy oprogramowanie i reagujemy na błędy (zazwyczaj w ciągu 2 godzin). Twoja strona lub automatyzacja nie stanie w środku nocy bez naszej wiedzy."
          />
          <FAQItem
            question="Czy muszę być z Kielc lub Śląska, żeby z Wami współpracować?"
            answer="Nie. Pracujemy z firmami z całej Polski — i nie tylko. Audyt, wycena, projekt i wdrożenie — całość możemy przeprowadzić zdalnie. Jeśli jednak wolisz spotkanie twarzą w twarz, dojeżdżamy do klientów w Kielcach, Warszawie i aglomeracji śląskiej."
          />
          <FAQItem
            question="Co jeśli nie wiem, które procesy można zautomatyzować?"
            answer="To właśnie nasza praca. Zaczynamy od bezpłatnego audytu procesów — rozmawiamy z Tobą o codziennych operacjach i sami wskazujemy, co pochłania najwięcej czasu i pieniędzy. Nie musisz być ekspertem od technologii. Wystarczy, że opiszesz nam swój dzień pracy."
          />
        </div>
      </section>

      {/* 9. Final CTA */}
      <CtaSection />
      
    </main>
  );
}
