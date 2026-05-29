"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Code2, Cpu, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [marketingConsent, setMarketingConsent] = useState(false);
  return (
    <footer className="bg-[#0A0A0A] relative overflow-hidden pt-24 pb-8 border-t border-white/5">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Newsletter Box */}
        <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 md:p-16 mb-24 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left: Content & Form */}
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Konkrety o AI i automatyzacji.<br className="hidden md:block" /> Co 2 tygodnie. Bez spamu.
            </h3>
            <p className="text-muted-foreground mb-8 text-sm md:text-base leading-relaxed">
              Praktyczne wskazówki, które możesz wdrożyć w swojej firmie już jutro — o automatyzacji procesów, AI i tworzeniu stron. Tylko treść, zero wciskania usług.
            </p>
            
            <form className="flex flex-col gap-4 max-w-md" onSubmit={(e) => {
              e.preventDefault();
              if(!marketingConsent) return;
              // Submit logic here
            }}>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="name@email.com" 
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-full pl-12 pr-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <Button type="submit" disabled={!marketingConsent} className="w-full sm:w-auto bg-white hover:bg-white/90 text-black font-bold rounded-full px-8 py-6 disabled:opacity-50 disabled:cursor-not-allowed">
                  Zapisz się
                </Button>
              </div>
              <label className="flex items-start gap-3 cursor-pointer mt-2 group">
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-[#1A1A1A] checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                  />
                  <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors select-none">
                  Wyrażam zgodę na przesyłanie informacji handlowych drogą elektroniczną. Wiem, że zgodę mogę wycofać w dowolnym momencie. Zobacz naszą <a href="/polityka-prywatnosci" className="text-primary underline">Politykę Prywatności</a>.
                </span>
              </label>
            </form>
          </div>

          {/* Right: Decorative Element */}
          <div className="relative w-[300px] h-[300px] hidden lg:flex items-center justify-center shrink-0">
            {/* Glowing orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />
            
            {/* Main Center Icon */}
            <div className="relative z-10 w-24 h-24 bg-[#1A1A1A] rounded-full border border-white/10 flex items-center justify-center shadow-2xl p-4">
              <Image src="/logo.svg" alt="77systems" width={64} height={32} className="w-full h-auto" />
            </div>

            {/* Orbit Icons */}
            <div className="absolute top-8 left-12 w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center rotate-12">
              <Code2 className="w-6 h-6 text-rose-500" />
            </div>
            <div className="absolute bottom-12 right-12 w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center -rotate-12">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute top-20 right-8 w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center rotate-45">
              <Mail className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start mb-32 max-w-6xl mx-auto">
          {/* Logo & Copyright */}
          <div>
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.svg"
                alt="77systems"
                width={200}
                height={50}
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 77systems.eu — Agencja Automatyzacji & IT<br/>
              Kielce · Warszawa · Śląsk<br/>
              Wszelkie prawa zastrzeżone.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-6">Nawigacja</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/uslugi" className="hover:text-white transition-colors">Usługi</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
                <li><Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka Prywatności</Link></li>
                <li><Link href="/polityka-cookies" className="hover:text-white transition-colors">Polityka Cookies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Obserwuj nas</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                    <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                    <ArrowUpRight className="w-4 h-4 text-pink-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-white transition-colors group">
                    <ArrowUpRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Gigantic Background Text */}
      <div className="absolute bottom-[-10%] md:bottom-[-20%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
        <span className="text-[20vw] md:text-[25vw] font-black uppercase tracking-tighter text-white/5 leading-none whitespace-nowrap block">
          77SYSTEMS
        </span>
      </div>
    </footer>
  );
}
