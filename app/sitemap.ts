import type { MetadataRoute } from "next";
import { BOOKING_PATH, SITE_URL } from "@/lib/site";

/**
 * Date the page's *content* last meaningfully changed — bump this by hand when
 * you edit copy, not on every deploy.
 *
 * Deliberately not `new Date()`: that stamps build time, so every deploy would
 * claim the page changed even when only a dependency or a style did. Google
 * learns to distrust a lastmod that always says "just now" and starts ignoring
 * it, which costs you the signal exactly when a real change needs picking up.
 */
const CONTENT_LAST_MODIFIED = new Date("2026-08-05T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}${BOOKING_PATH}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
