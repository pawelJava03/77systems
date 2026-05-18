"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Lightbulb, Code2, ShieldCheck } from "lucide-react";

export function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ustawienie offsetu: animacja zaczyna się, gdy element jest w 80% widoczności od dołu ekranu, 
  // a kończy, gdy osiągnie środek ekranu (50%)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "start -10%"],
  });

  const words = [
    { text: "Twoi" },
    { text: "pracownicy" },
    { text: "mają" },
    { icon: <div className="inline-flex w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#8B5CF6] items-center justify-center mx-2 -translate-y-1 shadow-[0_0_30px_rgba(139,92,246,0.5)]"><Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-white" /></div> },
    { text: "czas.", break: true },
    { text: "Twoi" },
    { text: "klienci" },
    { text: "są" },
    { text: "obsłużeni.", break: true },
    { icon: <div className="inline-flex w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#3B82F6] items-center justify-center mx-2 -translate-y-1 shadow-[0_0_30px_rgba(59,130,246,0.5)]"><Code2 className="w-6 h-6 md:w-8 md:h-8 text-white" /></div> },
    { text: "Twoje" },
    { text: "systemy" },
    { text: "działają." },
    { icon: <div className="inline-flex w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#10B981] items-center justify-center mx-2 -translate-y-1 shadow-[0_0_30px_rgba(16,185,129,0.5)]"><ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-white" /></div> },
    { text: "My" },
    { text: "zajmujemy" },
    { text: "się" },
    { text: "resztą." },
  ];

  return (
    <section ref={containerRef} className="container px-4 py-16 md:py-32 min-h-[50vh] flex items-center justify-center">
      <div className="max-w-6xl mx-auto text-center font-heading font-bold text-4xl md:text-5xl lg:text-7xl leading-[1.3] md:leading-[1.3] lg:leading-[1.3]">
        {words.map((word, i) => {
          // Wyliczanie zakresu [0, 1] z dużym nakładaniem się, by każde słowo dłużej się wyostrzało
          const start = i / words.length;
          const end = start + (6 / words.length); 
          
          return (
            <Word 
              key={i} 
              word={word} 
              progress={scrollYProgress} 
              range={[start, end > 1 ? 1 : end]} 
            />
          );
        })}
      </div>
    </section>
  );
}

function Word({ 
  word, 
  progress, 
  range 
}: { 
  word: { text?: string, icon?: React.ReactNode, break?: boolean }, 
  progress: MotionValue<number>, 
  range: number[] 
}) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const filter = useTransform(progress, range, ["blur(12px)", "blur(0px)"]);

  return (
    <>
      <motion.span 
        style={{ opacity, filter }} 
        className="inline-flex items-center mx-[4px] md:mx-[8px] my-2 align-middle"
      >
        {word.text && word.text}
        {word.icon && word.icon}
      </motion.span>
      {word.break && <br className="hidden lg:block" />}
    </>
  );
}
