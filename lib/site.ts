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

/**
 * Where every "Book a demo" CTA goes: an on-domain page hosting the Calendly
 * embed. Keeping visitors on vindro.co preserves the branding through the most
 * important step and gives us a page to attach conversion tracking to, which a
 * calendly.com hand-off cannot.
 */
export const BOOKING_PATH = "/book";

/** Calendly scheduling page — embed source, and the fallback if the embed fails. */
export const BOOKING_URL = "https://calendly.com/noel-vindro";

/** `hide_gdpr_banner` suppresses Calendly's own cookie notice inside the frame. */
export const BOOKING_EMBED_URL = `${BOOKING_URL}?hide_gdpr_banner=1`;

/** Spread onto genuinely outbound links. */
export const EXTERNAL_LINK = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** Public ElevenLabs agent powering the on-site voice demo. */
export const ELEVENLABS_AGENT_ID = "agent_9101kza1zrycfqvbaza8rr732f6y";

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
