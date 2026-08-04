import CountUp from "./ui/CountUp";
import Orb from "./ui/Orb";
import Reveal from "./ui/Reveal";
import { BOOKING_URL, EXTERNAL_LINK, SECTIONS } from "@/lib/site";

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

            <h1 className="font-hero text-[clamp(40px,5.2vw,64px)] font-bold leading-[1.05] tracking-[-0.02em]">
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
              <a
                href={BOOKING_URL}
                {...EXTERNAL_LINK}
                className="btn btn-primary btn-lg"
              >
                Book a free demo
              </a>
              <a href={`#${SECTIONS.demo}`} className="btn btn-ghost btn-lg">
                ▶&nbsp; Hear the receptionist
              </a>
            </div>

            <ul className="mt-[30px] flex flex-col gap-[9px]">
              {[
                { text: "Free for your first 30 days — no setup costs" },
                { text: "Live in 14 days — fully done for you" },
                {
                  text: "Weekly performance reports, every Monday — ",
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
        {/* Tall enough that the floating stat cards sit clear of the transcript
            card's footer tags instead of covering them. */}
        <div className="relative mx-auto min-h-[560px] w-full max-w-[480px] lg:max-w-none">
          {/* Call transcript */}
          <div className="animate-float-1 absolute right-0 top-0 w-[min(380px,100%)] rounded-xl2 border border-line bg-white p-5 shadow-lg2">
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

          {/* Stat cards */}
          <div className="animate-float-2 absolute bottom-6 left-0 rounded-card border border-line bg-white px-[22px] py-[18px] shadow-lg2">
            <div className="font-display text-[32px] font-normal leading-[1.1] tracking-[-0.03em]">
              <CountUp to={312} />
            </div>
            <div className="mt-1 text-[12.5px] leading-[1.4] text-ink-faint">
              emergency calls booked this
              <br />
              month across Vindro clients
            </div>
          </div>

          {/* left-[54%] clears the wider stat card beside it (which ends at ~51%). */}
          <div className="animate-float-3 absolute -bottom-2.5 right-0 rounded-card border border-line bg-white px-[22px] py-[18px] shadow-lg2 sm:left-[54%] sm:right-auto">
            <div className="font-display text-[26px] font-normal leading-[1.1] tracking-[-0.03em]">
              <CountUp to={8} suffix="s" />
            </div>
            <div className="mt-1 text-[12.5px] leading-[1.4] text-ink-faint">
              longest hold time, ever
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
