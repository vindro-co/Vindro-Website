import CountUp from "./ui/CountUp";
import Reveal from "./ui/Reveal";
import { SECTIONS } from "@/lib/site";

const STATS = [
  {
    value: <CountUp to={62} suffix="%" />,
    caption: (
      <>
        of calls to home-service businesses go unanswered
        <span className="text-ink-faint">*</span>
      </>
    ),
  },
  {
    value: <CountUp to={85} suffix="%" />,
    caption: (
      <>
        of callers who hit voicemail never call back — they call the next company on Google
        <span className="text-ink-faint">*</span>
      </>
    ),
  },
  {
    value: <>$300–$8,000</>,
    caption: <>the value of a single job that walks when no one answers</>,
  },
  {
    value: <>0</>,
    caption: (
      <>
        calls missed once Vindro picks up — nights, weekends, storms, holiday rushes
      </>
    ),
  },
];

export default function ProblemBar() {
  return (
    <section className="border-y border-line bg-bg py-[88px]">
      <div className="container-x">
        <Reveal>
          <p className="mb-14 text-center font-display text-[clamp(22px,3vw,30px)] font-normal tracking-[-0.02em]">
            In home services, the phone is where the money is won — and lost
          </p>
        </Reveal>

        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0">
          {STATS.map((stat, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className={[
                // Column rules: hidden at the start of each row, so the divider
                // pattern stays correct at both 2-up and 4-up.
                "flex flex-col-reverse justify-end border-line px-[18px] sm:px-8",
                i % 2 === 1 ? "border-l" : "",
                i === 0 ? "lg:border-l-0" : "lg:border-l",
              ].join(" ")}
            >
              {/* DOM order is dt → dd; flex-col-reverse puts the figure on top. */}
              <dt className="text-sm text-ink-soft">{stat.caption}</dt>
              <dd className="mb-3 font-display text-[clamp(36px,4.2vw,52px)] font-light leading-none tracking-[-0.03em]">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal>
          <p className="mt-12 text-center text-[12.5px] text-ink-faint">
            *Industry research on home-service call answering. Run your own numbers in the{" "}
            <a href={`#${SECTIONS.roi}`} className="text-ink-soft underline underline-offset-2">
              calculator below
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
