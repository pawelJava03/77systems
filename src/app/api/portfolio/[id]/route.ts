import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await sql`DELETE FROM portfolio WHERE id = ${Number(id)}`;
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const { title, slug, category, description, content, image_url, project_url, technologies, meta_title, meta_description, keywords, testimonial_text, testimonial_author, testimonial_role } = body;

  if (!title || !slug) return NextResponse.json({ error: "Tytuł i slug są wymagane." }, { status: 400 });

  const [row] = await sql`
    UPDATE portfolio SET
      title = ${title}, slug = ${slug}, category = ${category ?? ""},
      description = ${description ?? ""}, content = ${content ?? ""},
      image_url = ${image_url ?? ""}, project_url = ${project_url ?? ""},
      technologies = ${technologies ?? []},
      meta_title = ${meta_title ?? ""}, meta_description = ${meta_description ?? ""},
      keywords = ${keywords ?? ""},
      testimonial_text = ${testimonial_text ?? ""}, testimonial_author = ${testimonial_author ?? ""},
      testimonial_role = ${testimonial_role ?? ""}
    WHERE id = ${Number(id)}
    RETURNING *
  `;
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isSlug = isNaN(Number(id));

  const [row] = isSlug
    ? await sql`SELECT * FROM portfolio WHERE slug = ${id} LIMIT 1`
    : await sql`SELECT * FROM portfolio WHERE id = ${Number(id)} LIMIT 1`;

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}
