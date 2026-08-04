"use client";

import { useEffect, useState } from "react";
import type { ConvaiElement } from "@/types/elevenlabs";

/** Finds the widget's own "Start a call" control inside its (open) shadow root. */
function findStartControl(el: ConvaiElement): HTMLElement | null {
  const root = el.shadowRoot;
  if (!root) return null;

  const buttons = Array.from(root.querySelectorAll<HTMLElement>("button"));
  return (
    buttons.find((b) => /start a call|start call/i.test(b.getAttribute("aria-label") ?? "")) ??
    buttons.find((b) => /start a call|start call/i.test(b.textContent ?? "")) ??
    null
  );
}

/**
 * Starts a call on the globally-mounted <VoiceWidget />. Never renders a second
 * widget — there is exactly one instance per page.
 *
 * v0.15.1 of the embed does not expose `startConversation()`, so we fall back to
 * clicking the widget's own control through its open shadow root. The optional
 * method is tried first so this keeps working if a later build adds it back.
 */
export default function StartCallButton({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    // The element upgrades asynchronously, then paints its shadow DOM a tick
    // later — poll until there's actually something to click.
    const poll = () => {
      if (cancelled) return;
      const el = document.querySelector<ConvaiElement>("elevenlabs-convai");
      const usable =
        !!el && (typeof el.startConversation === "function" || !!findStartControl(el));

      if (usable) setReady(true);
      else timer = window.setTimeout(poll, 300);
    };

    customElements
      .whenDefined("elevenlabs-convai")
      .then(poll)
      .catch(() => {
        /* script blocked — button stays in its connecting state */
      });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  const start = () => {
    const el = document.querySelector<ConvaiElement>("elevenlabs-convai");
    if (!el) return;

    if (typeof el.startConversation === "function") {
      el.startConversation();
      return;
    }

    findStartControl(el)?.click();
  };

  return (
    <button type="button" onClick={start} disabled={!ready} className={className}>
      {ready ? children : "Connecting…"}
    </button>
  );
}
