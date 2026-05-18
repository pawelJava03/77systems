"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Code2, Cpu, LineChart, Share2, ArrowRight, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/uslugi", label: "Usługi", hasMegaMenu: true },
  { href: "/portfolio", label: "Nasze realizacje" },
  { href: "/blog", label: "Baza wiedzy" },
];

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Nowoczesne serwisy internetowe i e-commerce.",
    href: "/uslugi/web-development",
    colorClasses: "bg-green-500/10 text-green-500",
  },
  {
    icon: Cpu,
    title: "Automatyzacje",
    description: "Inteligentne procesy i roboty ułatwiające pracę.",
    href: "/uslugi/automatyzacje-ai",
    colorClasses: "bg-[#FF5500]/10 text-[#FF5500]",
  },
  {
    icon: LineChart,
    title: "SEO & Pozycjonowanie",
    description: "Pozycjonowanie i optymalizacja widoczności.",
    href: "/uslugi/seo",
    colorClasses: "bg-blue-500/10 text-blue-500",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Skuteczne zasięgi i angażujący content.",
    href: "/uslugi/social-media",
    colorClasses: "bg-pink-500/10 text-pink-500",
  }
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Zamknij menu przy zmianie strony
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Zablokuj scroll gdy menu otwarte
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/logo.svg"
                alt="77systems"
                width={180}
                height={45}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Center: Menu Pill (desktop) */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 bg-[#1A1A1A] rounded-full border border-white/5 shadow-lg relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 block",
                      isActive
                        ? "bg-white text-black shadow-sm"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Mega Menu */}
                  {link.hasMegaMenu && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-[600px] pointer-events-none group-hover:pointer-events-auto">
                      <div className="bg-[#111] border border-white/10 rounded-[2rem] p-4 shadow-2xl overflow-hidden relative">
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          {services.map((service) => (
                            <Link
                              key={service.title}
                              href={service.href}
                              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group/item"
                            >
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110 ${service.colorClasses}`}>
                                <service.icon className="w-6 h-6" />
                              </div>
                              <div>
                                <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wide">{service.title}</h3>
                                <p className="text-muted-foreground text-xs leading-relaxed">{service.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          href="/kontakt"
                          className="flex items-center justify-between bg-primary/10 hover:bg-primary/20 p-6 rounded-2xl transition-colors group/cta mt-2"
                        >
                          <div>
                            <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-1">Darmowa wycena</p>
                            <p className="text-white font-bold text-sm uppercase tracking-wide">Zapytaj o swój projekt</p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-primary transform transition-transform group-hover/cta:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: CTA (desktop) + Hamburger (mobile) */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <Link href="/kontakt" className="hidden md:block">
              <Button variant="default" className="font-bold px-8 py-6 text-base uppercase tracking-wider rounded-full bg-primary hover:bg-primary/90 text-white border-none shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all hover:scale-105">
                Zacznijmy projekt
              </Button>
            </Link>

            {/* Mobile: CTA pill */}
            <Link
              href="/kontakt"
              className="md:hidden inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(255,85,0,0.4)]"
            >
              Kontakt
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white transition-colors hover:bg-white/10"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[80%] max-w-sm bg-[#0A0A0A] border-l border-white/10 flex flex-col transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Image src="/logo.svg" alt="77systems" width={120} height={30} className="h-8 w-auto" />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Zamknij menu"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3.5 rounded-2xl text-base font-semibold transition-colors",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Services submenu */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="px-4 mb-3 text-xs font-bold uppercase tracking-widest text-primary">Usługi</p>
              {services.map((service) => (
                <Link
                  key={service.title}
                  href={service.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${service.colorClasses}`}>
                    <service.icon className="w-4 h-4" />
                  </div>
                  {service.title}
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom CTA */}
          <div className="px-6 py-6 border-t border-white/10">
            <Link
              href="/kontakt"
              className="flex items-center justify-center gap-2 w-full rounded-full bg-primary py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(255,85,0,0.3)]"
            >
              Kontakt <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
