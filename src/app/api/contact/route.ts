import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, description } = await req.json();

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "mukeshkk3162@gmail.com",
      replyTo: email,
      subject: `New message from ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f1117; color: #e5e5e5; border-radius: 8px;">
          <h2 style="margin: 0 0 24px; font-size: 18px; color: #fff; border-bottom: 1px solid #2a2a2a; padding-bottom: 16px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; width: 110px; vertical-align: top;">NAME</td>
              <td style="padding: 10px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top;">EMAIL</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #e5e5e5;">${email}</a></td>
            </tr>
            ${
              company
                ? `
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top;">COMPANY</td>
              <td style="padding: 10px 0; font-size: 14px;">${company}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top;">MESSAGE</td>
              <td style="padding: 10px 0; font-size: 14px; white-space: pre-wrap;">${description}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
