export default async function SingleService({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return (
    <main className="pt-32 pb-24 container mx-auto px-4 min-h-screen">
      <h1 className="text-5xl font-heading font-bold mb-8 capitalize">{resolvedParams.slug.replace(/-/g, ' ')}</h1>
      <div className="prose prose-invert max-w-3xl">
        <p className="text-xl text-muted-foreground">To jest strona szczegółów usługi. Zawiera szerszy opis, cennik i specyfikację.</p>
      </div>
    </main>
  );
}
