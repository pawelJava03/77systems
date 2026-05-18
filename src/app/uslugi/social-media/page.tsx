import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Users, Smartphone, TrendingUp, ChevronDown, ArrowRight } from 'lucide-react';
import { ServicePortfolioSection } from '@/components/sections/ServicePortfolioSection';

export const metadata: Metadata = {
  title: 'Prowadzenie Social Media (Śląsk, Świętokrzyskie, Warszawa) | 77systems',
  description: 'Skuteczne prowadzenie profili social media: Facebook, Instagram, TikTok, LinkedIn. Docieraj do nowych klientów z regionów takich jak Kielce, Warszawa czy Śląsk.',
  keywords: 'prowadzenie social media, obsługa social media, marketing w mediach społecznościowych, agencja social media, social media śląsk, social media warszawa, social media kielce, meta ads, facebook ads, instagram dla firm',
  alternates: {
    canonical: 'https://77systems.eu/uslugi/social-media',
  }
};

export default function SocialMediaPage() {
  const faqList = [
    {
      question: "Jakie kanały social media obsługujecie?",
      answer: "Prowadzimy działania we wszystkich najważniejszych platformach: Facebook (Meta), Instagram, TikTok oraz LinkedIn (B2B). Dobieramy kanał do specyfiki Twojego biznesu i demografii docelowej grupy odbiorców."
    },
    {
      question: "Kto tworzy materiały foto i wideo na moje profile?",
      answer: "Jeśli prowadzisz działalność na terenie woj. świętokrzyskiego (Kielce), śląskiego (np. Katowice) lub mazowieckiego (Warszawa) możemy przyjechać i wykonać sesję u Ciebie. Możesz również przesyłać nam własne surowe materiały, z których my następnie montujemy np. rolki (Reels/TikTok) lub tworzymy grafiki."
    },
    {
      question: "Czy prowadzicie również płatne kampanie (Meta Ads)?",
      answer: "Oczywiście. Poza tworzeniem postów organicznych, budujemy i optymalizujemy kampanie płatne z wykorzystaniem Meta Ads. Skupiamy się na realnych konwersjach (np. zakupach, leadach), a nie tylko na 'pustych' polubieniach. Odpowiednie targetowanie, zwłaszcza w kampaniach lokalnych, to klucz do zysku."
    },
    {
      question: "W jakim czasie widać efekty z działań w Social Mediach?",
      answer: "Działania w Social Media przynoszą dwojakie efekty. Organiczne budowanie wizerunku i społeczności to proces kilkumiesięczny, natomiast wsparcie profilu poprzez przemyślane kampanie płatne potrafi wygenerować wartościowe leady lub sprzedaż już w pierwszym miesiącu od startu."
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
          <span className="text-primary">Social Media</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight leading-tight">
              Angażujące <span className="text-pink-500">Social Media</span> dla Twojej Marki
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Od strategii do wiralowych Rolek. Opowiemy historię Twojej firmy i przyciągniemy lojalnych klientów poprzez przemyślane treści i skuteczne reklamy płatne.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/kontakt">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold shadow-[0_0_30px_rgba(236,72,153,0.3)] bg-pink-500 text-white hover:bg-pink-400 hover:scale-105 transition-transform">
                  Rozwiń z nami profile
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="bg-[#111] border border-white/10 rounded-[2rem] p-8 relative z-10 grid grid-cols-2 gap-4">
               {/* Tech stats visually represented */}
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <Heart className="w-8 h-8 text-pink-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">Marka</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Silny wizerunek</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
                  <TrendingUp className="w-8 h-8 text-blue-500 mb-4" />
                  <p className="text-3xl font-bold text-white mb-1">ROAS</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Opłacalne Reklamy</p>
               </div>
               <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 col-span-2">
                  <Smartphone className="w-8 h-8 text-purple-500 mb-4" />
                  <p className="text-xl font-bold text-white mb-1">Vertical Video (Rolki / TikTok)</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Formaty, które przyciągają uwagę</p>
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
              Instagram <span className="mx-6 text-pink-500">/</span> 
              TikTok <span className="mx-6 text-pink-500">/</span> 
              Facebook <span className="mx-6 text-pink-500">/</span> 
              Meta Ads <span className="mx-6 text-pink-500">/</span>
              LinkedIn <span className="mx-6 text-pink-500">/</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Values */}
      <div className="container mx-auto px-4 max-w-6xl mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Jak Tworzymy Angażujące Społeczności
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Social Media to nie słup ogłoszeniowy. Opracowujemy plany, angażujemy użytkowników i łączymy komunikację naturalną ze sponsorowaną.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-pink-500/50 transition-colors">
            <Heart className="w-12 h-12 text-pink-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Autentyczna Komunikacja</h3>
            <p className="text-muted-foreground leading-relaxed">
              Pomagamy ukazać 'ludzką twarz' biznesu. Budujemy formaty, które nie tylko informują, ale i bawią, pokazując kulisy Twojej działalności, co znacząco zwiększa zaufanie.
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-pink-500/50 transition-colors">
            <Share2 className="w-12 h-12 text-pink-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Tworzenie Treści & Wideo</h3>
            <p className="text-muted-foreground leading-relaxed">
              Zajmujemy się copywritingiem, kreacją grafik i montażem dynamicznych Rolek/TikToków. Twój kanał stanie się nowoczesny i dostosowany do trendów (np. dobór popularnej muzyki).
            </p>
          </div>
          <div className="bg-[#111] border border-white/5 p-8 rounded-[2rem] hover:border-pink-500/50 transition-colors">
            <Users className="w-12 h-12 text-pink-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">Meta Ads i Promocja</h3>
            <p className="text-muted-foreground leading-relaxed">
              Nawet najlepszy post bez wsparcia zgaśnie. Wykorzystujemy budżety reklamowe do chirurgicznego targetowania klientów w Twoim regionie i remarketingu.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Lokalizacja SEO i Informacje */}
      <div className="bg-[#111] border-y border-white/5 py-24 mb-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Lokalny Wizerunek Twojej Firmy</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Sukces w social mediach budujemy od podstaw lokalnie, by następnie uderzyć w szersze rynki. Wspieramy biznesy i restauracje ze <strong className="text-white">Śląska</strong>, firmy usługowe z <strong className="text-white">Kielc (Świętokrzyskie)</strong> oraz korporacje z <strong className="text-white">Warszawy (Mazowieckie)</strong>. Docieramy reklamą dokładnie do tych dzielnic i ulic, z których chcesz zyskiwać klientów, optymalizując Twój lokalny rozwój (Local Marketing).
          </p>
        </div>
      </div>

      {/* 4.5. Portfolio / Ostatnie realizacje */}
      <ServicePortfolioSection 
        category="Social media"
        title="Zrealizowane Kampanie"
        description="Zobacz efekty naszej pracy na platformach Facebook, Instagram czy TikTok."
        accentColorClass="text-pink-500"
        accentBgClass="bg-pink-500/5"
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
                <ChevronDown className="w-5 h-5 text-pink-500 transition-transform group-open:rotate-180" />
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
