import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * The ElevenLabs Convai widget is a custom element loaded at runtime from
 * @elevenlabs/convai-widget-embed, so JSX needs to know the tag exists.
 * Attribute list: https://elevenlabs.io/docs/agents-platform/customization/widget
 */
type ConvaiAttributes = {
  "agent-id": string;
  "signed-url"?: string;
  variant?: "compact" | "expanded";
  "server-location"?: "us" | "eu-residency" | "in-residency" | "global";
  dismissible?: boolean | "true" | "false";
  "disable-banner"?: boolean | "true" | "false";
  "action-text"?: string;
  "start-call-text"?: string;
  "end-call-text"?: string;
  "expand-text"?: string;
  "collapse-text"?: string;
  "listening-text"?: string;
  "speaking-text"?: string;
  "avatar-orb-color-1"?: string;
  "avatar-orb-color-2"?: string;
};

/** The element also exposes imperative call controls. */
export type ConvaiElement = HTMLElement & {
  startConversation?: () => void;
  endConversation?: () => void;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > &
        ConvaiAttributes;
    }
  }
}
