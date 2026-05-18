import Link from "next/link";

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 container mx-auto px-4 max-w-4xl">
      <div className="mb-12">
        <Link href="/" className="text-primary hover:underline text-sm font-bold uppercase tracking-wider mb-4 inline-block">
          &larr; Powrót
        </Link>
        <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-6">Polityka Prywatności</h1>
        <p className="text-muted-foreground text-sm">Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}</p>
      </div>

      <div className="prose prose-invert prose-orange max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">1. Administrator Danych Osobowych</h2>
          <p className="text-muted-foreground leading-relaxed">
            Administratorem Państwa danych osobowych jest <strong>77systems - Paweł Staciwa</strong>, z siedzibą: woj. ŚWIĘTOKRZYSKIE, pow. konecki, gm. Radoszyce, miejsc. Radoszyce, ul. Częstochowska, nr 31A, 26-230. NIP: 6582001519. We wszelkich sprawach związanych z ochroną danych osobowych prosimy o kontakt pod adresem e-mail: hello@77systems.eu.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">2. Cele i podstawy prawne przetwarzania</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Państwa dane osobowe przetwarzane są w następujących celach:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Nawiązanie kontaktu i udzielenie odpowiedzi na wiadomości przesłane przez formularz kontaktowy (art. 6 ust. 1 lit. f RODO).</li>
            <li>Przesyłanie informacji marketingowych, w tym newslettera, jeśli wyrazili Państwo na to wyraźną zgodę (art. 6 ust. 1 lit. a RODO).</li>
            <li>Zapewnienie prawidłowego działania strony, analiza ruchu oraz dostosowanie reklam na podstawie zgody na pliki cookies (art. 6 ust. 1 lit. a RODO).</li>
            <li>Realizacja obowiązków prawnych ciążących na Administratorze (art. 6 ust. 1 lit. c RODO).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">3. Odbiorcy danych</h2>
          <p className="text-muted-foreground leading-relaxed">
            Państwa dane osobowe mogą być przekazywane podmiotom przetwarzającym dane na zlecenie Administratora (np. dostawcom hostingu, narzędzi analitycznych, systemów mailingowych). Przekazywanie odbywa się na podstawie umów powierzenia przetwarzania danych i nie narusza Państwa prywatności.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">4. Czas przechowywania danych</h2>
          <p className="text-muted-foreground leading-relaxed">
            Dane przetwarzane na podstawie zgody będą przechowywane do momentu jej wycofania. Dane przetwarzane w celu obsługi zapytania będą przechowywane przez okres niezbędny do zakończenia komunikacji, a następnie w celach archiwalnych do momentu przedawnienia ewentualnych roszczeń.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">5. Prawa osób, których dane dotyczą</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Zgodnie z RODO przysługują Państwu następujące prawa:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Prawo dostępu do treści swoich danych oraz ich poprawiania,</li>
            <li>Prawo do żądania usunięcia danych ("prawo do bycia zapomnianym"),</li>
            <li>Prawo do ograniczenia przetwarzania,</li>
            <li>Prawo do przenoszenia danych,</li>
            <li>Prawo do wniesienia sprzeciwu wobec przetwarzania,</li>
            <li>Prawo do wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jej wycofaniem),</li>
            <li>Prawo do wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych).</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">6. Dobrowolność podania danych</h2>
          <p className="text-muted-foreground leading-relaxed">
            Podanie danych osobowych jest dobrowolne, jednakże niepodanie danych wymaganych w formularzach kontaktowych może uniemożliwić przesłanie zapytania i uzyskanie odpowiedzi.
          </p>
        </section>
      </div>
    </main>
  );
}
