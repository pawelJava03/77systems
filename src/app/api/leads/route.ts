import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { name, email, phone, message, audio_base64 } = await req.json();
  const [row] = await sql`
    INSERT INTO leads (name, email, phone, message, audio_base64)
    VALUES (${name ?? ""}, ${email ?? ""}, ${phone ?? ""}, ${message ?? ""}, ${audio_base64 ?? ""})
    RETURNING *
  `;
  return NextResponse.json(row, { status: 201 });
}
