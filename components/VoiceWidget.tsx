"use client";

import Script from "next/script";
import { useEffect } from "react";
import { ELEVENLABS_AGENT_ID, ELEVENLABS_WIDGET_SRC } from "@/lib/site";

/**
 * Hides the vendor's "Powered by ElevenAgents" strip.
 *
 * There is no embed attribute for this in the pinned widget build — `disable-banner`
 * appears in ElevenLabs' docs but is absent from the element's `observedAttributes`
 * in 0.15.1, so setting it does nothing (verified by flipping it at runtime).
 * The supported switch is in the ElevenLabs dashboard's widget settings; this is
 * the belt-and-braces version for the rendered DOM.
 *
 * Matched by text rather than by CSS selector on purpose: the branding lives in a
 * `<p>` inside `.overlay`, but `.overlay` is reused for call-status text, so a
 * blunt `.overlay > p { display: none }` would also hide live call state.
 */
function hideVendorBanner(root: ShadowRoot) {
  for (const el of Array.from(root.querySelectorAll<HTMLElement>("p"))) {
    const text = (el.textContent ?? "").trim();
    if (/^powered by\b/i.test(text) && el.querySelector("button, input") === null) {
      el.style.setProperty("display", "none", "important");
    }
  }
}

/**
 * The live voice receptionist, mounted ONCE at the root of the page.
 *
 * Two rules keep this stable, both learned the hard way:
 *
 * 1. The widget's root element is `position: fixed`. It must not live inside any
 *    ancestor that sets a `transform` — an animated transform (our <Reveal>
 *    wrapper) becomes the containing block for fixed children and forces the
 *    widget to re-layout on every frame, which is what made it glitch and drop
 *    out of calls when it was embedded inside the demo card.
 * 2. Don't force its width/position. It anchors and sizes itself; overriding
 *    that breaks its internal layout.
 *
 * So: render it bare at the document root and let it float. Other components
 * start a call through StartCallButton rather than re-mounting it.
 */
export default function VoiceWidget() {
  useEffect(() => {
    let observer: MutationObserver | undefined;
    let timer: number | undefined;
    let cancelled = false;

    const attach = () => {
      if (cancelled) return;
      const host = document.querySelector("elevenlabs-convai");
      const root = host?.shadowRoot;

      // The element upgrades, then paints its shadow DOM a tick later.
      if (!root) {
        timer = window.setTimeout(attach, 300);
        return;
      }

      hideVendorBanner(root);

      // The widget re-renders its overlay on state changes (idle → call → idle),
      // which recreates the node, so re-apply rather than hiding once.
      observer = new MutationObserver(() => hideVendorBanner(root));
      observer.observe(root, { childList: true, subtree: true });
    };

    customElements
      .whenDefined("elevenlabs-convai")
      .then(attach)
      .catch(() => {
        /* script blocked — nothing rendered, nothing to hide */
      });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Orb colours are the widget's own stock blue, set explicitly rather than
          omitted so a vendor default change can't silently drift away from the
          blue the demo section is matched to (`orb` in tailwind.config.ts). */}
      <elevenlabs-convai
        agent-id={ELEVENLABS_AGENT_ID}
        dismissible
        avatar-orb-color-1="#2792dc"
        avatar-orb-color-2="#9ce6e6"
      ></elevenlabs-convai>

      <Script src={ELEVENLABS_WIDGET_SRC} strategy="afterInteractive" />
    </>
  );
}
