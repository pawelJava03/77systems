import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "Brak pliku." }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, fileName);

  await writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` });
}
