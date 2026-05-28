import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const rows = await sql`SELECT * FROM blog ORDER BY created_at DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, content, image_url, image_alt, meta_title, meta_description, category, keywords } = body;

  if (!title || !slug) return NextResponse.json({ error: "Tytuł i slug są wymagane." }, { status: 400 });

  const [row] = await sql`
    INSERT INTO blog (title, slug, excerpt, content, image_url, image_alt, meta_title, meta_description, category, keywords)
    VALUES (
      ${title}, ${slug}, ${excerpt ?? ""}, ${content ?? ""},
      ${image_url ?? ""}, ${image_alt ?? ""},
      ${meta_title ?? ""}, ${meta_description ?? ""},
      ${category ?? ""}, ${keywords ?? ""}
    )
    RETURNING *
  `;
  return NextResponse.json(row, { status: 201 });
}
