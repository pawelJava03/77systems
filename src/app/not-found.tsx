"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background huge text */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[35vw] font-heading font-black leading-none bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent tracking-tighter">
          404
        </span>
      </motion.div>

      {/* Floating Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-12 md:p-16 rounded-[3rem] text-center shadow-2xl"
      >
        <div className="absolute inset-0 bg-primary/5 rounded-[3rem] blur-3xl -z-10" />
        
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
          Ups, strona nie istnieje
        </h1>
        
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed max-w-sm mx-auto">
          Wygląda na to, że trafiłeś w cyfrową próżnię. Strona, której szukasz, mogła zostać przeniesiona lub usunięta.
        </p>

        <Link href="/">
          <Button 
            className="group h-14 px-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg transition-all hover:scale-105 gap-3 shadow-[0_0_40px_rgba(255,85,0,0.3)]"
          >
            Wróć na stronę główną
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </motion.div>

      {/* Aesthetic glowing accents */}
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
    </main>
  );
}
