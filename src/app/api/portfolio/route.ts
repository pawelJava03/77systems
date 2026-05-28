import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await sql`
    SELECT * FROM portfolio ORDER BY created_at DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug, category, description, content, image_url, project_url, technologies, meta_title, meta_description, testimonial_text, testimonial_author, testimonial_role } = body;

  if (!title || !slug) return NextResponse.json({ error: "Tytuł i slug są wymagane." }, { status: 400 });

  const [row] = await sql`
    INSERT INTO portfolio (title, slug, category, description, content, image_url, project_url, technologies, meta_title, meta_description, testimonial_text, testimonial_author, testimonial_role)
    VALUES (${title}, ${slug}, ${category ?? ""}, ${description ?? ""}, ${content ?? ""}, ${image_url ?? ""}, ${project_url ?? ""}, ${technologies ?? []}, ${meta_title ?? ""}, ${meta_description ?? ""}, ${testimonial_text ?? ""}, ${testimonial_author ?? ""}, ${testimonial_role ?? ""})
    RETURNING *
  `;
  return NextResponse.json(row, { status: 201 });
}
