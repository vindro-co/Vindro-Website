import Reveal from "./ui/Reveal";
import StartCallButton from "./StartCallButton";
import {
  BOOKING_URL,
  EXTERNAL_LINK,
  PHONE_DISPLAY,
  PHONE_HREF,
  SECTIONS,
} from "@/lib/site";

const PROMPTS = [
  "“My basement is flooding — can someone come out tonight?”",
  "“How much for a new water heater?”",
  "“Can I book a tune-up for Thursday morning?”",
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
          <div className="mx-auto max-w-[640px] rounded-xl2 border border-line bg-white px-8 py-10 text-center shadow-lg2">
            <StartCallButton className="btn btn-primary btn-lg">
              Talk to the receptionist
            </StartCallButton>

            <p className="mt-4 text-[13px] text-ink-faint">
              Your browser will ask for microphone access. Nothing from this call is stored.
            </p>

            <div className="mt-8 border-t border-line pt-7">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-faint">
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
          {/* The phone number is Noel's personal line, NOT the AI. Keep these two
              ideas in separate sentences so nobody calls it expecting the agent. */}
          <p className="mt-8 text-center text-[15px] text-ink-soft">
            Want to hear it on a real phone line, trained on{" "}
            <em className="not-italic font-medium text-ink">your</em> business?{" "}
            <a
              href={BOOKING_URL}
              {...EXTERNAL_LINK}
              className="font-semibold text-ink underline underline-offset-2"
            >
              Book a 15-minute demo
            </a>
            .
            <br className="hidden sm:block" /> Rather speak to a person first? Call Noel on{" "}
            <a
              href={PHONE_HREF}
              className="font-semibold text-ink underline underline-offset-2"
            >
              {PHONE_DISPLAY}
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
