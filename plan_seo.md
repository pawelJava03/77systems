# Strategia Tworzenia Zoptymalizowanych Podstron Ofertowych (SOP)

Ten dokument stanowi instrukcję postępowania przy tworzeniu kolejnych podstron usługowych dla **77systems** (np. Automatyzacje & AI, SEO, Social Media), celem maksymalizacji wyników w wyszukiwarkach (szczególnie w Polsce, w obszarach: Świętokrzyskie, Śląskie, Mazowieckie).

## 1. Architektura Podstron (Topic Cluster)

Każda duża usługa (tzw. Pillar Page) powinna znajdować się we własnym statycznym routingu w Next.js zamiast ogólnego `[slug]`, co pozwala na precyzyjne sterowanie jej metadanymi oraz unikalnym komponentem Reacta.

`src/app/uslugi/nazwa-uslugi/page.tsx`

## 2. Metadane i Znaczniki Title / Description

Zawsze eksportuj obiekt `metadata` na poziomie danej podstrony:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glówna Fraza z Usługą - np. Tworzenie Stron WWW (Kielce, Warszawa, Śląsk) | 77systems',
  description: 'Zbuduj profesjonalną stronę na WordPress lub dedykowaną aplikację Next.js. Obsługujemy firmy ze Świętokrzyskiego, Mazowsza i Śląska. Dajemy 12 msc. gwarancji!',
  keywords: 'tworzenie stron internetowych, projektowanie stron www, strony internetowe Warszawa, strony internetowe Kielce, agencja interaktywna śląsk, aplikacje next.js',
  alternates: {
    canonical: 'https://77systems.eu/uslugi/nazwa-uslugi',
  }
};
```

**Zasada SEO**: Tytuł nie powinien przekraczać 60 znaków, a opis 160. Pamiętaj o LSI keywords (synonimach) w keywords oraz o naturalnym używaniu kluczowych miast.

## 3. Struktura Treści H1 - H3

Krytyczne dla pozycjonowania jest zachowanie ścisłej hierarchii nagłówków.

- **H1 (Jeden na stronę):** Główny nagłówek opisujący w 100% istotę strony. (np. "Tworzenie nowoczesnych stron internetowych i aplikacji webowych").
- **H2 (Sekcje):** Nagłówki drugorzędne opisujące poszczególne bloki: "Jakie technologie wykorzystujemy?", "Dlaczego my?", "Często Zadawane Pytania (FAQ)".
- **H3 (Podsekcje):** Detale technologiczne: "Szybkość z Next.js", "Elastyczność z WordPress", "Nasza Gwarancja Jakości".

## 4. Lokalne SEO (Geolokalizacja)

W treści strony ofertowej należy wpleść naturalnie brzmiące akapity z lokalizacjami:

*Przykładowy wtręt w treści:*
> „Projektujemy aplikacje dla biznesu bez względu na lokalizację, współpracując z czołowymi firmami ze Śląska, budując sklepy internetowe na terenie woj. świętokrzyskiego oraz wspierając startupy w Warszawie (Mazowieckie).”

Warto dla Local SEO posiadać znacznik `LocalBusiness` w `layout.tsx` (głównym schemacie).

## 5. Rich Snippets i Schema.org (JSON-LD)

Google faworyzuje strony o bogatych znacznikach. Najłatwiejszym sposobem do wbicia się w pozycje 0 (Featured Snippets) jest stosowanie `FAQPage` schema.

Do każdej podstrony ofertowej dołącz na końcu widoku:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Pytanie numer 1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Szczegółowa i obszerna odpowiedź z użyciem pogrubień i pełnych zdań."
          }
        }
      ]
    })
  }}
/>
```

Oraz przenieś te same pytania do komponentu Reacta (Akordeon FAQ), aby były fizycznie widoczne dla czytelnika na ekranie (kluczowy wymóg Google!).

## 6. Core Web Vitals i Performance

Z racji tworzenia stron w Next.js/React, musimy uważać na wskaźniki INP (Interaction to Next Paint) oraz LCP (Largest Contentful Paint).

- Obrazy używają `<Image />` z flagą `priority={true}` jeśli są "above the fold" (w hero sekcji). Inne muszą ładować się poprzez leniwe (lazy) ładowanie.
- Przesunięcia Layoutu (CLS) - upewnij się, że okienka FAQ nie psują ułożenia nagłówka po rozwinięciu, ani nie skaczą przy renderowaniu czcionek.
- Tło animowane – należy stosować transformacje przyspieszane sprzętowo (GPU) przez CSS (`transform: translate3d`).

## 7. Wymagane elementy oferty "Selling Points"

Według najnowszych wytycznych YMYL (Your Money or Your Life) i dla uwiarygodnienia, każda podstrona usługowa **Musi** posiadać:
- Proces realizacji krok po kroku.
- Cennik lub punkt zaczepienia dot. wyceny (jasna polityka cenowa).
- Gwarancję np. 12-miesięczny pakiet SLA na bugi i błędy.
- Gwarancję optymalizacji Core Web Vitals i SEO na etapie wdrożenia.
