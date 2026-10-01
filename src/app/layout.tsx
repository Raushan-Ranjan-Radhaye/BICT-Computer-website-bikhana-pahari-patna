import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Toaster from "./components/Toaster";

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
  title: "BICT Computer Education | CCA, CFA, DCA, DFA, DTP, ADCA Courses in Patna",
  description:
    "BICT Computer Education is a leading provider of computer education and training programs in Patna. We offer a wide range of courses and certifications — CCA, CFA, DCA, DFA, DTP, ADCA, Tally Prime, DTP, Web Designing and Computer Typing — with one person one computer, daily doubt classes and 100% job assistance.",
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
  openGraph: {
    title: "BICT Computer Education",
    description:
      "A Complete IT - Professional Training Institute. Approved certificate, one person one computer, daily doubt classes and 100% job assistance.",
    type: "website",
  },
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
