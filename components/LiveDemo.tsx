import Reveal from "./ui/Reveal";
import StartCallButton from "./StartCallButton";
import { BOOKING_URL, EXTERNAL_LINK, SECTIONS } from "@/lib/site";

/**
 * Deliberately routine, non-urgent calls. A visitor trying the demo should not
 * have to role-play an emergency, and these are the bread-and-butter calls the
 * agent handles anyway: a service request, a quote, and a booking.
 */
const PROMPTS = [
  "“There's a small leak under my kitchen sink — can someone take a look?”",
  "“What would you charge to replace a water heater?”",
  "“Can I get on the schedule for a furnace tune-up next week?”",
];

export default function LiveDemo() {
  return (
    <section id={SECTIONS.demo} className="section bg-bg">
      <div className="container-x">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow justify-center">Hear it yourself</div>
            <h2 className="mt-4">Talk is cheap. So we&apos;ll let the receptionist talk.</h2>
            <p>
              This isn&apos;t a recording — it&apos;s a live AI receptionist, right here in
              your browser. Press the button and ask it anything a real customer would.
              You&apos;ll need to allow microphone access.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          {/* Blue accents here (and only here) tie this card to the widget's own
              blue orb, so the two read as one object. The rest of the site stays
              monochrome. */}
          <div className="mx-auto max-w-[640px] rounded-xl2 border border-orb/25 bg-gradient-to-b from-orb-tint to-white px-8 py-10 text-center shadow-lg2">
            <StartCallButton className="btn btn-orb btn-lg">
              Talk to it live now
            </StartCallButton>

            <p className="mt-4 text-[13px] text-ink-faint">
              Your browser will ask for microphone access. Nothing from this call is stored.
            </p>

            <div className="mt-8 border-t border-orb/20 pt-7">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-orb">
                Try saying
              </div>
              <ul className="flex flex-col gap-2">
                {PROMPTS.map((prompt) => (
                  <li key={prompt} className="text-[14.5px] text-ink-soft">
                    {prompt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-8 text-center text-[15px] text-ink-soft">
            Want to hear it on a real phone line, trained on{" "}
            <em className="not-italic font-medium text-ink">your</em> business?{" "}
            <a
              href={BOOKING_URL}
              {...EXTERNAL_LINK}
              className="font-semibold text-ink underline underline-offset-2"
            >
              Book a 15-minute demo
            </a>{" "}
            and we&apos;ll call you with it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
