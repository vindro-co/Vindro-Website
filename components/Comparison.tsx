import Reveal from "./ui/Reveal";
import { BOOKING_URL, EXTERNAL_LINK, SECTIONS } from "@/lib/site";

type Mark = "yes" | "mid" | "no";

type Option = {
  label?: string;
  badge?: string;
  title: string;
  points: { mark: Mark; text: React.ReactNode }[];
  verdict: string;
  vindro?: boolean;
};

const MARK_STYLE: Record<Mark, string> = {
  yes: "before:content-['✓'] before:text-green",
  mid: "before:content-['~'] before:text-[#d97706] before:text-[15px]",
  no: "before:content-['✕'] before:text-[#dc2626]",
};

const OPTIONS: Option[] = [
  {
    label: "Option 1",
    title: "Hire a receptionist / dispatcher",
    points: [
      { mark: "yes", text: "Genuinely human on every call" },
      { mark: "no", text: "$45,000+ a year in salary before benefits and training" },
      { mark: "no", text: "Breaks, lunches, sick days, vacations" },
      { mark: "no", text: "One call at a time — a storm rush still rings busy" },
      { mark: "no", text: "Clocks out at 5 PM; the 2 AM emergency goes to voicemail" },
      { mark: "no", text: "Months of training walk out the door if they quit" },
    ],
    verdict: "The old default",
  },
  {
    label: "Option 2",
    title: "Generic AI answering services",
    points: [
      { mark: "yes", text: "Answers 24/7" },
      { mark: "yes", text: "Never sick, never on break, never quits" },
      { mark: "mid", text: "Built on older, cheaper AI — callers can tell it's a robot" },
      {
        mark: "no",
        text: "Doesn't understand the trades: fumbles emergencies, quotes wrong, frustrates panicked callers",
      },
      { mark: "no", text: "High per-minute cost or flat retainers for minutes you never use" },
      {
        mark: "no",
        text: "Template setups — the same generic agent for a dentist, a law firm, and you",
      },
    ],
    verdict: "Better than voicemail — but built on yesterday's AI",
  },
  {
    badge: "Vindro",
    title: "A custom agent, managed for you",
    vindro: true,
    points: [
      {
        mark: "yes",
        text: "Runs on the latest, most advanced voice AI — callers can't tell it isn't human",
      },
      {
        mark: "yes",
        text: (
          <>
            Fully customizable, built on{" "}
            <em className="not-italic font-semibold text-ink">your</em> trades, service
            area, and pricing rules
          </>
        ),
      },
      {
        mark: "yes",
        text: "Understands home services — triages emergencies, books jobs, captures quote requests",
      },
      { mark: "yes", text: "Unlimited simultaneous calls, 24/7/365, even in a storm" },
      {
        mark: "yes",
        text: "Usage-based pricing — you pay by call volume, never for AI you aren't using",
      },
      { mark: "yes", text: "Weekly performance reports and hands-on management included" },
    ],
    verdict: "The Vindro standard",
  },
];

export default function Comparison() {
  return (
    <section id={SECTIONS.comparison} className="section bg-bg">
      <div className="container-x">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow justify-center">Know your options</div>
            <h2 className="mt-4">
              Every home service business answers the phone somehow.
              <br />
              Not all answers are equal.
            </h2>
            <p>
              There are three ways to handle your phones. Here&apos;s the honest comparison
              we walk every owner through.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-[560px] items-stretch gap-[18px] lg:max-w-none lg:grid-cols-3">
          {OPTIONS.map((option, i) => (
            <Reveal key={option.title} delay={i * 0.08} className="h-full">
              <div
                className={[
                  "flex h-full flex-col rounded-xl2 border bg-white px-7 py-8 transition-all duration-[250ms] hover:-translate-y-1",
                  option.vindro
                    ? "border-green/60 hover:shadow-[0_0_0_1px_rgba(22,163,74,.3),0_0_32px_-6px_rgba(22,163,74,.45)]"
                    : "border-line hover:shadow-soft",
                ].join(" ")}
              >
                {option.badge ? (
                  <span className="mb-3.5 self-start rounded-full border border-green/40 bg-green/10 px-3.5 py-[5px] text-[11px] font-semibold uppercase tracking-[0.1em] text-[#15803d]">
                    {option.badge}
                  </span>
                ) : (
                  <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                    {option.label}
                  </div>
                )}

                <h3 className="mb-5 text-[21px] tracking-[-0.02em]">{option.title}</h3>

                <ul className="flex flex-1 flex-col gap-[13px]">
                  {option.points.map((point, j) => (
                    <li
                      key={j}
                      className={`relative pl-7 text-sm leading-[1.5] text-ink-soft before:absolute before:left-0 before:top-0 before:text-[13px] before:font-bold ${
                        MARK_STYLE[point.mark]
                      }`}
                    >
                      {point.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-line pt-[18px] text-[13px] font-semibold text-ink-faint">
                  {option.verdict}
                </div>

                {option.vindro && (
                  <a
                    href={BOOKING_URL}
                    {...EXTERNAL_LINK}
                    className="btn btn-primary mt-5 self-start"
                  >
                    Book a free demo
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
