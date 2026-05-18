"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Preloader } from "./Preloader";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [preloaderDone, setPreloaderDone] = useState(false);
  const handleFinish = useCallback(() => setPreloaderDone(true), []);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Preloader overlays content — does NOT gate rendering */}
      <Preloader onFinish={handleFinish} />

      {/* Content always in DOM so SSR/LCP works correctly */}
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: preloaderDone ? "opacity 0.5s ease-out" : "none",
        }}
      >
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}
