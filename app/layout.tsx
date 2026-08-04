import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

const SITE_URL = "https://vindro.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Vindro | AI Voice Receptionists for Home Service Businesses. Every Call Booked.",
  description:
    "Vindro builds, runs, and manages a human-sounding AI voice receptionist custom-made for your home service business. Never lose another emergency call to voicemail. Live in 14 days, fully done for you.",
  applicationName: "Vindro",
  keywords: [
    "AI voice receptionist",
    "home services answering service",
    "plumbing answering service",
    "HVAC answering service",
    "electrician call answering",
    "AI receptionist for contractors",
    "24/7 dispatch for home services",
    "GTA home service businesses",
  ],
  authors: [{ name: "Vindro" }],
  creator: "Vindro",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vindro",
    title:
      "Vindro | AI Voice Receptionists for Home Service Businesses. Every Call Booked.",
    description:
      "A human-sounding AI receptionist custom-trained on your home service business. Answers in under a second, 24/7, and books the job instead of losing it to voicemail.",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vindro | AI Voice Receptionists for Home Service Businesses",
    description:
      "Every call booked. Every job captured. Zero extra staff. Done-for-you AI receptionists for home service businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: "/apple-icon.png",
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-CA"
      className={`${inter.variable} ${interTight.variable} ${bricolage.variable}`}
    >
      <body className="font-sans">
        {/* Scroll-reveal wrappers render with opacity:0 until Framer Motion
            animates them in. Without JS that would hide the page, so force
            them visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-bar]{transform:scaleY(1)!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
