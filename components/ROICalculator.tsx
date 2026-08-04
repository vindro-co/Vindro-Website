"use client";

import { useMemo, useState } from "react";
import Reveal from "./ui/Reveal";
import { BOOKING_URL, EXTERNAL_LINK, SECTIONS } from "@/lib/site";

const WEEKS_PER_MONTH = 4.33;

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function Field({
  id,
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  display,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14.5px] font-semibold tracking-[-0.01em]">
          {label}
        </label>
        <output
          htmlFor={id}
          className="text-[19px] font-semibold tracking-[-0.02em] tabnum"
        >
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-describedby={`${id}-hint`}
        className="range"
      />
      <div id={`${id}-hint`} className="mt-2 text-[12.5px] text-ink-faint">
        {hint}
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [missed, setMissed] = useState(20);
  const [buyerPct, setBuyerPct] = useState(55);
  const [jobValue, setJobValue] = useState(450);

  const { monthly, yearly } = useMemo(() => {
    const m = missed * WEEKS_PER_MONTH * (buyerPct / 100) * jobValue;
    return { monthly: m, yearly: m * 12 };
  }, [missed, buyerPct, jobValue]);

  return (
    <section id={SECTIONS.roi} className="section border-t border-line bg-bg-soft">
      <div className="container-x">
        <Reveal>
          <div className="section-head">
            <div className="eyebrow justify-center">Do the math</div>
            <h2 className="mt-4">How much is your ringing phone costing you?</h2>
            <p>
              Most owners guess low. Slide the numbers to match your business and see what
              unanswered calls are really worth — per month and per year.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto grid max-w-[960px] overflow-hidden rounded-xl2 border border-line shadow-lg2 lg:grid-cols-2">
            {/* ------------------------------------------------- Inputs */}
            {/* min-w-0: grid items size to min-content by default, which the
                no-wrap figures below would otherwise push past the viewport. */}
            <div className="flex min-w-0 flex-col gap-[34px] bg-white px-6 py-10 sm:px-[38px]">
              <Field
                id="missed-calls"
                label="Missed calls per week"
                hint="Include after-hours, weekends, and “we were slammed all week” calls"
                value={missed}
                min={1}
                max={150}
                display={String(missed)}
                onChange={setMissed}
              />
              <Field
                id="buyer-intent"
                label="Callers with buying intent"
                hint="Emergencies, bookings, quote requests"
                value={buyerPct}
                min={10}
                max={90}
                display={`${buyerPct}%`}
                onChange={setBuyerPct}
              />
              <Field
                id="job-value"
                label="Average job value"
                hint="Your typical service or install ticket"
                value={jobValue}
                min={100}
                max={8000}
                step={50}
                display={money(jobValue)}
                onChange={setJobValue}
              />
            </div>

            {/* ------------------------------------------------ Results */}
            <div className="on-dark flex min-w-0 flex-col bg-ink px-6 py-10 text-white sm:px-[38px]">
              <div className="text-xs font-semibold uppercase tracking-[0.09em] text-white/50">
                Revenue walking out the door
              </div>
              <div
                aria-live="polite"
                className="mb-1 mt-2.5 font-display text-[clamp(40px,4.6vw,54px)] font-light leading-[1.1] tracking-[-0.03em] tabnum"
              >
                {money(monthly)}
                <span className="text-[21px] font-normal text-white/45">/mo</span>
              </div>
              <div className="mb-7 text-[14.5px] text-white/65">
                That&apos;s <span className="tabnum">{money(yearly)}</span> a year
              </div>

              <div className="mb-7 flex flex-col gap-3 border-t border-white/[0.14] pt-5">
                <div className="flex min-w-0 justify-between gap-3 text-[13.5px] text-white/60">
                  <span>Full-time dispatcher (salary + benefits)</span>
                  <strong className="whitespace-nowrap font-semibold text-white">
                    ~$4,200/mo
                  </strong>
                </div>
                <div className="flex min-w-0 justify-between gap-3 text-[13.5px] text-white/60">
                  <span>Covers nights, weekends &amp; holidays?</span>
                  <strong className="whitespace-nowrap font-semibold text-white">No</strong>
                </div>
                <div className="flex min-w-0 justify-between gap-3 text-[13.5px] text-white">
                  <span>Vindro AI receptionist, 24/7/365</span>
                  <strong className="whitespace-nowrap font-semibold text-white">
                    A fraction of either →
                  </strong>
                </div>
              </div>

              <a
                href={BOOKING_URL}
                {...EXTERNAL_LINK}
                className="btn btn-light btn-lg btn-block mt-auto"
              >
                Recover this revenue — book a demo
              </a>
              <p className="mt-3.5 text-center text-[11.5px] text-white/40">
                Estimates based on your inputs. We&apos;ll build your exact numbers, from
                your real call data, in your first weekly report.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
