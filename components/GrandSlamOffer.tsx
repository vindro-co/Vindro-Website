import Reveal from "./ui/Reveal";
import { BOOKING_URL, EXTERNAL_LINK, SECTIONS } from "@/lib/site";

const STACK = [
  {
    name: "Custom-built AI receptionist",
    benefit: "designed for your trades, your voice, your workflows",
  },
  {
    name: "Full dispatch & booking integration",
    benefit: "connected to your scheduling and calendar tools, done for you",
  },
  {
    name: "Emergency-call triage logic",
    benefit: "urgent calls prioritized and booked first, never mishandled",
  },
  {
    name: "White-glove 14-day launch",
    benefit: "stress-tested on hundreds of simulated calls before it takes one of yours",
  },
  {
    name: "Weekly performance reports",
    benefit: "calls, jobs booked, and dollars recovered, every Monday",
  },
  {
    name: "Unlimited management & tuning",
    benefit:
      "we monitor, update for season and pricing changes, and improve it as long as you're with us",
  },
  {
    name: "Bonus — Storm & cold-snap surge coverage",
    benefit: "unlimited simultaneous calls so a demand spike never rings busy",
    bonus: true,
  },
];

const TERMS = [
  {
    headline: "First 30 days free",
    body: "Run it on your real phone line for a month before you pay us anything.",
  },
  {
    headline: "No setup costs",
    body: "The build, the integrations, the launch — all of it is included, not billed upfront.",
  },
  {
    headline: "Cancel anytime",
    body: "No lock-in and no exit fee. If it isn't earning its keep, walk away.",
  },
];

export default function GrandSlamOffer() {
  return (
    <section id={SECTIONS.offer} className="section bg-bg">
      <div className="container-x">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow justify-center">The Vindro offer</div>
            <h2 className="mt-4">
              The Never-Miss-A-Call System for Home Service Businesses
              <br />— Live in 14 Days.
            </h2>
            <p>Here&apos;s everything you get — built, launched, and managed for you.</p>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-[18px] lg:grid-cols-2">
          {/* ----------------------------------------------- What you get */}
          <Reveal>
            <ul className="flex h-full flex-col gap-3">
              {STACK.map((item) => (
                <li
                  key={item.name}
                  className={[
                    "flex items-center gap-4 rounded-card border bg-white px-6 py-5 transition-all duration-200 hover:translate-x-[5px] hover:border-ink-faint hover:shadow-soft",
                    item.bonus ? "border-ink/25" : "border-line",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white"
                  >
                    ✓
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="text-[15.5px] font-semibold tracking-[-0.01em]">
                      {item.name}
                    </div>
                    <span className="mt-[3px] block text-[13.5px] font-normal text-ink-soft">
                      {item.benefit}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---------------------------------------------------- Terms */}
          <Reveal delay={0.1} className="h-full">
            <div className="on-dark flex h-full flex-col rounded-xl2 bg-ink px-9 py-10 text-white">
              <div className="mb-7 self-start rounded-full border border-white/25 bg-white/10 px-[15px] py-1.5 text-xs font-semibold uppercase tracking-[0.09em]">
                Try it before you pay for it
              </div>

              <h3 className="mb-8 text-[clamp(24px,2.6vw,31px)] leading-[1.15] tracking-[-0.03em]">
                Free for 30 days. No setup costs. Cancel anytime.
              </h3>

              <ul className="flex flex-col gap-6">
                {TERMS.map((term) => (
                  <li key={term.headline} className="border-t border-white/[0.14] pt-5">
                    <div className="text-[15.5px] font-semibold">{term.headline}</div>
                    <p className="mt-1.5 text-[13.5px] leading-[1.6] text-white/65">
                      {term.body}
                    </p>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                <a
                  href={BOOKING_URL}
                  {...EXTERNAL_LINK}
                  className="btn btn-light btn-lg btn-block"
                >
                  Start your free 30 days
                </a>
                <p className="mt-3.5 text-center text-[12.5px] text-white/50">
                  Pricing after the trial depends on your call volume — we quote it on the
                  15-minute demo, once you&apos;ve seen your own numbers.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-10 text-center text-[15px] text-ink-soft">
            You could hire, train, and pray. Or you could be live in 14 days with all of
            the above, managed for you — free for the first month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
