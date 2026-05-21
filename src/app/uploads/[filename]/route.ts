import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), "public", "uploads");

export async function GET(_req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  // Sanitize — prevent path traversal
  const safe = path.basename(filename);
  const filePath = path.join(UPLOAD_DIR, safe);

  try {
    const buffer = await readFile(filePath);
    const ext = safe.split(".").pop()?.toLowerCase() ?? "bin";
    const mime: Record<string, string> = {
      jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png",
      webp: "image/webp", gif: "image/gif", avif: "image/avif",
    };
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mime[ext] ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
