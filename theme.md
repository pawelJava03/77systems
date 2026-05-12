# 77systems.eu - System Designu (Theme)

## 1. Koncepcja Wizualna
- **Styl:** Dark-futuristic, minimalistyczne premium.
- **Klimat:** Nowoczesny, technologiczny, budzący zaufanie i podkreślający innowacyjność.

## 2. Paleta Kolorów
- **Background (Tło główne):** `#050505` (Głęboka czerń, pochłaniająca światło)
- **Surface (Tło sekcji/kart):** `#111111` do `#1A1A1A` (Lekkie podbicie dla głębi przestrzennej)
- **Primary Accent (Akcent główny):** `#FF5500` (Wibrujący, energetyczny pomarańczowy, idealny do przykuwania uwagi)
- **Accent Hover:** `#FF7733`
- **Text Primary (Główny tekst):** `#F3F4F6` (Prawie biały, zapewniający wysoki kontrast i czytelność)
- **Text Secondary (Tekst poboczny):** `#9CA3AF` (Stonowana szarość dla opisów i mniej ważnych informacji)
- **Border (Obramowania):** `#27272A` (Subtelne linie oddzielające elementy interfejsu)

## 3. Typografia
- **Font Głównego Nagłówka (Headings):** `Space Grotesk` lub `Outfit` (Geometryczny, lekko futurystyczny, oddający technologiczny charakter)
- **Font Paragrafów (Body):** `Inter` lub `Geist` (Maksymalna czytelność, czystość i uniwersalność)
- **Skala (przykładowa):** 
  - H1: 4.5rem (72px), Font Weight: 700, Tight Tracking
  - H2: 3rem (48px), Font Weight: 600
  - Body: 1.125rem (18px), Font Weight: 400, Line Height: 1.6

## 4. Zasady Animacji i Interakcji
- **Smooth Scrolling:** Implementacja biblioteki `Lenis` dla niezwykle płynnego przewijania całej strony.
- **Preloader:** Minimalistyczny, ciemny ekran z pulsującym pomarańczowym logo lub elementem wektorowym, płynnie zanikający (fade-out) po załadowaniu głównych zasobów.
- **Wejścia elementów (Scroll Reveal):** 
  - Główne teksty: Fade-in z delikatnym Slide-up (np. przesunięcie o 20-30px w górę).
  - Karty usług i gridy: Staggered fade-in (kaskadowe pojawianie się jedno po drugim).
- **Przejścia między stronami (Page Transitions):** Użycie `Framer Motion` do gładkiego wygaszania obecnej i rozjaśniania nowej strony, z zachowaniem stanu scrollowania.
- **Hover efekty (Mikrointerakcje):** Subtelne rozjaśnienie tła kart przy najechaniu, delikatny pomarańczowy glow (`box-shadow`) przycisków głównych oraz powiększanie strzałek w linkach.
