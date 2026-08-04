/**
 * The signature Vindro element: a grainy, multi-stop gradient sphere.
 * Four colourways keep repeated rows (use-cases, lists) from looking uniform.
 */
export default function Orb({
  variant = 1,
  className = "",
}: {
  variant?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`orb ${variant > 1 ? `orb-${variant}` : ""} ${className}`}
    />
  );
}
