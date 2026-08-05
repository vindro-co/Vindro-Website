import type { Metadata } from "next";
import Link from "next/link";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import Logo from "@/components/Logo";
import { BOOKING_PATH, EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  // The root layout applies a "%s | Vindro" template, so no brand suffix here.
  title: "Book a demo",
  description:
    "Pick a time for a free 15-minute demo. Hear a receptionist trained on a home service business like yours and walk through your own numbers.",
  alternates: { canonical: BOOKING_PATH },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${BOOKING_PATH}`,
    // openGraph.title is not templated — spell the brand out.
    title: "Book a demo | Vindro",
    description:
      "Pick a time for a free 15-minute demo of your AI voice receptionist.",
  },
};

const REASSURANCE = [
  "Free for 30 days",
  "No setup costs",
  "Cancel anytime",
  "Live in 48 hours",
];

export default function BookPage() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Deliberately a slim header rather than the full site nav: this is the
          last step before a booking, so there's no reason to offer exits. The
          logo still goes home for anyone who wants back out. */}
      <header className="border-b border-line bg-white/85 backdrop-blur-[14px]">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-[13px]">
          <Logo priority />
          <Link
            href="/"
            className="text-sm font-medium text-ink-soft no-underline transition-colors hover:text-ink"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="container-x py-[clamp(40px,6vw,72px)]">
        <div className="mx-auto mb-9 max-w-[620px] text-center">
          <div className="eyebrow justify-center">Book a demo</div>
          <h1 className="mt-4 font-display text-[clamp(30px,4vw,42px)] font-normal leading-[1.1] tracking-[-0.03em]">
            Pick a time that works for you
          </h1>
          <p className="mt-[18px] text-[16.5px] text-ink-soft">
            Fifteen minutes. You&apos;ll hear a receptionist trained on a business
            like yours, and we&apos;ll walk through what unanswered calls are
            costing you — then quote you on the spot.
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[13px] font-medium text-ink-faint">
            {REASSURANCE.map((item, i) => (
              <li key={item} className="flex items-center gap-2.5">
                {i > 0 && (
                  <span aria-hidden="true" className="text-line">
                    ·
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto max-w-[900px]">
          {/* Calendly requires min-width:320px. On a 320px-wide viewport the
              container's 24px padding would push it past the edge, so cancel
              that padding below `sm` and let the scheduler run full-bleed. */}
          <div className="-mx-6 sm:mx-0">
            <CalendlyEmbed />
          </div>

          <p className="mt-6 text-center text-[13.5px] text-ink-faint">
            Prefer email? Reach us at{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-ink-soft underline underline-offset-2"
            >
              {EMAIL}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
