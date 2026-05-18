"use client";

import { LayoutDashboard, BarChart3, Users, FileText, Settings, Bell, Play } from "lucide-react";
import { motion } from "framer-motion";

export function HeroDashboardMockup() {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-20 z-20">
      {/* Glow behind the dashboard */}
      <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Dashboard Container */}
      <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-[#0A0A0A] text-white shadow-2xl flex flex-col md:flex-row min-h-[450px] md:min-h-0 md:aspect-video text-left">
        
        {/* Sidebar */}
        <div className="w-64 border-r border-border/50 bg-[#050505]/50 backdrop-blur-sm p-6 hidden md:flex flex-col gap-8 z-10">
          <div className="flex items-center gap-3 text-white font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-[0_0_15px_rgba(255,85,0,0.5)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="m3 15 2 2 4-4"/></svg>
            </div>
            77systems
          </div>
          
          <nav className="flex flex-col gap-2 text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-3 text-white bg-white/5 px-4 py-3 rounded-xl border border-white/5">
              <LayoutDashboard size={18} /> Strona główna
            </div>
            <div className="flex items-center gap-3 hover:text-white px-4 py-3 transition-colors cursor-pointer relative group">
              <BarChart3 size={18} /> Analityka
            </div>
            <div className="flex items-center gap-3 hover:text-white px-4 py-3 transition-colors cursor-pointer">
              <Users size={18} /> Użytkownicy
            </div>
            <div className="flex items-center gap-3 hover:text-white px-4 py-3 transition-colors cursor-pointer">
              <FileText size={18} /> Raporty
            </div>
          </nav>
          
          <div className="mt-auto flex items-center gap-3 hover:text-white px-4 py-3 text-muted-foreground transition-colors cursor-pointer">
            <Settings size={18} /> Ustawienia
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 bg-gradient-to-br from-[#111]/80 to-[#0A0A0A] backdrop-blur-md z-10 overflow-hidden relative">
          
          {/* Top Navbar */}
          <div className="flex justify-between items-center border-b border-border/50 pb-4 overflow-x-auto hide-scrollbar">
            <div className="flex gap-4 sm:gap-8 text-xs sm:text-sm font-medium whitespace-nowrap">
              <span className="text-white relative">
                Panel
                <motion.div layoutId="nav-indicator" className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-primary shadow-[0_0_10px_rgba(255,85,0,0.8)]" />
              </span>
              <span className="text-muted-foreground hover:text-white transition-colors cursor-pointer">Projekty</span>
              <span className="text-muted-foreground hover:text-white transition-colors cursor-pointer">Dane</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-5 ml-4">
              <Bell size={18} className="text-muted-foreground hover:text-white transition-colors cursor-pointer shrink-0" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border border-gray-600 shrink-0" />
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mt-2 relative inline-block">
            Witaj ponownie, Alex!
          </h2>
          
          <div className="bg-[#151515]/80 border border-border/50 rounded-2xl p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-lg">
            <div className="flex-1">
              <div className="text-[11px] font-bold text-muted-foreground tracking-wider mb-3">STATYSTYKI</div>
              <div className="flex flex-wrap items-baseline gap-4 sm:gap-8">
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">132</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">zapytania</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-white">44</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground ml-1">oczekują</span>
                </div>
              </div>
            </div>
            <button aria-label="Utwórz nowy projekt" className="bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all px-6 py-3 rounded-xl text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(255,85,0,0.15)] flex items-center justify-center">
              UTWÓRZ NOWY PROJEKT
            </button>
          </div>
          
          {/* Real Time Data Line Chart */}
          <div className="bg-[#151515]/80 border border-border/50 rounded-2xl p-6 shadow-lg flex-1 min-h-[150px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-6 z-10 relative">
              <div className="text-[11px] font-bold text-muted-foreground tracking-wider">DANE W CZASIE RZECZYWISTYM</div>
              <div className="text-xs font-bold text-primary border border-primary/30 bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                NA ŻYWO
              </div>
            </div>
            
            {/* SVG Chart */}
            <div className="flex-1 absolute inset-0 w-full h-full mt-10">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff5500" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff5500" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <path d="M0,50 L1000,50 M0,100 L1000,100 M0,150 L1000,150" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Chart Path Area */}
                <motion.path 
                  d="M0,180 L100,140 L200,150 L300,100 L400,160 L500,80 L600,120 L700,50 L800,110 L900,40 L1000,90 L1000,200 L0,200 Z" 
                  fill="url(#chartGradient)" 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
                {/* Chart Line Path */}
                <motion.path 
                  d="M0,180 L100,140 L200,150 L300,100 L400,160 L500,80 L600,120 L700,50 L800,110 L900,40 L1000,90" 
                  fill="none" 
                  stroke="#ff5500" 
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Data Points */}
                {[
                  {cx: 100, cy: 140}, {cx: 300, cy: 100}, {cx: 500, cy: 80}, {cx: 700, cy: 50}, {cx: 900, cy: 40}
                ].map((point, i) => (
                  <motion.circle 
                    key={i} 
                    cx={point.cx} 
                    cy={point.cy} 
                    r="5" 
                    fill="#050505" 
                    stroke="#ff5500" 
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + (i * 0.1) }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Floating Tooltips (Moved outside overflow-hidden) */}
      <motion.div 
        className="hidden md:block absolute -left-2 md:-left-16 top-[65%] md:top-[45%] z-50 bg-[#FF5500] text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(255,85,0,0.3)] w-64 border border-[#FF5500]/50"
        initial={{ opacity: 0, x: -50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1, type: "spring" }}
      >
        <div className="absolute -right-3 top-6 w-6 h-6 bg-[#FF5500] rotate-45 hidden md:block" />
        <div className="absolute top-[-10px] left-6 w-6 h-6 bg-[#FF5500] rotate-45 md:hidden block" />
        <div className="bg-black/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full inline-block mb-2 backdrop-blur-md">
          Efektywność
        </div>
        <p className="text-sm font-medium leading-tight">
          Automatyzacja powtarzalnych procesów w firmie
        </p>
      </motion.div>

      <motion.div 
        className="hidden md:block absolute -right-2 md:-right-12 top-[10%] md:top-[20%] z-50 bg-[#8B5CF6] text-white p-4 rounded-2xl shadow-[0_20px_50px_rgba(139,92,246,0.3)] w-56 border border-[#8B5CF6]/50"
        initial={{ opacity: 0, x: 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.4, type: "spring" }}
      >
        <div className="absolute -left-3 top-8 w-6 h-6 bg-[#8B5CF6] rotate-45" />
        <div className="bg-black/40 text-[10px] uppercase font-bold px-3 py-1 rounded-full inline-block mb-2 backdrop-blur-md">
          Czas
        </div>
        <p className="text-sm font-medium leading-tight">
          Zaoszczędź 10h+ miesięcznie
        </p>
      </motion.div>

    </div>
  );
}
