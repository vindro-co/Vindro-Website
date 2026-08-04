/** Single source of truth for links, CTAs and section anchors. */

/** Live domain. Drives metadataBase, canonical, OG tags, sitemap and JSON-LD. */
export const SITE_URL = "https://vindro.co";

export const SECTIONS = {
  demo: "demo",
  howItWorks: "how-it-works",
  comparison: "comparison",
  reporting: "reporting",
  roi: "roi-calculator",
  offer: "offer",
  capabilities: "capabilities",
  faq: "faq",
  contact: "contact",
} as const;

export const EMAIL = "noel@vindro.co";
export const PHONE_DISPLAY = "437-265-0812";
export const PHONE_HREF = "tel:+14372650812";

/** Primary CTA — the 15-minute demo booking page. */
export const BOOKING_URL = "https://calendly.com/noel-vindro/30min";

/** Spread onto every outbound booking link. */
export const EXTERNAL_LINK = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Public ElevenLabs agent powering the on-site voice demo. */
export const ELEVENLABS_AGENT_ID = "agent_6101kz478n5ee82tz8d4cd7w3pz2";

/**
 * Pinned rather than floating on `latest` — an unversioned unpkg URL can ship a
 * breaking widget build to production without any change on our side.
 */
export const ELEVENLABS_WIDGET_SRC =
  "https://unpkg.com/@elevenlabs/convai-widget-embed@0.15.1/dist/index.js";

export const NAV_LINKS = [
  { label: "How it works", href: `#${SECTIONS.howItWorks}` },
  { label: "Reporting", href: `#${SECTIONS.reporting}` },
  { label: "ROI calculator", href: `#${SECTIONS.roi}` },
  { label: "What it does", href: `#${SECTIONS.capabilities}` },
  { label: "FAQ", href: `#${SECTIONS.faq}` },
] as const;
