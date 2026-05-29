import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Tag, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import sql from "@/lib/db";

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  project_url: string;
  content: string;
  technologies: string[];
  meta_title: string;
  meta_description: string;
  keywords: string;
  testimonial_text: string;
  testimonial_author: string;
  testimonial_role: string;
  created_at: string;
}

async function getProject(slug: string): Promise<Project | null> {
  const [row] = await sql<Project[]>`SELECT * FROM portfolio WHERE slug = ${slug} LIMIT 1`;
  return row ?? null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  const title = project.meta_title || project.title;
  const description = project.meta_description || project.description;

  return {
    title,
    description,
    keywords: project.keywords || undefined,
    openGraph: { title, description, images: project.image_url ? [project.image_url] : [] },
  };
}

export default async function SingleProject({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return notFound();

  const displayContent = project.content || project.description;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Strona główna", "item": "https://77systems.eu/" },
      { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://77systems.eu/portfolio" },
      { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://77systems.eu/portfolio/${project.slug}` },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505] pt-32 pb-24 relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Link href="/portfolio" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-12 group">
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Powrót do portfolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end mb-16">
            <div className="lg:col-span-2">
              <p className="text-primary font-mono font-bold uppercase tracking-[0.2em] mb-4">{project.category}</p>
              <h1 className="text-5xl md:text-7xl font-heading font-black text-white leading-tight">{project.title}</h1>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-muted-foreground bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">
                  Realizacja:{" "}
                  {new Date(project.created_at).toLocaleDateString("pl-PL", { year: "numeric", month: "long" })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground bg-white/5 border border-white/5 rounded-2xl px-6 py-4">
                <Tag className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{project.category}</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl mb-16">
            {project.image_url ? (
              <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#111] flex items-center justify-center">
                <span className="font-heading font-black text-6xl text-white/10 uppercase tracking-tighter">77Systems</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">O projekcie</h2>
              <div className="text-muted-foreground text-lg leading-relaxed space-y-6">
                {displayContent ? (
                  displayContent.split("\n").filter(Boolean).map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p>Pracujemy nad przygotowaniem szczegółowego opisu tej realizacji. Zapraszamy do kontaktu, aby dowiedzieć się więcej.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {project.technologies && project.technologies.length > 0 && (
                <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8">
                  <h3 className="text-lg font-bold text-white mb-4">Technologie</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-xl px-4 py-2">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.project_url && (
                <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                  className="bg-[#111] border border-white/5 hover:border-primary/30 rounded-[2rem] p-8 flex items-center justify-between gap-4 group transition-colors">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Zobacz projekt</h3>
                    <p className="text-sm text-muted-foreground">Otwórz live demo</p>
                  </div>
                  <ExternalLink className="w-6 h-6 text-primary group-hover:scale-110 transition-transform shrink-0" />
                </a>
              )}

              <div className="bg-[#111] border border-white/5 rounded-[2rem] p-8">
                <h3 className="text-xl font-bold text-white mb-4">Interesuje Cię podobny efekt?</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  Każdy projekt realizujemy z pasją i precyzją, dbając o najmniejsze detale techniczne oraz estetyczne.
                </p>
                <Link href="/kontakt">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-14 rounded-2xl gap-2">
                    Skonsultuj projekt
                    <ArrowUpRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Opinia klienta — wyświetla się tylko gdy jest wypełniona */}
          {project.testimonial_text && (
            <div className="mt-16 relative">
              {/* Dekoracyjna linia */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
              <div className="relative border border-primary/20 rounded-[2.5rem] px-10 py-12 md:px-16 md:py-14">
                {/* Cudzysłów dekoracyjny */}
                <svg className="absolute top-8 left-10 w-12 h-12 text-primary/20 fill-current" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>

                <blockquote className="relative z-10 text-xl md:text-2xl text-white/90 font-light leading-relaxed italic pl-2 mb-8">
                  {project.testimonial_text}
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-0.5 bg-primary" />
                  <div>
                    {project.testimonial_author && (
                      <p className="font-bold text-white">{project.testimonial_author}</p>
                    )}
                    {project.testimonial_role && (
                      <p className="text-sm text-primary">{project.testimonial_role}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
