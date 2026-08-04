import Image from "next/image";
import Link from "next/link";

// Intrinsic sizes of the trimmed logo assets in /public.
const WORDMARK = { w: 1879, h: 482 };
const MARK = { w: 423, h: 482 };

/** The "V" glyph on its own — used where the full wordmark won't fit. */
export function LogoMark({
  small = false,
  light = false,
}: {
  small?: boolean;
  light?: boolean;
}) {
  const h = small ? 22 : 30;
  return (
    <Image
      src={light ? "/logo-mark-white.png" : "/logo-mark.png"}
      alt=""
      aria-hidden="true"
      width={Math.round((MARK.w / MARK.h) * h)}
      height={h}
      className="h-auto w-auto"
      style={{ height: h, width: "auto" }}
    />
  );
}

export default function Logo({
  className = "",
  light = false,
  height = 26,
  priority = false,
}: {
  className?: string;
  light?: boolean;
  height?: number;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Vindro — home"
      // shrink-0: the nav puts this in a flex row, where the default
      // flex-shrink would squash the wordmark horizontally.
      className={`inline-flex shrink-0 items-center no-underline ${className}`}
    >
      <Image
        src={light ? "/logo-white.png" : "/logo.png"}
        alt="Vindro"
        width={Math.round((WORDMARK.w / WORDMARK.h) * height)}
        height={height}
        priority={priority}
        className="max-w-none"
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
