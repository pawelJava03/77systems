import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { AuthProvider } from "@/context/AuthContext";
import { PublicLayout } from "@/components/layout/PublicLayout";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Automatyzacje AI & Strony WWW dla Firm | 77systems",
  description: "Automatyzujemy procesy i tworzymy szybkie strony internetowe dla firm z Kielc, Warszawy i Śląska. Darmowy audyt ➜ Wdrożenie w tygodnie, nie miesiące.",
  keywords: "automatyzacja procesów biznesowych, tworzenie stron internetowych Kielce, tworzenie stron internetowych Warszawa, wdrożenie AI w firmie, agencja interaktywna, systemy IT dla firm, pozycjonowanie stron SEO, obsługa social media Śląsk",
  alternates: {
    canonical: "https://77systems.eu",
  },
  openGraph: {
    title: "Automatyzacje AI & Strony WWW dla Firm | 77systems",
    description: "Automatyzujemy procesy i tworzymy szybkie strony internetowe dla firm z Kielc, Warszawy i Śląska. Darmowy audyt — wdrożenie w tygodnie.",
    url: "https://77systems.eu",
    siteName: "77systems",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "77systems",
    "url": "https://77systems.eu",
    "email": "contact@77systems.eu",
    "description": "Agencja automatyzacji procesów biznesowych i tworzenia stron internetowych. Obsługujemy firmy z Kielc, Warszawy i Śląska.",
    "areaServed": [
      { "@type": "City", "name": "Kielce" },
      { "@type": "City", "name": "Warszawa" },
      { "@type": "City", "name": "Katowice" },
      { "@type": "Country", "name": "Polska" }
    ],
    "serviceType": [
      "Automatyzacja procesów biznesowych",
      "Tworzenie stron internetowych",
      "Pozycjonowanie SEO",
      "Obsługa Social Media",
      "Wdrożenie AI"
    ],
    "sameAs": [
      "https://www.facebook.com/77systems",
      "https://www.instagram.com/77systems",
      "https://www.linkedin.com/company/77systems"
    ]
  };

  return (
    <html lang="pl" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground min-h-screen font-sans overflow-x-hidden`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <SmoothScrollProvider>
            <PublicLayout>
              {children}
            </PublicLayout>
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
