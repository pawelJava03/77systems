import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import sql from "@/lib/db";

async function sendNotification(data: {
  name: string; email: string; phone: string; message: string; audioBase64: string;
}) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    requireTLS: Number(process.env.SMTP_PORT) === 587,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  await transporter.sendMail({
    from: `"77systems" <${process.env.SMTP_USER}>`,
    to: "contact@77systems.eu",
    replyTo: data.email || process.env.SMTP_USER,
    subject: `Nowy lead (${data.phone ? "Głosowy" : "Formularz"}): ${data.name || data.email || data.phone}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #eee;border-radius:10px;">
        <h2 style="color:#FF5500;">Nowa wiadomość (${data.phone ? "Głosowa" : "Formularz"})</h2>
        <p><strong>Imię:</strong> ${data.name || "-"}</p>
        ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
        ${data.phone ? `<p><strong>Telefon:</strong> ${data.phone}</p>` : ""}
        <p><strong>Wiadomość:</strong><br/>${data.message || "-"}</p>
        ${data.audioBase64 ? `<p style="background:#f0f0f0;padding:10px;border-radius:5px;"><strong>Info:</strong> Nagranie głosowe w panelu admina.</p>` : ""}
        <hr style="border:0;border-top:1px solid #eee;margin:20px 0;"/>
        <p style="font-size:12px;color:#666;">77systems.eu</p>
      </div>
    `,
  });
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, audioBase64 } = await req.json();

    await sql`
      INSERT INTO leads (name, email, phone, message, audio_base64)
      VALUES (${name ?? ""}, ${email ?? ""}, ${phone ?? ""}, ${message ?? ""}, ${audioBase64 ?? ""})
    `;

    // Email w tle - nie blokuje odpowiedzi
    sendNotification({ name: name ?? "", email: email ?? "", phone: phone ?? "", message: message ?? "", audioBase64: audioBase64 ?? "" })
      .catch((err) => console.error("Email error:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Błąd zapisu." }, { status: 500 });
  }
}
