/**
 * Single source of truth for the public site URL.
 *
 * Next.js needs this to emit **absolute** URLs in Open Graph / Twitter /
 * canonical tags — without it those tags are relative and every social scraper
 * and search engine ignores the preview image.
 *
 * Priority:
 *  1. NEXT_PUBLIC_SITE_URL  — set this to your real domain (recommended).
 *  2. VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL — set automatically by Vercel.
 *  3. http://localhost:3000 — local development fallback.
 */
function normalize(raw?: string): string | null {
  const value = raw?.trim();
  if (!value) return null;

  // Accept "example.com" as well as "https://example.com/".
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    return url.origin;
  } catch {
    return null;
  }
}

export const SITE_URL =
  normalize(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalize(process.env.VERCEL_URL) ??
  "http://localhost:3000";

/** Absolute URL for a path that lives in `public/`. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/** The 1200x630 social preview image, as an absolute URL. */
export const OG_IMAGE = {
  url: absoluteUrl("/og-image.png"),
  width: 1200,
  height: 630,
  alt: "BICT Computer Education — CCA, CFA, DCA, DFA, DTP, ADCA and Tally Prime courses in Patna",
} as const;

export const SITE_NAME = "BICT Computer Education";
export const SITE_DESCRIPTION =
  "A Complete IT Professional Training Institute in Patna. Approved certificate, one person one computer, daily doubt classes and 100% job assistance.";