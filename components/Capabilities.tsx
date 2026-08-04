import Reveal from "./ui/Reveal";
import { SECTIONS } from "@/lib/site";

/**
 * What the receptionist can actually do on a call. Deliberately does not name
 * the underlying voice-AI vendor — the stack is ours to change.
 */
const CAPABILITIES = [
  {
    title: "Answers in under a second",
    body: "Sub-second response with natural pacing — no dead air, no “please hold while I look that up.”",
  },
  {
    title: "Handles interruptions",
    body: "Callers can cut in, backtrack, or change their mind mid-sentence. It keeps up the way a person would.",
  },
  {
    title: "Reads the caller's tone",
    body: "It adapts to real emotion, so someone standing in an inch of water at 2 AM gets urgency, not a script.",
  },
  {
    title: "Speaks 70+ languages",
    body: "And switches mid-conversation. Across the GTA, that's a real share of your inbound calls.",
  },
  {
    title: "Unlimited simultaneous calls",
    body: "A storm or a cold snap can ring every line at once. Nobody gets a busy tone, nobody gets voicemail.",
  },
  {
    title: "Books into your calendar",
    body: "Checks real availability, books the slot, reschedules and confirms — without your office touching it.",
  },
  {
    title: "Triages emergencies first",
    body: "Floods, no heat and no power are flagged urgent, and messages are recorded with priority levels.",
  },
  {
    title: "Warm-transfers to on-call",
    body: "Routes to the right person by rule or time of day, and hands over the full context so nobody repeats themselves.",
  },
  {
    title: "Trained on your knowledge base",
    body: "Your trades, service area, pricing rules and policies. Anything it can't answer is logged as a gap we close.",
  },
  {
    title: "Captures & qualifies leads",
    body: "Quote and estimate requests come through with the details and intent scored, so you know which ones are real.",
  },
  {
    title: "Summary, transcript & recording",
    body: "Every call, searchable — and the raw material behind your Monday performance report.",
  },
  {
    title: "Connects to your stack",
    body: "Google Calendar, HubSpot, Salesforce, Zapier, webhooks, or your field-service software over API.",
  },
];

export default function Capabilities() {
  return (
    <section id={SECTIONS.capabilities} className="section border-t border-line bg-bg">
      <div className="container-x">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow justify-center">Under the hood</div>
            <h2 className="mt-4">Everything it can do once it picks up.</h2>
            <p>
              Your receptionist runs on enterprise-grade voice AI — the kind handling
              millions of hours of live calls every month — and we tune every one of these
              behaviours around how a home service business actually books work.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid gap-px overflow-hidden rounded-xl2 border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((item) => (
              <div key={item.title} className="bg-white p-7">
                <h3 className="text-[16px] font-semibold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-[720px] text-center text-[13px] leading-relaxed text-ink-faint">
            Built on SOC 2 Type II and ISO 27001 certified infrastructure, encrypted in
            transit and at rest. Your agent gets a voice matched to your brand — or a
            custom clone of a voice you already use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
