import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import sql from "@/lib/db";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

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

function extractFaqSchema(markdown: string) {
  const items: { question: string; answer: string }[] = [];
  const re = /^###\s+(.+\?)\s*\n+([\s\S]*?)(?=\n#{2,3}\s|\n*$)/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(markdown)) !== null) {
    const answer = match[2].replace(/\n+/g, " ").replace(/[*_`]/g, "").trim();
    if (answer) items.push({ question: match[1].trim(), answer });
  }
  return items;
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

const mdComponents: Components = {
  h1: ({ children }) => (
    <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-16 mb-6 leading-tight">{children}</h2>
  ),
  h2: ({ children }) => (
    <div className="mt-16 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="block w-8 h-0.5 bg-primary rounded-full" />
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight">{children}</h2>
      </div>
    </div>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-heading font-semibold text-white mt-10 mb-4 leading-snug">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-heading font-semibold text-white/90 mt-8 mb-3">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="text-[17px] text-white/75 leading-[1.85] mb-6">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="text-white/80 italic">{children}</em>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors" target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-6 space-y-3 ml-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 space-y-3 ml-2 list-none counter-reset-[item]">{children}</ol>
  ),
  li: ({ children, ...props }) => {
    const isOrdered = (props as { ordered?: boolean }).ordered;
    return isOrdered ? (
      <li className="flex gap-3 text-[17px] text-white/75 leading-[1.85]">
        <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold flex items-center justify-center mt-0.5">
          {(props as { index?: number }).index !== undefined ? ((props as { index?: number }).index ?? 0) + 1 : "·"}
        </span>
        <span>{children}</span>
      </li>
    ) : (
      <li className="flex gap-3 text-[17px] text-white/75 leading-[1.85]">
        <span className="shrink-0 mt-[11px] w-1.5 h-1.5 rounded-full bg-primary" />
        <span>{children}</span>
      </li>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-8 pl-6 border-l-4 border-primary bg-primary/5 rounded-r-xl py-4 pr-6">
      <div className="text-white/80 italic text-[17px] leading-[1.85]">{children}</div>
    </blockquote>
  ),
  hr: () => (
    <div className="my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-white/8" />
      <div className="flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-primary/10" />
      </div>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    return isBlock ? (
      <code className="block bg-[#111] border border-white/8 rounded-xl p-5 text-sm font-mono text-green-400 overflow-x-auto my-6 leading-relaxed">
        {children}
      </code>
    ) : (
      <code className="bg-white/8 text-primary font-mono text-[14px] px-1.5 py-0.5 rounded-md">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <>{children}</>,
  img: ({ src, alt }) => (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10">
      <img src={src} alt={alt} className="w-full h-auto" />
    </div>
  ),
};

export default async function SinglePost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return notFound();

  const dateStr = new Intl.DateTimeFormat("pl-PL", { dateStyle: "long" }).format(new Date(article.created_at));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://77systems.eu/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://77systems.eu/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://77systems.eu/blog/${article.slug}` },
    ],
  };

  const faqItems = extractFaqSchema(article.content);
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer },
    })),
  } : null;

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Hero image */}
      {article.image_url && (
        <div className="container mx-auto px-4 max-w-5xl mb-16">
          <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/8 shadow-2xl">
            <img src={article.image_url} alt={article.image_alt || article.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-3xl">

        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Wróć do bloga
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {article.category && (
            <span className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-muted-foreground text-sm">
            <Calendar className="w-3.5 h-3.5" />
            {dateStr}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-[1.1] tracking-tight mb-8">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xl text-white/60 leading-relaxed mb-12 pb-12 border-b border-white/8">
            {article.excerpt}
          </p>
        )}

        {/* Content */}
        <div>
          <ReactMarkdown components={mdComponents}>{article.content}</ReactMarkdown>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Bezpłatny audyt</p>
          <h3 className="text-2xl font-heading font-bold text-white mb-3">Chcesz wdrożyć to u siebie?</h3>
          <p className="text-white/60 mb-6">Sprawdź, które procesy w Twojej firmie można zautomatyzować. Zero zobowiązań.</p>
          <Link href="/kontakt" className="inline-flex items-center gap-2 bg-primary text-black font-bold px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
            Umów bezpłatny audyt
          </Link>
        </div>

      </div>
    </main>
  );
}
