"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { BOOKING_EMBED_URL, BOOKING_URL, EXTERNAL_LINK } from "@/lib/site";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

/**
 * Calendly's inline scheduler.
 *
 * `widget.js` only scans the DOM for `.calendly-inline-widget` once, on its own
 * load. That covers a cold visit to /book, but on a client-side navigation from
 * the home page the script is often already cached and executed, so nothing
 * scans and the container stays empty. So we also call `initInlineWidget`
 * ourselves once the script is available — guarded on the container being empty
 * so a cold load doesn't get two schedulers stacked in it.
 */
export default function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tries = 0;
    let timer: number | undefined;

    const init = () => {
      if (!ref.current) return;

      if (window.Calendly) {
        if (ref.current.childElementCount === 0) {
          window.Calendly.initInlineWidget({
            url: BOOKING_EMBED_URL,
            parentElement: ref.current,
          });
        }
        return;
      }

      // Script tag present but not evaluated yet — give it a moment, then
      // surface the fallback link rather than leaving a blank box.
      if (++tries > 40) {
        setFailed(true);
        return;
      }
      timer = window.setTimeout(init, 250);
    };

    init();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [scriptReady]);

  return (
    <>
      <div
        ref={ref}
        className="calendly-inline-widget w-full overflow-hidden rounded-xl2 border border-line bg-white"
        data-url={BOOKING_EMBED_URL}
        style={{ minWidth: 320, height: 700 }}
      />

      {failed && (
        <p className="mt-5 text-center text-[14.5px] text-ink-soft">
          The scheduler didn&apos;t load.{" "}
          <a
            href={BOOKING_URL}
            {...EXTERNAL_LINK}
            className="font-semibold text-ink underline underline-offset-2"
          >
            Open it on Calendly instead
          </a>
          .
        </p>
      )}

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
