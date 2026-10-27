import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactRequestBody {
  name?: string;
  email?: string;
  company?: string;
  description?: string;
}

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const mailFrom =
  process.env.RESEND_FROM_EMAIL ?? "Contact Form <onboarding@resend.dev>";
const mailTo = process.env.CONTACT_TO_EMAIL ?? "mukeshkk3162@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactRequestBody;
    const { name, email, company, description } = body;

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!resend) {
      return NextResponse.json(
        { error: "Missing Resend API key" },
        { status: 500 }
      );
    }

    const response = await resend.emails.send({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: `New message from ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #111111; color: #faf7f3; border-radius: 16px;">
          <h2 style="margin: 0 0 24px; font-size: 18px; color: #faf7f3; border-bottom: 1px solid rgba(250,247,243,0.15); padding-bottom: 16px;">
            New Portfolio Contact Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: rgba(250,247,243,0.5); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; width: 110px; vertical-align: top;">NAME</td>
              <td style="padding: 10px 0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(250,247,243,0.5); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top;">EMAIL</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #faf7f3;">${email}</a></td>
            </tr>
            ${
              company
                ? `
            <tr>
              <td style="padding: 10px 0; color: rgba(250,247,243,0.5); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top;">COMPANY</td>
              <td style="padding: 10px 0; font-size: 14px;">${company}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 10px 0; color: rgba(250,247,243,0.5); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; vertical-align: top;">MESSAGE</td>
              <td style="padding: 10px 0; font-size: 14px; white-space: pre-wrap;">${description}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (response.error) {
      console.error(
        JSON.stringify({
          event: "CONTACT_EMAIL_SEND_FAILED",
          error: response.error.message,
        })
      );
      return NextResponse.json(
        {
          error: response.error.message ?? "Failed to send message",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: response.data?.id });
  } catch (err) {
    console.error(
      JSON.stringify({
        event: "CONTACT_FORM_EXCEPTION",
        error: err instanceof Error ? err.message : String(err),
      })
    );
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
