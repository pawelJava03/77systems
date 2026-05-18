import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="container px-4 py-16 md:py-32">
      <div className="relative w-full rounded-[3rem] bg-[#111] overflow-hidden flex flex-col items-center justify-center text-center py-24 md:py-32 px-4 border border-border">
        {/* Background huge text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
          <span className="text-[25vw] font-heading font-black leading-none text-primary whitespace-nowrap tracking-tighter">
            START
          </span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black uppercase leading-[1.1] md:leading-[1.1] tracking-tight">
            <span className="text-white block">Przestań marzyć,</span>
            <span className="text-primary block italic">Zacznij budować.</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-medium">
            Każdy miesiąc bez automatyzacji to czas i pieniądze, których nie odzyskasz. Porozmawiajmy — bezpłatnie — o tym, co możemy zrobić dla Twojej firmy. Konkrety od pierwszej rozmowy.
          </p>

          <div className="pt-8">
            <Link
              href="/kontakt"
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-8 text-xs md:text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-primary/80 shadow-[0_0_30px_rgba(255,85,0,0.3)]"
            >
              Umów bezpłatną konsultację <ArrowRight className="ml-3 w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
