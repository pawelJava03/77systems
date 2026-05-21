import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        category TEXT NOT NULL DEFAULT '',
        description TEXT DEFAULT '',
        content TEXT DEFAULT '',
        image_url TEXT DEFAULT '',
        project_url TEXT DEFAULT '',
        technologies TEXT[] DEFAULT '{}',
        meta_title TEXT DEFAULT '',
        meta_description TEXT DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS blog (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT DEFAULT '',
        content TEXT DEFAULT '',
        image_url TEXT DEFAULT '',
        meta_title TEXT DEFAULT '',
        meta_description TEXT DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name TEXT DEFAULT '',
        email TEXT DEFAULT '',
        phone TEXT DEFAULT '',
        message TEXT DEFAULT '',
        audio_base64 TEXT DEFAULT '',
        contacted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    return NextResponse.json({ success: true, message: "Tables created." });
  } catch (err) {
    console.error("DB init error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
