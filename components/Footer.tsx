import Logo from "./Logo";
import { BOOKING_PATH, EMAIL, SECTIONS } from "@/lib/site";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "How it works", href: `#${SECTIONS.howItWorks}` },
      { label: "Weekly reporting", href: `#${SECTIONS.reporting}` },
      { label: "ROI calculator", href: `#${SECTIONS.roi}` },
      { label: "What it does", href: `#${SECTIONS.capabilities}` },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "The offer", href: `#${SECTIONS.offer}` },
      { label: "FAQ", href: `#${SECTIONS.faq}` },
      { label: "Book a demo", href: BOOKING_PATH },
      { label: EMAIL, href: `mailto:${EMAIL}` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white pb-[30px] pt-[60px]">
      <div className="container-x">
        <div className="grid gap-[34px] pb-11 md:grid-cols-[1.4fr_1fr_1fr] md:gap-[50px]">
          <div>
            <Logo height={24} />
            <p className="mt-4 max-w-[320px] text-sm text-ink-soft">
              Done-with-you AI voice receptionists for home service businesses. Every call
              booked. Every job captured.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-faint">
                {column.title}
              </div>
              <div className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-ink-soft no-underline transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-5 border-t border-line pt-6 text-[13px] text-ink-faint">
          <p>© 2026 Vindro. All rights reserved.</p>
          <p>Built for home service businesses that refuse to miss a call.</p>
        </div>
      </div>
    </footer>
  );
}
