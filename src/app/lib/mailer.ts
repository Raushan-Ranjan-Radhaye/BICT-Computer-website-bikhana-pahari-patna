import nodemailer from "nodemailer";
import { BRAND } from "@/app/data";

/** Shape of the enquiry payload sent by the client form. */
export type EnquiryPayload = {
  name: string;
  phone: string;
  course: string;
};

/** Pulls SMTP settings from the environment (`.env.local` / `.env`). */
function getTransporter() {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_APP_PASSWORD?.trim();

  if (!user || !pass) {
    throw new Error(
      "Email is not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in your environment variables.",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

/** Strips any HTML so user input can never be injected into the email markup. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtmlEmail(data: EnquiryPayload) {
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Course", data.course],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;border-bottom:1px solid #f1e4ea;font:600 13px/1.5 Arial,sans-serif;color:#6b5b63;width:180px;vertical-align:top;">
            ${escapeHtml(label)}
          </td>
          <td style="padding:10px 16px;border-bottom:1px solid #f1e4ea;font:700 14px/1.5 Arial,sans-serif;color:#241a1f;">
            ${escapeHtml(value)}
          </td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;background:#fdf7f9;padding:24px;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #f3dde5;">
        <div style="background:linear-gradient(90deg,#e11d5a,#a855f7);padding:22px 24px;">
          <h1 style="margin:0;font:800 20px/1.3 Arial,sans-serif;color:#ffffff;">
            New Enquiry Received
          </h1>
          <p style="margin:6px 0 0;font:500 13px/1.5 Arial,sans-serif;color:#ffe3ec;">
            ${escapeHtml(BRAND.name)} &middot; ${escapeHtml(BRAND.phone)}
          </p>
        </div>
        <table role="presentation" style="width:100%;border-collapse:collapse;">
          ${tableRows}
        </table>
        <div style="padding:18px 24px;">
          <p style="margin:0;font:500 13px/1.6 Arial,sans-serif;color:#6b5b63;">
            This enquiry was submitted from the website enquiry form. Please call the student back at your earliest convenience.
          </p>
        </div>
      </div>
    </div>`;
}

/** Sends the enquiry to the institute inbox. */
export async function sendEnquiryEmail(data: EnquiryPayload) {
  const from = process.env.GMAIL_USER?.trim() as string;
  // Enquiries land in the same Gmail inbox by default; override with ENQUIRY_TO_EMAIL.
  const to = process.env.ENQUIRY_TO_EMAIL?.trim() || from;

  const info = await getTransporter().sendMail({
    from: `"${BRAND.name} Website" <${from}>`,
    to,
    subject: `New Enquiry - ${data.name} (${data.course})`,
    text: [
      "New enquiry from the BICT Computer Education website.",
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Course: ${data.course}`,
    ].join("\n"),
    html: buildHtmlEmail(data),
  });

  return { messageId: info.messageId, to };
}