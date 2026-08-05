import Orb from "./ui/Orb";
import Reveal from "./ui/Reveal";
import Link from "next/link";
import { BOOKING_PATH, SECTIONS } from "@/lib/site";

const USE_CASES = [
  {
    title: "Emergencies & after-hours",
    quote: "“My basement is flooding.”",
    variant: 1 as const,
  },
  {
    title: "Job & service booking",
    quote: "“Can someone come take a look?”",
    variant: 2 as const,
  },
  {
    title: "Quote & estimate requests",
    quote: "“How much for a new water heater?”",
    variant: 3 as const,
  },
  {
    title: "Overflow when crews are busy",
    quote: "“Are you open right now?”",
    variant: 4 as const,
  },
];

function Message({
  who,
  children,
  agent,
}: {
  who: string;
  children: React.ReactNode;
  agent?: boolean;
}) {
  return (
    <div
      className={[
        "max-w-[92%] rounded-[13px] px-3.5 py-2.5 text-[13.5px] leading-[1.45]",
        agent
          ? "self-start rounded-bl-[4px] bg-ink text-white"
          : "self-end rounded-br-[4px] bg-bg-alt text-ink",
      ].join(" ")}
    >
      <span
        className={`mb-[3px] block text-[10px] font-bold uppercase tracking-[0.07em] ${
          agent ? "text-white/55" : "text-ink-faint"
        }`}
      >
        {who}
      </span>
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-[64px] pt-[56px] md:pb-[72px] md:pt-[84px]">
      <div className="container-x grid items-center gap-[70px] lg:grid-cols-[1.1fr_.9fr] lg:gap-[60px]">
        {/* ---------------------------------------------------------- Copy */}
        <div>
          <Reveal>
            <div className="eyebrow mb-6">
              <span className="pulse-dot" />
              AI voice receptionists for home service businesses
            </div>

            {/* 9vw floor rather than a fixed 40px: the headline's <br> breaks are
                deliberate, and at 40px "Every job captured." overflowed a 375px
                screen and wrapped to a 4th line. Caps at 64px from ~711px up, so
                desktop is unchanged. */}
            <h1 className="font-display text-[clamp(30px,9vw,64px)] font-bold leading-[1.04] tracking-[-0.035em]">
              Every call booked.
              <br />
              Every job captured.
              <br />
              <em className="not-italic text-ink-faint">Zero extra staff.</em>
            </h1>

            <p className="mb-8 mt-6 max-w-[540px] text-[17px] text-ink-soft">
              Vindro designs, builds, and manages a human-sounding AI receptionist
              custom-trained on <strong className="font-semibold text-ink">your</strong>{" "}
              home service business — your trades, your service area, your dispatch and
              booking system. It answers every call in under a second, 24/7, so an
              emergency at 2 AM becomes a booked job instead of a voicemail your competitor
              calls back.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href={BOOKING_PATH} className="btn btn-primary btn-lg">
                Book a free demo
              </Link>
              <a href={`#${SECTIONS.demo}`} className="btn btn-ghost btn-lg">
                ▶&nbsp; Hear the receptionist
              </a>
            </div>

            <ul className="mt-[30px] flex flex-col gap-[9px]">
              {[
                { text: "Free for your first 30 days — no setup costs" },
                { text: "Live in 48 hours — fully done with you" },
                {
                  text: "Weekly performance reports — ",
                  link: { label: "cancel anytime", href: `#${SECTIONS.offer}` },
                },
              ].map((item) => (
                <li
                  key={item.text}
                  className="relative pl-6 text-[14.5px] text-ink-soft before:absolute before:left-0 before:font-semibold before:text-ink before:content-['✓']"
                >
                  {item.text}
                  {item.link && (
                    <a
                      href={item.link.href}
                      className="font-semibold text-ink underline underline-offset-[3px]"
                    >
                      {item.link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* -------------------------------------------------------- Visual */}
        {/* Single card, so it sits in normal flow and the column sizes to it —
            no fixed min-height to leave a gap. */}
        {/* mx-auto centres it while stacked; lg:mr-0 flushes it to the column's
            right edge on desktop. (Don't use justify-self here — auto margins
            win over justify-self in grid, so it would stay centred.) */}
        <div className="mx-auto w-full max-w-[380px] lg:mr-0">
          {/* Call transcript */}
          <div className="animate-float-1 w-full rounded-xl2 border border-line bg-white p-5 shadow-lg2">
            <div className="mb-3.5 flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.07em] text-ink-faint">
              <span className="inline-block h-[7px] w-[7px] rounded-full bg-green" />
              Incoming call · 2:14 AM
            </div>

            <div className="flex flex-col gap-2.5">
              <Message who="Vindro AI" agent>
                “Thanks for calling Maple Ridge Home Services — is this an emergency?”
              </Message>
              <Message who="Caller">
                “Yeah, there&apos;s water pouring out under my sink. Can someone come out?”
              </Message>
              <Message who="Vindro AI" agent>
                “Let&apos;s get that shut off. I can book an emergency tech for 7 AM today.
                Confirm?”
              </Message>
            </div>

            <div className="mt-3.5 flex flex-wrap gap-2">
              <span className="tag tag-solid">Job booked · $420</span>
              <span className="tag">After hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ Use cases */}
      <div className="container-x mt-[84px] grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map((useCase, i) => (
          <Reveal key={useCase.title} delay={i * 0.06}>
            <a
              href={`#${SECTIONS.demo}`}
              className="flex items-center gap-3.5 rounded-card border border-line bg-white px-[18px] py-4 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-faint hover:shadow-soft"
            >
              <Orb variant={useCase.variant} className="h-10 w-10 shrink-0" />
              <div>
                <b className="block text-sm font-semibold tracking-[-0.01em]">
                  {useCase.title}
                </b>
                <span className="mt-px block text-[12.5px] text-ink-faint">
                  {useCase.quote}
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
