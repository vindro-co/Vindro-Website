import Reveal from "./ui/Reveal";
import { SECTIONS } from "@/lib/site";

const STEPS = [
  {
    number: "01",
    title: "We learn your business",
    body: "We map everything a great dispatcher would know: the trades you run (plumbing, HVAC, electrical, roofing, appliance repair — whatever you cover), your GTA service area, emergency vs. standard pricing rules, your on-call schedule, and the booking and dispatch tools your team already uses.",
    list: [
      "Trades, service area & pricing rules",
      "Dispatch, booking & calendar systems",
      "On-call schedule, policies & FAQs",
    ],
  },
  {
    number: "02",
    title: "We build your custom agent",
    body: "Designed from scratch for your company — its voice, its knowledge, its workflows, and strict guardrails so it never quotes a price you didn't approve or books a slot you can't cover.",
    list: [
      "Custom voice & personality to match your brand",
      "Connected to your dispatch & scheduling tools",
      "Tested against hundreds of simulated calls before launch",
    ],
  },
  {
    number: "03",
    title: "We manage it forever",
    body: "Vindro monitors every call, tunes the agent weekly, and keeps it running. Seasons change, prices change, on-call changes — we update the agent. You never touch a dashboard unless you want to.",
    list: [
      "24/7 monitoring & uptime",
      "Continuous improvements from real call data",
      "Weekly performance report in your inbox",
    ],
  },
];

export default function HowItWorks() {
  return (
    <section id={SECTIONS.howItWorks} className="section border-y border-line bg-bg-soft">
      <div className="container-x">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow justify-center">Fully done for you</div>
            <h2 className="mt-4">You run the trucks. We run the phones.</h2>
            <p>
              No software to learn. No prompts to write. No engineers to hire. Vindro is a
              managed service from day one to every day after — this is done-for-you, not
              do-it-yourself.
            </p>
          </div>
        </Reveal>

        <ol className="mx-auto grid max-w-[560px] gap-[18px] lg:max-w-none lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} as="li" delay={i * 0.08} className="h-full">
              <div className="h-full rounded-xl2 border border-line bg-white px-[30px] py-8 transition-all duration-[250ms] hover:-translate-y-1 hover:border-ink-faint hover:shadow-soft">
                <div className="mb-[22px] flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-line bg-bg-alt text-[13px] font-semibold text-ink">
                  {step.number}
                </div>

                <h3 className="mb-3 text-xl tracking-[-0.02em]">{step.title}</h3>
                <p className="mb-[18px] text-sm text-ink-soft">{step.body}</p>

                <ul className="flex flex-col gap-2">
                  {step.list.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 text-[13.5px] font-medium text-ink-soft before:absolute before:left-0 before:text-ink before:content-['→']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
