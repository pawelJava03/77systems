"use client";

import { usePathname } from "next/navigation";
import { Preloader } from "./Preloader";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Preloader overlays via fixed z-[100] — content renders immediately */}
      <Preloader />
      <Navbar />
      {children}
      <Footer />
      <CookieConsent />
    </>
  );
}
