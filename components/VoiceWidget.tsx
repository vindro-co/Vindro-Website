"use client";

import Script from "next/script";
import { ELEVENLABS_AGENT_ID, ELEVENLABS_WIDGET_SRC } from "@/lib/site";

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
 * start a call through `startVoiceDemo()` below rather than re-mounting it.
 */
export default function VoiceWidget() {
  return (
    <>
      <elevenlabs-convai
        agent-id={ELEVENLABS_AGENT_ID}
        dismissible
        action-text="Talk to our AI receptionist"
        start-call-text="Start the call"
        end-call-text="End call"
        listening-text="Listening…"
        speaking-text="Receptionist speaking"
        avatar-orb-color-1="#0a0a0a"
        avatar-orb-color-2="#52525b"
      ></elevenlabs-convai>

      <Script src={ELEVENLABS_WIDGET_SRC} strategy="afterInteractive" />
    </>
  );
}
