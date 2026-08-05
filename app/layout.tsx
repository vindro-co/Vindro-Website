import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { SITE_URL } from "@/lib/site";
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

/** ~57 chars — stays inside Google's ~60-char title cutoff. */
const TITLE = "AI Receptionists for GTA Home Service Businesses | Vindro";

/** ~152 chars — inside the ~155-char snippet cutoff, leads with the offer. */
const DESCRIPTION =
  "Vindro builds and manages a human-sounding AI receptionist for your home service business. Every call answered in under a second, 24/7. Free for 30 days.";

const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Vindro — every call booked, every job captured, zero extra staff.",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Any future page can set a short title and inherit the brand suffix.
    template: "%s | Vindro",
  },
  description: DESCRIPTION,
  applicationName: "Vindro",
  keywords: [
    "AI voice receptionist",
    "AI answering service",
    "home services answering service",
    "plumbing answering service",
    "HVAC answering service",
    "electrician call answering",
    "roofing answering service",
    "AI receptionist for contractors",
    "24/7 dispatch for home services",
    "after hours call answering Toronto",
    "GTA home service businesses",
  ],
  authors: [{ name: "Vindro" }],
  creator: "Vindro",
  publisher: "Vindro",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vindro",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_CA",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  // No phone number on the site, so stop iOS turning stray digits (job values,
  // ROI figures) into tap-to-call links. Email/address are listed for the same
  // reason; the explicit mailto: links are unaffected by format detection.
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    // The supplied mark is near-white (#f3f3f1), so it only reads on a dark tab
    // bar. Ship the same shape inked for light UI and let the browser pick.
    // Light-scheme entry is last so browsers without `media` support land on it.
    icon: [
      {
        url: "/icon-on-dark.png",
        type: "image/png",
        sizes: "512x512",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/icon-on-light.png", type: "image/png", sizes: "512x512" },
    ],
    // Opaque: iOS composites transparency to black on the home screen.
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
      className={`${inter.variable} ${interTight.variable}`}
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
