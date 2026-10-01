import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Toaster from "./components/Toaster";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  /* Required so Open Graph / Twitter / canonical tags are emitted as
     absolute URLs. Without it social scrapers cannot load the preview image. */
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BICT Computer Education | CCA, CFA, DCA, DFA, DTP, ADCA Courses in Patna",
    template: "%s | BICT Computer Education",
  },
  description:
    "BICT Computer Education is a leading provider of computer education and training programs in Patna. We offer a wide range of courses and certifications — CCA, CFA, DCA, DFA, DTP, ADCA, Tally Prime, DTP, Web Designing and Computer Typing — with one person one computer, daily doubt classes and 100% job assistance.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  keywords: [
    "BICT Computer Education",
    "computer course Patna",
    "CCA course",
    "CFA Tally Prime course",
    "ADCA course Patna",
    "DTP course",
    "computer typing course",
    "Saidpur More Patna computer institute",
  ],
  /* ---- Canonical URL (avoids www / apex duplication) ---- */
  alternates: {
    canonical: "/",
  },
  /* ---- Indexing directives ---- */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /* ---- Open Graph (Facebook, WhatsApp, LinkedIn, Instagram) ---- */
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    title:
      "BICT Computer Education | Computer Courses in Patna (ADCA, DCA, Tally)",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  /* ---- Twitter / X card ---- */
  twitter: {
    card: "summary_large_image",
    site: "@bictcomputer",
    creator: "@bictcomputer",
    title:
      "BICT Computer Education | Computer Courses in Patna (ADCA, DCA, Tally)",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  /* ---- PWA / notifications on phones and desktops ---- */
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BICT Computer",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#e11f56",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
