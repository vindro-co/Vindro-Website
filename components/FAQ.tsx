import Reveal from "./ui/Reveal";
import { SECTIONS } from "@/lib/site";

const FAQS = [
  {
    q: "Will it actually sound human?",
    a: "It's built on enterprise-grade voice AI — natural pacing, natural tone, and interruptions handled gracefully. Most callers can't tell. Book a demo and we'll call you with it so you can judge for yourself.",
  },
  {
    q: "What does the free trial actually include?",
    a: "Everything. The custom build, the integrations, the launch, the weekly reports and the ongoing management — free for your first 30 days, running on your real phone line. There are no setup costs, and you can cancel anytime without an exit fee.",
  },
  {
    q: "Can it handle a real emergency call?",
    a: "Yes. It triages urgent calls first — a flood, no heat, no power — gathers the details your tech needs, and books the earliest available emergency slot, or transfers to your on-call line if you prefer. Strict guardrails mean it never guesses or promises a time you can't cover.",
  },
  {
    q: "Does it work for my trade?",
    a: "If you send crews to people's homes, yes. We build agents for plumbing, HVAC, electrical, roofing, appliance repair, garage doors, restoration, pest control and more. The trade changes what it knows and how it triages — the build process is the same.",
  },
  {
    q: "How does it know my services, pricing, and service area?",
    a: "During onboarding we connect your dispatch, booking, and calendar tools and load your services, pricing rules, service area, and policies. When your season or pricing changes, we update the agent as part of your management plan.",
  },
  {
    q: "Do I need to change my phone number?",
    a: "No. We forward your existing line — all calls, overflow-only, or after-hours-only, your choice. Your customers dial the same number they always have.",
  },
  {
    q: "How fast can I be live?",
    a: "14 days from kickoff, typically. We build, integrate, and stress-test on simulated calls first — it never learns on your real customers.",
  },
  {
    q: "What's in the weekly report?",
    a: "Calls answered, after-hours calls captured, jobs and service booked, estimated revenue recovered, top caller requests, and what we improved that week. Five minutes to read, every Monday.",
  },
  {
    q: "What does it cost after the trial?",
    a: "Less than a full-time dispatcher, and it works every hour your phone can ring — including the 2 AM emergency. Exact pricing depends on your call volume and integrations, so we quote it on the 15-minute demo once we've seen your numbers. You won't be charged anything during the first 30 days, and you can cancel before it ends.",
  },
];

export default function FAQ() {
  return (
    <section id={SECTIONS.faq} className="section border-t border-line bg-white">
      <div className="container-x">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow justify-center">Straight answers</div>
            <h2 className="mt-4">Frequently asked questions</h2>
          </div>
        </Reveal>

        <div className="mx-auto flex max-w-[820px] flex-col gap-2.5">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.04}>
              <details className="faq-item" open={i === 0}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
