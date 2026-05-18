import { Zap } from "lucide-react";

const SERVICES = [
  "Automatyzacje",
  "Strony internetowe",
  "SEO",
  "Media społecznościowe",
  "Analiza procesów w firmie"
];

// Powielamy tablicę kilka razy, żeby płynnie wypełnić cały pasek bez przerw na dużych ekranach
const REPEATED_SERVICES = [...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES];

export function InfiniteMarquee() {
  return (
    <div className="relative flex overflow-x-hidden bg-[#FF5500] text-black py-4 border-y border-[#FF5500]/20 rotate-1 scale-105 my-10 md:my-24 shadow-[0_0_50px_rgba(255,85,0,0.2)] z-10">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8 pl-8">
        {REPEATED_SERVICES.map((item, i) => (
          <span key={`mq1-${i}`} className="flex items-center gap-8 text-base md:text-lg font-bold tracking-widest uppercase italic">
            <Zap className="w-6 h-6" />
            {item}
          </span>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 py-4 pl-8">
        {REPEATED_SERVICES.map((item, i) => (
          <span key={`mq2-${i}`} className="flex items-center gap-8 text-base md:text-lg font-bold tracking-widest uppercase italic">
            <Zap className="w-6 h-6" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
