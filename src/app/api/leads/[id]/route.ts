import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { contacted } = await req.json();
  const [row] = await sql`
    UPDATE leads SET contacted = ${contacted} WHERE id = ${Number(id)} RETURNING *
  `;
  return NextResponse.json(row);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await sql`DELETE FROM leads WHERE id = ${Number(id)}`;
  return NextResponse.json({ success: true });
}
