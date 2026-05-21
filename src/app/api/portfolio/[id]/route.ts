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

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isSlug = isNaN(Number(id));

  const [row] = isSlug
    ? await sql`SELECT * FROM portfolio WHERE slug = ${id} LIMIT 1`
    : await sql`SELECT * FROM portfolio WHERE id = ${Number(id)} LIMIT 1`;

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(row);
}
