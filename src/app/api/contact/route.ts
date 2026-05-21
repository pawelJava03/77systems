import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sql from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, audioBase64 } = await req.json();

    await sql`
      INSERT INTO leads (name, email, phone, message, audio_base64)
      VALUES (${name ?? ""}, ${email ?? ""}, ${phone ?? ""}, ${message ?? ""}, ${audioBase64 ?? ""})
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"System 77systems" <${process.env.SMTP_USER}>`,
      to: "contact@77systems.eu",
      replyTo: email || process.env.SMTP_USER,
      subject: `Nowy lead (${phone ? "Głosowy" : "Formularz"}): ${name || email || phone}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF5500;">Nowa wiadomość (${phone ? "Głosowa" : "Formularz"})</h2>
          <p><strong>Imię i nazwisko:</strong> ${name || "-"}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
          <p><strong>Wiadomość:</strong><br/>${message || "-"}</p>
          ${audioBase64 ? `<p style="background:#f0f0f0;padding:10px;border-radius:5px;"><strong>Info:</strong> Użytkownik zostawił nagranie głosowe. Znajdziesz je w panelu admina.</p>` : ""}
          <hr style="border:0;border-top:1px solid #eee;margin:20px 0;" />
          <p style="font-size:12px;color:#666;">Wiadomość wygenerowana automatycznie przez system 77systems.eu</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Failed to process contact." }, { status: 500 });
  }
}
