import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  MonitorSmartphone, 
  PenTool, 
  LayoutDashboard, 
  LayoutTemplate, 
  Brush, 
  Monitor,
  ClipboardList,
  Calendar,
  MessageSquare,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://77systems.eu/" },
    { "@type": "ListItem", "position": 2, "name": "Usługi", "item": "https://77systems.eu/uslugi" },
  ],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* 1. Header Section */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white mb-6 tracking-tight">
          Nasze Usługi
        </h1>
        <div className="flex items-center justify-center gap-3 text-muted-foreground font-mono text-sm uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="text-white/20">/</span>
          <span className="text-primary">Usługi</span>
        </div>
      </div>

      {/* 2. Marquee Band */}
      <div className="w-[105vw] -ml-[2.5vw] bg-primary py-4 mb-32 relative rotate-[-2deg] border-y border-primary/20 flex overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center text-black font-black uppercase text-2xl tracking-tight mx-4">
              Usługi <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span> 
              Konsultacje <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span> 
              Wdrożenie <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span> 
              Optymalizacja <span className="mx-6 text-4xl leading-none font-normal opacity-50">*</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* 3. Features Grid */}
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4 relative inline-block">
            <span className="absolute -top-2 -left-4 w-2 h-2 border-t border-l border-primary/50" />
            <span className="absolute -bottom-2 -right-4 w-2 h-2 border-b border-r border-primary/50" />
            Co robimy
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">
            Usługi, które dostarczamy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-40 max-w-6xl mx-auto">
          {[
            { title: "Web development", slug: "web-development", icon: LayoutTemplate, desc: "Projektowanie i kodowanie nowoczesnych, szybkich i responsywnych stron internetowych oraz aplikacji." },
            { title: "Automatyzacje & AI", slug: "automatyzacje-ai", icon: LayoutDashboard, desc: "Zoptymalizuj procesy w swojej firmie oszczędzając czas i zasoby z pomocą sztucznej inteligencji." },
            { title: "SEO", slug: "seo", icon: MonitorSmartphone, desc: "Zwiększ widoczność swojej strony w wynikach wyszukiwania i zdobywaj wartościowy ruch organiczny." },
            { title: "Social media", slug: "social-media", icon: Brush, desc: "Zbuduj silną społeczność wokół swojej marki i skutecznie docieraj do nowych klientów." },
          ].map((item, i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-[2rem] p-8 hover:bg-[#151515] hover:border-primary/30 transition-all group flex flex-col">
              <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-grow">{item.desc}</p>
              <Link href={`/uslugi/${item.slug}`} className="inline-flex items-center text-sm font-bold text-white group-hover:text-primary transition-colors mt-auto">
                Dowiedz się więcej <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* 4. Process Section */}
        <div className="mb-40">
          <div className="text-center mb-24">
            <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4 relative inline-block">
              Jak działamy
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
              Prosty proces, świetne wyniki
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Szanujemy Twój czas. Nasz proces współpracy jest całkowicie transparentny i zaprojektowany po to, aby jak najszybciej dowieźć wartość.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 max-w-6xl mx-auto relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/5 border-t border-dashed border-white/10" />
            
            {[
              { step: "01", title: "Wypełniasz formularz", icon: ClipboardList, desc: "Przesyłasz nam krótki opis swojego pomysłu lub problemu w formularzu kontaktowym." },
              { step: "02", title: "Umawiamy spotkanie", icon: Calendar, desc: "Organizujemy szybki call, aby poznać się bliżej i zmapować Twoje potrzeby biznesowe." },
              { step: "03", title: "Omawiamy sytuację", icon: MessageSquare, desc: "Analizujemy obecny stan Twojego biznesu i ustalamy wąskie gardła oraz cele." },
              { step: "04", title: "Dobieramy rozwiązania", icon: Lightbulb, desc: "Proponujemy optymalny plan działania, stack technologiczny i przechodzimy do realizacji." },
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group px-4">
                <div className="w-24 h-24 bg-[#111] rounded-full border border-white/10 flex items-center justify-center mb-6 relative group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(255,85,0,0.2)] transition-all">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black font-black text-xs">
                    {item.step}
                  </div>
                  <item.icon className="w-10 h-10 text-white group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. CTA Section with pills */}
        <div className="relative bg-[#111] rounded-[3rem] p-12 md:p-24 text-center overflow-hidden border border-white/5 max-w-5xl mx-auto">
          {/* Background decorative pills */}
          <div className="absolute inset-0 pointer-events-none opacity-50">
            <div className="absolute top-[10%] left-[5%] bg-primary/20 text-primary border border-primary/30 px-5 py-2 rounded-full text-xs font-mono -rotate-12 blur-[1px]">Web Design</div>
            <div className="absolute top-[20%] right-[10%] bg-purple-500/20 text-purple-400 border border-purple-500/30 px-5 py-2 rounded-full text-xs font-mono rotate-12 blur-[1px]">Automatyzacje</div>
            <div className="absolute bottom-[20%] left-[10%] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-6 py-2 rounded-full text-xs font-mono rotate-6 blur-[1px]">React / Next.js</div>
            <div className="absolute bottom-[15%] right-[5%] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-5 py-2 rounded-full text-xs font-mono -rotate-6 blur-[1px]">AI / ML</div>
            <div className="absolute top-[40%] left-[2%] bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-2 rounded-full text-xs font-mono -rotate-[24deg] blur-[1px]">SEO</div>
            <div className="absolute top-[45%] right-[2%] bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-5 py-2 rounded-full text-xs font-mono rotate-[15deg] blur-[1px]">Figma</div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 leading-tight">
              Stwórzmy razem <span className="text-primary block mt-2">Niesamowity Projekt!</span>
            </h2>
            <Link href="/kontakt">
              <Button size="lg" className="rounded-full px-12 py-8 text-lg font-bold shadow-[0_0_40px_rgba(255,85,0,0.4)] hover:scale-105 transition-transform bg-primary text-black hover:bg-primary/90">
                Skontaktuj się z nami
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
