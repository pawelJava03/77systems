import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, audioBase64 } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      debug: true, // Show debug output
      logger: true // Log information in console
    });

    console.log("Attempting to send email from:", process.env.SMTP_USER);
    console.log("Attempting to send email to: contact@77systems.eu");

    const mailOptions = {
      from: `"System 77systems" <${process.env.SMTP_USER}>`,
      to: "contact@77systems.eu",
      replyTo: email || process.env.SMTP_USER, // Allow replying to the sender
      subject: `Nowy lead (${phone ? 'Głosowy' : 'Formularz'}): ${name || email || phone}`,
      text: `Masz nową wiadomość z formularza kontaktowego.\n\nImię: ${name || '-'}\nEmail: ${email || '-'}\nTelefon: ${phone || '-'}\nWiadomość: ${message || '-'}\n\n${audioBase64 ? "Użytkownik zostawił również nagranie głosowe (dostępne w bazie Firebase)." : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #FF5500;">Nowa wiadomość (${phone ? 'Głosowa' : 'Formularz'})</h2>
          <p><strong>Imię i nazwisko:</strong> ${name || '-'}</p>
          ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
          ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          <p><strong>Wiadomość:</strong><br/>${message || '-'}</p>
          ${audioBase64 ? `<p style="background: #f0f0f0; padding: 10px; border-radius: 5px;"><strong>Info:</strong> Użytkownik zostawił nagranie głosowe. Znajdziesz je w panelu admina lub Firebase.</p>` : ''}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">Wiadomość wygenerowana automatycznie przez system 77systems.eu</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Accepted addresses:", info.accepted);

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
