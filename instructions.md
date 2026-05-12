# 77systems.eu - Instrukcje, Architektura i Setup

## 1. Tech Stack
- **Framework Core:** Next.js 14+ (App Router) - gwarancja SSR/SSG, optymalizacja SEO, szybkie ładowanie.
- **Styling & UI:** Tailwind CSS, rozszerzony o komponenty z `shadcn/ui` dla spójnego i błyskawicznego budowania interfejsu premium.
- **Język:** TypeScript (ścisłe typowanie dla stabilności, bezpieczeństwa i łatwiejszego utrzymania długu technologicznego).
- **Animacje:** `framer-motion` (interakcje, wejścia, wyjścia) oraz `@studio-freight/lenis` (smooth scrolling).
- **i18n (Internacjonalizacja):** Przygotowana architektura routing'u (np. `/[locale]/page.tsx`) do przyszłego wsparcia języka angielskiego (np. za pomocą `next-intl`).
- **Baza danych / Backend / Auth:** Firebase (Authentication, Cloud Firestore, Cloud Storage).
- **Zarządzanie stanem:** React Hooks (Context API) oraz opcjonalnie `Zustand` (jeśli aplikacja będzie wymagała globalnego stanu m.in. dla koszyka czy złożonych formularzy).

## 2. Architektura Folderów
Proponowana struktura projektu zgodna z dobrymi praktykami Next.js App Router:
```text
/
├── src/
│   ├── app/
│   │   ├── [locale]/             # Główny router z obsługą i18n
│   │   │   ├── admin/            # Zabezpieczony panel administracyjny
│   │   │   ├── blog/             # Podstrony artykułów
│   │   │   ├── realizacje/       # Portfolio projektów
│   │   │   ├── page.tsx          # Główny Landing Page
│   │   │   └── layout.tsx        # Główny layout (z Lenis, Theme Providerem)
│   │   └── api/                  # Endpointy serwerowe
│   ├── components/
│   │   ├── ui/                   # Komponenty atomowe z shadcn/ui
│   │   ├── layout/               # Mega Menu, Footer, Preloader
│   │   └── sections/             # Większe sekcje (Hero, ContactModule, Services)
│   ├── lib/
│   │   ├── firebase/             # Inicjalizacja Firebase i funkcje dostępowe
│   │   └── utils.ts              # Funkcje pomocnicze, np. cn() dla tailwinda
│   ├── hooks/                    # Własne hooki: useVoiceRecorder, useRequireAuth
│   └── styles/
│       └── globals.css           # Główne style, zmienne CSS (np. kolory brandowe)
├── public/                       # Zasoby statyczne, grafiki, logo
├── theme.md                      # Dokumentacja designu
├── content.md                    # Dokumentacja treści
└── instructions.md               # Instrukcje techniczne
```

## 3. Konfiguracja Firebase
W celu uruchomienia całego ekosystemu należy skonfigurować Firebase:
1. Przejdź do **Firebase Console** i utwórz nowy projekt.
2. W sekcji **Authentication** aktywuj logowanie Email/Hasło (konto dla administracji).
3. W sekcji **Firestore Database** utwórz bazę produkcyjną i skonfiguruj zasady (odczyt publiczny dla artykułów i realizacji, zapis i odczyt wiadomości tylko dla admina).
4. W sekcji **Storage** stwórz bucket i włącz go. Będzie przechowywał nagrania głosowe z notatnika oraz zdjęcia realizacji.
5. Skonfiguruj aplikację webową i pobierz zmienne środowiskowe.
6. Utwórz w głównym katalogu plik `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY="twój-klucz"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="twoja-domena.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="twoj-projekt-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="twój-bucket.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="twój-id"
   NEXT_PUBLIC_FIREBASE_APP_ID="twoj-app-id"
   ```

## 4. Wytyczne do rozwoju i utrzymania
- **Panel Admina:** Trasa `/admin` musi być owrapowana komponentem chroniącym trasę (Higher-Order Component lub hook sprawdzający autoryzację), tak by tylko Firebase Admin UID miał tam dostęp.
- **Moduł Kontaktowy (Dyktafon):** Zastosowane zostanie `MediaRecorder API` działające w przeglądarce klienta. Nagrany Blob zostanie przesłany przez Firebase SDK do Storage, a referencja (Download URL) oraz dane kontaktowe wpadną do nowej kolekcji w Firestore (`contact_requests`).
- **CMS i Publikacja Treści:** Dodawanie, edycja i usuwanie elementów w "Realizacjach" i "Blogu" będzie wykonywane bezpośrednio z poziomu interfejsu panelu admina (CRUD na kolekcjach Firestore).
- **Renderowanie:** Landing page i statyczne podstrony oparte będą o SSG (Static Site Generation), podczas gdy Panel Admina będzie aplikacją w pełni CSR (Client-Side Rendering) dla szybszych i dynamicznych interakcji po stronie zalogowanego użytkownika.
