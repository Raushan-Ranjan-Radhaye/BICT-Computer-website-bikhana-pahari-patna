import { sendEnquiryEmail, type EnquiryPayload } from "@/app/lib/mailer";
import { BRAND } from "@/app/data";

export const runtime = "nodejs";

/** Simple server-side sanity checks so junk never reaches the inbox. */
function validate(body: Partial<EnquiryPayload> & { website?: string }) {
  const errors: string[] = [];

  if (!body.name || body.name.trim().length < 2) errors.push("Please enter your name.");
  if (!body.phone || body.phone.trim().replace(/\D/g, "").length < 10) {
    errors.push("Please enter a valid phone number.");
  }
  if (!body.course) errors.push("Please select a course.");

  // Block obviously fake values (honeypot field left filled by a bot).
  if (body.website) errors.push("Invalid submission.");

  return errors;
}

export async function POST(request: Request) {
  let body: Partial<EnquiryPayload> & { website?: string };

  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: "Invalid request body." }, { status: 400 });
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
    const { to } = await sendEnquiryEmail(data);
    return Response.json({
      success: true,
      message: "Enquiry sent successfully.",
      to,
    });
  } catch (error) {
    console.error("[enquiry] Failed to send email:", error);
    return Response.json(
      {
        success: false,
        message:
          error instanceof Error && error.message.includes("not configured")
            ? "Email service is not configured yet. Please call us directly."
            : "Something went wrong while sending your enquiry. Please call us on " +
              BRAND.phoneRaw +
              ".",
      },
      { status: 500 },
    );
  }
}