import Reveal from "./ui/Reveal";
import { BOOKING_URL, EXTERNAL_LINK, SECTIONS } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section id={SECTIONS.contact} className="bg-white pb-[80px] md:pb-[104px]">
      <div className="container-x">
        <Reveal>
          <div className="on-dark relative overflow-hidden rounded-[28px] bg-ink px-[clamp(28px,6vw,80px)] py-[clamp(50px,7vw,90px)] text-center text-white">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(700px 320px at 50% -10%, rgba(255,255,255,.12), transparent 70%)",
              }}
            />

            <div className="relative">
              <h2 className="mb-[22px] text-[clamp(30px,4.2vw,48px)] leading-[1.06]">
                Your phone is ringing right now.
                <br />
                Who&apos;s booking that job?
              </h2>

              <p className="mx-auto mb-9 max-w-[620px] text-base text-white/70">
                Book a free 15-minute demo. We&apos;ll show you a receptionist trained on a
                home service business like yours, walk through your numbers, and map
                exactly what yours would look like. No pressure, no obligation — worst
                case, you leave knowing what missed calls cost you this season.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={BOOKING_URL}
                  {...EXTERNAL_LINK}
                  className="btn btn-light btn-lg"
                >
                  Book a free demo
                </a>
                <a
                  href={`#${SECTIONS.demo}`}
                  className="btn btn-outline-light btn-lg"
                >
                  Hear the receptionist
                </a>
              </div>

              <p className="mt-7 text-[13px] font-medium text-white/45">
                Free for 30 days · No setup costs · Cancel anytime · Live in 14 days · One
                company per trade, per service area
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
