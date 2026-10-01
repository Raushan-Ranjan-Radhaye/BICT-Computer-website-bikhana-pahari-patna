import { sendEnquiryEmail, describeMailError, type EnquiryPayload } from "@/app/lib/mailer";
import { BRAND } from "@/app/data";

export const runtime = "nodejs";

/* Very small in-memory throttle so one visitor cannot flood the inbox. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing forever.
  if (hits.size > 5000) hits.clear();

  return recent.length > MAX_PER_WINDOW;
}

/** Simple server-side sanity checks so junk never reaches the inbox. */
function validate(body: Partial<EnquiryPayload> & { website?: string }) {
  const errors: string[] = [];

  if (!body.name || body.name.trim().length < 2) errors.push("Please enter your name.");
  if (!body.phone || body.phone.trim().replace(/\D/g, "").length < 10) {
    errors.push("Please enter a valid phone number.");
  }
  if (!body.course || body.course.trim().length < 2) {
    errors.push("Please select a course.");
  }

  return errors;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local";

  if (rateLimited(ip)) {
    return Response.json(
      {
        success: false,
        message: `Too many requests. Please call us on ${BRAND.phoneRaw}.`,
      },
      { status: 429 },
    );
  }

  let body: Partial<EnquiryPayload> & { website?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot filled => bot. Pretend success so it learns nothing.
  if (body.website) {
    return Response.json({ success: true, message: "Enquiry sent successfully." });
  }

  const errors = validate(body);
  if (errors.length) {
    return Response.json({ success: false, message: errors[0] }, { status: 400 });
  }

  const data: EnquiryPayload = {
    name: String(body.name).trim().slice(0, 80),
    phone: String(body.phone).trim().slice(0, 20),
    course: String(body.course).trim().slice(0, 120),
  };

  try {
    await sendEnquiryEmail(data);
    return Response.json({
      success: true,
      message: "Enquiry sent successfully.",
    });
  } catch (error) {
    const reason = describeMailError(error);
    console.error(`[enquiry] Failed to send email: ${reason}`);

    const notConfigured = reason.includes("not configured");
    return Response.json(
      {
        success: false,
        message: notConfigured
          ? "Email service is not configured yet. Please call us directly."
          : "Something went wrong while sending your enquiry. Please call us on " +
            BRAND.phoneRaw +
            ".",
      },
      { status: notConfigured ? 503 : 500 },
    );
  }
}