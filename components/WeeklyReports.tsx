import BarChart from "./ui/BarChart";
import CountUp from "./ui/CountUp";
import Reveal from "./ui/Reveal";
import { LogoMark } from "./Logo";
import { SECTIONS } from "@/lib/site";

const CHECKLIST = [
  "Calls answered — and how many came in after hours",
  "Jobs booked, service scheduled, callbacks captured",
  "Estimated revenue recovered, in dollars",
  "What callers asked about most — free market research from your own service area",
  "What we improved this week and what we're tuning next",
];

const STATS = [
  { label: "Calls answered", value: 287, delta: "↑ 11% vs last week" },
  { label: "After-hours calls captured", value: 73, delta: "↑ 18%" },
  { label: "Jobs & service booked", value: 41, delta: "↑ 9%" },
  { label: "Est. revenue recovered", value: 18640, prefix: "$", delta: "↑ $2,900" },
];

const CALLS_BY_DAY = [
  { label: "M", value: 58 },
  { label: "T", value: 72 },
  { label: "W", value: 64 },
  { label: "T", value: 80 },
  { label: "F", value: 96 },
  { label: "S", value: 100 },
  { label: "S", value: 52 },
];

const TOP_REQUESTS = [
  "Emergency / no-service call · 34%",
  "Maintenance & tune-up · 27%",
  "New install quote · 21%",
  "Service follow-up · 10%",
];

export default function WeeklyReports() {
  return (
    <section id={SECTIONS.reporting} className="section bg-bg">
      <div className="container-x grid items-center gap-[50px] lg:grid-cols-[1fr_1.05fr] lg:gap-[70px]">
        {/* -------------------------------------------------------- Copy */}
        <Reveal>
          <div className="eyebrow mb-4">Every Monday, in your inbox</div>
          <h2 className="mb-[18px] text-[clamp(28px,3.2vw,38px)] leading-[1.1]">
            You&apos;ll never wonder if it&apos;s working. You&apos;ll see it.
          </h2>
          <p className="mb-[26px] text-base text-ink-soft">
            Most agencies set something up and disappear. Vindro sends a weekly report with
            the numbers that matter to an owner — so you see exactly what your receptionist
            booked you, every week.
          </p>

          <ul className="mb-8 flex flex-col gap-3">
            {CHECKLIST.map((item) => (
              <li
                key={item}
                className="relative pl-[30px] text-[14.5px] text-ink-soft before:absolute before:left-0 before:top-px before:flex before:h-[19px] before:w-[19px] before:items-center before:justify-center before:rounded-full before:bg-ink before:text-[11px] before:font-bold before:text-white before:content-['✓']"
              >
                {item}
              </li>
            ))}
          </ul>

          <a href="#sample-report" className="btn btn-primary">
            See a sample report
          </a>
        </Reveal>

        {/* ----------------------------------------------- Sample report */}
        <Reveal delay={0.1}>
          <div
            id="sample-report"
            aria-label="Sample weekly report"
            className="scroll-mt-24 rounded-xl2 border border-line bg-white p-7 shadow-lg2"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold tracking-[-0.02em]">
                    Weekly Performance Report
                  </span>
                  {/* These are illustrative figures for a made-up company, so say
                      so on the card itself — not just in the section copy. */}
                  <span className="rounded-full border border-line bg-bg-alt px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                    Example
                  </span>
                </div>
                <div className="mt-0.5 text-[12.5px] text-ink-faint">
                  Maple Ridge Home Services · Mon Jul 20 – Sun Jul 26
                </div>
              </div>
              <LogoMark small />
            </div>

            <dl className="mb-6 grid grid-cols-2 gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-card border border-line bg-bg-soft px-[18px] py-4"
                >
                  <dd className="font-display text-[26px] font-normal leading-[1.1] tracking-[-0.03em]">
                    <CountUp to={stat.value} prefix={stat.prefix ?? ""} />
                  </dd>
                  <dt className="mt-1 text-xs text-ink-faint">{stat.label}</dt>
                  <dd className="mt-1.5 text-[11.5px] font-semibold text-green">
                    {stat.delta}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mb-[22px]">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                Calls by day
              </div>
              <BarChart data={CALLS_BY_DAY} />
            </div>

            <div>
              <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                Top caller requests this week
              </div>
              <div className="flex flex-wrap gap-2">
                {TOP_REQUESTS.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
