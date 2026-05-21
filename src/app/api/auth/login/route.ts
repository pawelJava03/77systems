import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const validEmail = email === process.env.ADMIN_EMAIL;
  const validPass = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH!);

  if (!validEmail || !validPass) {
    return NextResponse.json({ error: "Nieprawidłowe dane logowania." }, { status: 401 });
  }

  const token = await signToken({ email });
  const res = NextResponse.json({ success: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
