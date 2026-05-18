"use client";

import { motion } from "framer-motion";
import { ArrowRight, Settings, Code2, Share2, Search, MapPin, Sparkles, MessageCircle, Heart, Zap, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ServicesBentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
      
      {/* 1. Web Dev (Span 2) */}
      <Link href="/uslugi/web-development" className="group relative col-span-1 md:col-span-2 rounded-3xl bg-[#0A0A0A] border border-border overflow-hidden hover:border-primary/50 transition-colors shadow-lg flex flex-col justify-between p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-sm">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500 border border-green-500/20">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-heading font-bold mb-3 text-white group-hover:text-green-500 transition-colors">Web Development</h3>
          <p className="text-muted-foreground mb-8">Strony, które zarabiają — nie tylko wyglądają. Budujemy błyskawiczne aplikacje w Next.js i WordPress, które konwertują odwiedzającego w klienta.</p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors w-fit">
            Pokaż mi stronę <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Diagonal Tech Stack */}
        <div className="absolute -right-20 top-48 md:top-0 w-[400px] h-[500px] rotate-[-15deg] flex flex-col gap-4 opacity-[0.07] blur-sm md:blur-none md:opacity-80 group-hover:md:opacity-100 transition-opacity pointer-events-none">
          <motion.div 
            animate={{ x: [0, -20, 0] }} 
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="flex gap-4 ml-10"
          >
            <div className="px-6 py-3 bg-[#111] border border-border rounded-xl font-bold flex items-center gap-2 shadow-xl"><div className="w-4 h-4 bg-[#61DAFB] rounded-full" /> React</div>
            <div className="px-6 py-3 bg-[#111] border border-border rounded-xl font-bold flex items-center gap-2 shadow-xl"><div className="w-4 h-4 bg-white rounded-full" /> Next.js</div>
          </motion.div>
          <motion.div 
            animate={{ x: [0, 20, 0] }} 
            transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
            className="flex gap-4"
          >
            <div className="px-6 py-3 bg-[#111] border border-border rounded-xl font-bold flex items-center gap-2 shadow-xl"><div className="w-4 h-4 bg-[#FFCA28] rounded-full" /> Firebase</div>
            <div className="px-6 py-3 bg-[#111] border border-border rounded-xl font-bold flex items-center gap-2 shadow-xl"><div className="w-4 h-4 bg-[#38B2AC] rounded-full" /> Tailwind CSS</div>
          </motion.div>
          <motion.div 
            animate={{ x: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
            className="flex gap-4 ml-20"
          >
            <div className="px-6 py-3 bg-[#111] border border-border rounded-xl font-bold flex items-center gap-2 shadow-xl"><div className="w-4 h-4 bg-[#21759B] rounded-full" /> WordPress</div>
            <div className="px-6 py-3 bg-[#111] border border-border rounded-xl font-bold flex items-center gap-2 shadow-xl"><div className="w-4 h-4 bg-[#96588A] rounded-full" /> WooCommerce</div>
          </motion.div>
        </div>
      </Link>

      {/* 2. Automatyzacje (Span 1) */}
      <Link href="/uslugi/automatyzacje-ai" className="group relative col-span-1 rounded-3xl bg-[#0A0A0A] border border-border overflow-hidden hover:border-primary/50 transition-colors shadow-lg p-8 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5500]/10 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
            <Settings className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-primary transition-colors">Automatyzacje & AI</h3>
          <p className="text-muted-foreground text-sm mb-6">Twój zespół robi to samo od miesięcy? My to eliminujemy w tydzień. Integracje, boty, AI — masz.</p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/80 transition-colors w-fit">
            Więcej <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Gears & Logos */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none">
          <Settings className="absolute top-10 left-10 w-32 h-32 animate-[spin_10s_linear_infinite]" />
          <Settings className="absolute top-32 left-32 w-24 h-24 animate-[spin_8s_linear_infinite_reverse]" />
          <Settings className="absolute top-16 left-40 w-16 h-16 animate-[spin_6s_linear_infinite]" />
        </div>
        
        <div className="relative z-10 flex gap-2 mt-auto">
          <div className="px-3 py-1.5 bg-[#111] border border-border rounded-lg text-xs font-bold text-white shadow-md">n8n</div>
          <div className="px-3 py-1.5 bg-[#111] border border-border rounded-lg text-xs font-bold text-white shadow-md">REST API</div>
          <div className="px-3 py-1.5 bg-[#111] border border-border rounded-lg text-xs font-bold text-white shadow-md">JSON</div>
        </div>
      </Link>

      {/* 3. SEO (Span 1) */}
      <Link href="/uslugi/seo" className="group relative col-span-1 rounded-3xl bg-[#0A0A0A] border border-border overflow-hidden hover:border-primary/50 transition-colors shadow-lg p-8 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-tl from-[#4285F4]/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 border border-blue-500/20">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-blue-500 transition-colors">SEO & Pozycjonowanie</h3>
          <p className="text-muted-foreground text-sm mb-6">Pojawisz się tam, gdzie Twoi klienci szukają. Organiczny ruch, który nie wymaga stałego budżetu na reklamy.</p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500 text-white font-bold text-sm hover:bg-blue-600 transition-colors w-fit">
            Więcej <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Search Engine & Google Maps */}
        <div className="relative z-10 mt-auto w-full pt-8 pointer-events-none">
          <div className="bg-[#111] border border-border rounded-xl p-3 shadow-2xl relative translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="text-blue-500 font-bold text-lg leading-none">G</span>
              <div className="w-full h-8 bg-black border border-border rounded-full flex items-center px-3 gap-2">
                <Search className="w-3 h-3 text-muted-foreground" />
                <div className="w-16 h-1.5 bg-muted-foreground/30 rounded-full" />
              </div>
            </div>
            <div className="bg-black border border-border rounded-lg p-3 flex gap-3 items-center">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="w-20 h-2 bg-white rounded-full mb-2" />
                <div className="w-12 h-1.5 bg-muted-foreground/50 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* 4. Media społecznościowe (Span 2) */}
      <Link href="/uslugi/social-media" className="group relative col-span-1 md:col-span-2 rounded-3xl bg-[#0A0A0A] border border-border hover:border-primary/50 transition-colors shadow-lg p-8 flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#E1306C]/10 to-transparent pointer-events-none rounded-3xl" />
        
        <div className="relative z-10 max-w-sm">
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-6 text-pink-500 border border-pink-500/20">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-heading font-bold mb-3 text-white group-hover:text-pink-500 transition-colors">Social Media Marketing</h3>
          <p className="text-muted-foreground mb-8">Twój profil to puste miejsce? Albo jest, ale nikt nie reaguje? Budujemy społeczności, które napędzają sprzedaż — nie tylko lajki.</p>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500 text-white font-bold text-sm hover:bg-pink-600 transition-colors w-fit">
            Więcej <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* 3D Mockup pop-out effect */}
        <div className="absolute -right-10 -bottom-10 w-[300px] h-[350px] opacity-[0.07] blur-sm md:blur-none md:opacity-100 transition-transform duration-500 group-hover:-translate-y-4 group-hover:-translate-x-4 pointer-events-none">
           {/* Phone frame */}
           <div className="absolute inset-0 bg-[#111] border-4 border-[#222] rounded-[3rem] shadow-2xl rotate-[-10deg] flex flex-col items-center overflow-hidden">
             {/* Dynamic island */}
             <div className="w-20 h-5 bg-black rounded-full mt-3 mb-6" />
             
             {/* Feed mockup */}
             <div className="w-full px-4 flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 p-0.5">
                   <div className="w-full h-full bg-black rounded-full" />
                 </div>
                 <div>
                   <div className="w-24 h-2 bg-white rounded-full mb-1.5" />
                   <div className="w-16 h-1.5 bg-muted-foreground/50 rounded-full" />
                 </div>
               </div>
               
               <div className="w-full aspect-square bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-white/5">
                 <Globe className="w-16 h-16 text-white/30" />
               </div>
               
               <div className="flex gap-4">
                 <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                 <MessageCircle className="w-6 h-6 text-white" />
                 <Share2 className="w-6 h-6 text-white" />
               </div>
               <div className="w-3/4 h-2 bg-white rounded-full" />
               <div className="w-1/2 h-2 bg-muted-foreground/50 rounded-full" />
             </div>
           </div>
           
           {/* Floating elements */}
           <div className="absolute -left-10 top-20 bg-black border border-border p-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-[bounce_3s_infinite]">
             <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
             <span className="font-bold text-white text-sm">1.2k Likes</span>
           </div>
           <div className="absolute -right-5 top-40 bg-black border border-border p-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-[bounce_4s_infinite_0.5s]">
             <MessageCircle className="w-5 h-5 text-blue-500 fill-blue-500" />
             <span className="font-bold text-white text-sm">340 Comments</span>
           </div>
        </div>
      </Link>

    </div>
  );
}
