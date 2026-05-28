import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import sql from "@/lib/db";

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  image_alt: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  category: string;
  created_at: string;
}

async function getArticle(slug: string): Promise<Article | null> {
  const [row] = await sql<Article[]>`SELECT * FROM blog WHERE slug = ${slug} LIMIT 1`;
  return row ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const title = article.meta_title || article.title;
  const description = article.meta_description || article.excerpt;

  return {
    title,
    description,
    keywords: article.keywords || undefined,
    openGraph: { title, description, images: article.image_url ? [article.image_url] : [] },
  };
}

export default async function SinglePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return notFound();

  const dateStr = new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(new Date(article.created_at));

  return (
    <main className="pt-32 pb-24 container mx-auto px-4 min-h-screen">
      <article className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
            ← Blog
          </Link>
        </div>

        {article.image_url && (
          <div className="w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden border border-white/10 mb-10">
            <img src={article.image_url} alt={article.image_alt || article.title} className="w-full h-full object-cover" />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-white">{article.title}</h1>
        <p className="text-sm text-muted-foreground font-mono mb-10">{dateStr}</p>

        {article.excerpt && (
          <p className="text-xl text-muted-foreground mb-10 border-l-2 border-primary pl-6">{article.excerpt}</p>
        )}

        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-white/80 leading-relaxed">
          {article.content}
        </div>
      </article>
    </main>
  );
}
