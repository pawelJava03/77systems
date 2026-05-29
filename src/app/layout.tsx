import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
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
  verification: {
    google: "GlBbBVfgx8pHGI-yt13rgQ4LjbVLeq0Cgeos8UFAQw8",
    other: {
      "msvalidate.01": "797E78482729AD1E5F0D0D5D55E4613D",
    },
  },
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
    images: [
      {
        url: "https://77systems.eu/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "77systems — Automatyzacje AI & Strony WWW dla Firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatyzacje AI & Strony WWW dla Firm | 77systems",
    description: "Automatyzujemy procesy i tworzymy szybkie strony internetowe dla firm z Kielc, Warszawy i Śląska. Darmowy audyt — wdrożenie w tygodnie.",
    images: ["https://77systems.eu/og-image.jpg"],
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
    "telephone": "+48699715591",
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
      "https://www.linkedin.com/company/77systems",
      "https://maps.app.goo.gl/HBea9AgEoFnunDRN8"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "3",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Mateusz Sobierski" },
        "reviewBody": "Paweł to prawdziwy profesjonalista, jeśli chodzi o tworzenie stron, jak i całe podejście do tematu. Doskonale rozumie potrzeby klienta i rzeczy niemożliwe załatwia od ręki, a na cuda trzeba kilka dni poczekać."
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Agnieszka" },
        "reviewBody": "Dziękuję za pomoc. Po raz pierwszy spotkałam się w tej branży z tak szybkim i profesjonalnym podejściem. Będę polecać dalej."
      },
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Person", "name": "Krystian" },
        "reviewBody": "Pełen profesjonalizm! 77systems stworzyło dla mnie nowoczesną stronę internetową, która realnie zwiększyła liczbę zapytań i zamówień. Strona szybka, responsywna i dobrze widoczna w Google. Zdecydowanie polecam!"
      }
    ]
  };

  return (
    <html lang="pl" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TPN3D2T4');` }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground min-h-screen font-sans overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPN3D2T4" height="0" width="0" style={{ display: "none", visibility: "hidden" }} /></noscript>
        <SmoothScrollProvider>
          <PublicLayout>
            {children}
          </PublicLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
