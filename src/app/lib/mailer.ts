import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { BRAND } from "@/app/data";

/** Shape of the enquiry payload sent by the client form. */
export type EnquiryPayload = {
  name: string;
  phone: string;
  course: string;
};


let transporter: Transporter | null = null;

/**
 * Resolves which mail credentials to use, in priority order:
 * 1. Any custom relay (Brevo, SES, Mailgun...) via SMTP_* — used whenever
 *    SMTP_HOST is present.
 * 2. Gmail preset using a 16-character Google **App Password**.
 */
export function mailConfig() {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpPort = Number(process.env.SMTP_PORT?.trim()) || 587;

  if (smtpHost && smtpUser && smtpPass) {
    return {
      provider: "custom" as const,
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
      user: smtpUser,
      pass: smtpPass,
    };
  }

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.trim();

  if (gmailUser && gmailPass) {
    return {
      provider: "gmail" as const,
      host: "",
      port: 0,
      secure: false,
      user: gmailUser,
      pass: gmailPass,
    };
  }

  return null;
}

function getTransporter(): Transporter {
  if (transporter) return transporter;

  const config = mailConfig();
  if (!config) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST + SMTP_USER + SMTP_PASS (Brevo or any relay), or GMAIL_USER + GMAIL_APP_PASSWORD.",
    );
  }

  transporter =
    config.provider === "custom"
      ? nodemailer.createTransport({
          host: config.host,
          port: config.port,
          secure: config.secure,
          auth: { user: config.user, pass: config.pass },
        })
      : nodemailer.createTransport({
          service: "gmail",
          auth: { user: config.user, pass: config.pass },
        });

  return transporter;
}

/** Human-friendly reason for a send failure, safe to log server-side. */
function describeMailError(error: unknown): string {
  const code = (error as { code?: string })?.code ?? "";
  const message = error instanceof Error ? error.message : String(error);

  if (code === "EAUTH" || code === "535" || /Invalid login|authentication|unauthorized/i.test(message)) {
    return `SMTP rejected the login (${code || "auth error"}). Check the SMTP login/key and that sending is still enabled for this account.`;
  }
  if (code === "ECONNECTION" || code === "ETIMEDOUT" || code === "EDNS" || code === "EHOSTUNREACH") {
    return "Could not reach the mail server (wrong host/port, or the port is blocked by the network).";
  }
  if (code === "ECONNRESET" || /socket hang up|Connection closed/i.test(message)) {
    return "The mail server closed the connection. Please try again.";
  }
  if (/not verified|sender|from address|unauthorized sender|550|553|spf/i.test(message)) {
    return `The mail server rejected the sender address: ${message}. Add/verify the sender in your provider dashboard.`;
  }
  if (code === "EMESSAGE") {
    return `The mail server rejected the message: ${message}`;
  }
  return message;
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
  const config = mailConfig();
  if (!config) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST + SMTP_USER + SMTP_PASS (Brevo or any relay), or GMAIL_USER + GMAIL_APP_PASSWORD.",
    );
  }

  /*
   * From: must be a sender the provider has verified.
   * MAIL_FROM wins, otherwise fall back to the SMTP login (Brevo accepts this)
   * and finally to the Gmail account for the Gmail preset.
   */
  const fromAddress =
    process.env.MAIL_FROM?.trim() || config.user;
  // To: where enquiries are delivered.
  const to =
    process.env.ENQUIRY_TO_EMAIL?.trim() ||
    process.env.GMAIL_USER?.trim() ||
    fromAddress;

  const info = await getTransporter().sendMail({
    from: `"${BRAND.name} Website" <${fromAddress}>`,
    to,
    // Replies land back in the institute inbox.
    replyTo: process.env.MAIL_REPLY_TO?.trim() || `"${BRAND.name}" <${BRAND.email}>`,
    subject: `New Enquiry - ${data.name} (${data.course})`,
    text: [
      "New enquiry from the BICT Computer Education website.",
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Course: ${data.course}`,
      "",
      `Sent: ${new Date().toISOString()}`,
    ].join("\n"),
    html: buildHtmlEmail(data),
  });

  return { messageId: info.messageId, to };
}

/** Lightweight connectivity + credential check (used by the health endpoint). */
export async function verifyMailer() {
  return getTransporter().verify();
}

export { describeMailError };