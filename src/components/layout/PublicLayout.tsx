"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
      <Preloader onFinish={handleFinish} />
      <AnimatePresence>
        {preloaderDone && (
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Navbar />
            {children}
            <Footer />
            <CookieConsent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
