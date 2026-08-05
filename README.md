# Vindro — marketing site

Production marketing site for **Vindro**, a done-with-you AI voice receptionist service for home service businesses (plumbing, HVAC, electrical, roofing, appliance repair and the rest of the trades) in the Greater Toronto Area.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, with Framer Motion for scroll-reveal motion.

---

## Requirements

- **Node.js ≥ 18.17** (Next.js 14 refuses to start below this — Node 20+ recommended)
- npm 9+

```bash
node -v
```

## Run it

```bash
npm install
```

```bash
npm run dev
```

Open <http://localhost:3000>.

## Other scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | ESLint via `eslint-config-next` |
| `npm run typecheck` | `tsc --noEmit` |

> Don't run `npm run build` while `npm run dev` is running — they share `.next/` and the
> dev server will start serving broken chunks. Stop the dev server first.

---

## Project structure

```
app/
  layout.tsx        Fonts, SEO metadata, skip link, no-JS fallbacks
  page.tsx          Section order + JSON-LD structured data
  globals.css       Design tokens, orbs, buttons, FAQ accordion
components/
  Nav.tsx           Sticky nav + mobile menu
  Hero.tsx          Headline, CTAs, floating call cards, orb use-case strip
  ProblemBar.tsx    Four-stat band (62% / 85% / $300–$8,000 / 0)
  LiveDemo.tsx      "Hear it" — talk-now button + booking fallback
  VoiceWidget.tsx   The single ElevenLabs widget instance (root-mounted)
  StartCallButton.tsx Starts a call on that instance
  HowItWorks.tsx    Three numbered steps
  Comparison.tsx    Receptionist vs. generic AI vs. Vindro
  WeeklyReports.tsx Copy + animated sample report card
  ROICalculator.tsx Interactive sliders and live results
  GrandSlamOffer.tsx Deliverables stack + free-trial terms panel
  Capabilities.tsx  12-cell grid of what the agent does on a call
  FAQ.tsx           Native <details> accordion
  FinalCTA.tsx      Closing card
  Footer.tsx        Brand, links, bottom bar
  Logo.tsx          Wordmark + "V" mark, from /public PNGs
  ui/               Reveal, CountUp, BarChart, Orb
lib/site.ts         Anchors, nav links, email, phone, booking URL, agent id
types/              JSX declaration + attribute list for <elevenlabs-convai>
public/             logo*.png, icon-on-{light,dark}.png, apple-icon.png, og.png
```

## Design system

Monochrome. Near-black on off-white; the only colour in the palette comes from the
**grainy gradient orbs**, which are the signature element.

| Token | Value |
| --- | --- |
| `bg` / `bg-alt` / `bg-soft` | `#fdfcfc` / `#f4f4f5` / `#fafafa` |
| `ink` / `ink-soft` / `ink-faint` | `#0a0a0a` / `#52525b` / `#a1a1aa` |
| `line` | `#e4e4e7` |
| `green` | `#16a34a` (✓ marks, deltas, the Vindro comparison card) |
| radii | `card` 14px, `xl2` 20px |

- **Type** — two families only. Inter Tight (`font-display`) for the hero headline,
  section headings and figures; Inter (`font-sans`) for body and UI. Both via `next/font`
  (self-hosted, no layout shift). Bricolage Grotesque was dropped from the hero — too
  characterful for the tone, and it was the only thing loading that third font.
- **Orbs** — `<Orb variant={1|2|3|4} />`. Multi-stop radial gradients with an inline SVG
  noise overlay in `--noise` and an inset highlight.
- **Breakpoints** — section grids stack below `lg` (1024px); the nav keeps its links and
  both CTAs down to the custom `nav` breakpoint (**1060px**), below which it collapses to
  the hamburger. Don't lower `nav` without re-measuring: the logo is `shrink-0`, so if the
  row doesn't fit it overflows the page instead of squashing the wordmark.
- **Motion** — `Reveal` (fade + slide on scroll), `CountUp`, `BarChart`. Everything
  respects `prefers-reduced-motion`.
- **Accessibility** — skip link, labelled landmarks, native `<details>` accordion,
  `aria-expanded`/`aria-controls` on the mobile menu, Escape to close, visible
  `:focus-visible` rings on light and dark sections.

## Editing the content

Each section's copy lives in a typed array at the top of its component — `STACK` in
`GrandSlamOffer.tsx`, `FAQS` in `FAQ.tsx`, `OPTIONS` in `Comparison.tsx`, and so on.
Contact details and every CTA destination live in one place, [`lib/site.ts`](lib/site.ts):

| Constant | Value |
| --- | --- |
| `EMAIL` | `noel@vindro.co` |
| `BOOKING_PATH` | `/book` — where every CTA points |
| `BOOKING_URL` | `https://calendly.com/noel-vindro` — embed source + fallback |

There is deliberately **no phone number** anywhere on the site — contact is email or the
Calendly booking only. `formatDetection.telephone` is `false` in `app/layout.tsx` so iOS
doesn't turn stray digits (job values, the ROI figures) into tap-to-call links.

### The booking page

Every "Book a demo" CTA is a `next/link` to **`/book`** ([`app/book/page.tsx`](app/book/page.tsx)),
an on-domain page hosting Calendly's inline scheduler. Visitors never leave `vindro.co`,
which keeps the branding intact through the most important step and gives you a page to
attach conversion tracking to — impossible on a `calendly.com` hand-off.

The page uses a slim header (logo + "Back to site") rather than the full nav: it's the last
step before a booking, so there's no reason to offer exits.

Two things in [`CalendlyEmbed.tsx`](components/CalendlyEmbed.tsx) that are easy to break:

1. **`widget.js` scans the DOM for `.calendly-inline-widget` only once, on its own load.**
   That covers a cold visit to `/book`, but on a client-side nav from the home page the
   script is already cached and executed, so nothing scans and the container stays empty.
   The component therefore also calls `Calendly.initInlineWidget` itself — guarded on the
   container being empty, so a cold load doesn't stack two schedulers. Both paths are
   verified to render exactly one `<iframe>`.
2. **Calendly requires `min-width: 320px`.** On a 320px viewport the container's 24px
   padding would push it past the edge, so the embed is full-bleed (`-mx-6 sm:mx-0`) below
   `sm`. Verified at 320px: container is exactly 320px with no horizontal overflow.

If the script fails entirely the component surfaces a direct `BOOKING_URL` link rather than
leaving a blank 700px box.

### The voice demo

The live ElevenLabs Convai widget is mounted **once**, by `components/VoiceWidget.tsx`,
rendered at the root of `app/page.tsx` *outside* `<main>`. `LiveDemo.tsx` has no widget of
its own — its button is `StartCallButton.tsx`, which drives that single instance.

**Two rules. Breaking either is what made the first integration glitch and drop calls:**

1. **Never put the widget inside a transformed ancestor.** Its root is `position: fixed`,
   and any ancestor with a `transform` becomes its containing block. The original version
   sat inside a `<Reveal>` wrapper, which *animates* transform — so the widget was forced
   to re-layout every frame of the scroll-reveal. That's why it lives at the document root
   now, and why there's a check for it in the verification notes below.
2. **Never force its width or position.** The old `.live-widget` CSS pinned
   `width: 420px !important` with a negative margin to centre it in a card; that broke its
   internal layout. It anchors and sizes itself. The host is `pointer-events: none`, so it
   doesn't block the page.

The script is **pinned** to `@0.15.1` in `lib/site.ts` (`ELEVENLABS_WIDGET_SRC`). An
unversioned unpkg URL serves `latest` and can ship a breaking build to production with no
change on your side.

`v0.15.1` does **not** expose `startConversation()`, so `StartCallButton` falls back to
clicking the widget's own `aria-label="Start a call"` control through its open shadow root.
It tries the method first, so it keeps working if a later release restores the API.

**Trust the element, not the docs, for which attributes exist.** ElevenLabs' documentation
lists several that 0.15.1 doesn't implement. Read the real list at runtime:

```js
document.querySelector("elevenlabs-convai").constructor.observedAttributes
```

Two that are documented but **absent** in 0.15.1, so setting them silently does nothing:

- `disable-banner` — the "Powered by ElevenAgents" strip. The supported switch is in the
  ElevenLabs dashboard's widget settings. `VoiceWidget.tsx` also hides it in the DOM, matched
  **by text**, because the branding is a `<p>` inside `.overlay` and `.overlay` is reused for
  call-status text — a `.overlay > p` rule would hide live call state too. A MutationObserver
  re-applies it, since the widget rebuilds that node on every state change.
- `action-text` / `start-call-text` / `end-call-text` / `listening-text` — label overrides.
  0.15.1 takes labels through `text-contents` instead.

Attributes that do work and are worth knowing: `variant="compact|expanded"`, `dismissible`,
`placement`, `default-expanded`, `always-expanded`, `server-location`, `language`,
`text-input`, `transcript`, `avatar-orb-color-1` / `-2`.

The DOM-hiding of the banner is vendor-markup-dependent by nature. If the strip ever
reappears after a widget update, prefer the dashboard toggle over patching the selector.

### The ROI calculator

```
monthly = missedCallsPerWeek × 4.33 × (buyerIntent% ÷ 100) × averageJobValue
```

Yearly is that × 12. Defaults (20 / 55% / $450) land at **$21,434/mo**.

## Copy notes

**No pricing on the page.** Vindro's price is never stated — the offer section lists what
you get and routes to a demo for the quote. The dollar figures that remain are the
*prospect's* economics (job values, revenue recovered) or the cost of the alternatives
(`$45,000+` receptionist salary in `Comparison.tsx`, `~$4,200/mo` dispatcher in
`ROICalculator.tsx`). Those carry the ROI argument; delete them only if you want the
comparison to lose its teeth.

**The offer** is *free for the first 30 days, no setup costs, cancel anytime*, stated in
the hero bullets, the dark panel in `GrandSlamOffer.tsx`, the FAQ and the closing
microcopy. The 90-day pays-for-itself guarantee was **removed** (the free trial replaces
it) — `Guarantee.tsx` is deleted and the `guarantee` anchor is gone from `lib/site.ts`.

**The demo is 15 minutes.** Note the Calendly slug is still `/30min` — if that event is
actually 30 minutes long, either rename the event or grep for `15-minute` and change it.

**Time-to-live** is **48 hours** everywhere (hero bullet, offer heading, the offer stack's
"White-glove 48-hour launch", the closing line, the final-CTA microcopy strip and the FAQ).
To change it, grep for `48 hour`.

**Delivery model** is worded **done-with-you** throughout — hero bullet, the How It Works
eyebrow and subcopy, the footer line and the JSON-LD description. Note this sits in some
tension with the surrounding copy ("No software to learn. No prompts to write. You never
touch a dashboard"), which describes a done-*for*-you service. Grep for `with you` /
`with-you` if you want it back.

**Report cadence** is described as weekly, with no day named. The sample report card still
shows a `Mon Jul 20 – Sun Jul 26` range, which describes the week covered, not a send day.

**Vendor name.** The site deliberately never names the voice-AI vendor — `Capabilities.tsx`
says "enterprise-grade voice AI".

**Niche** is home services broadly, kept local to the GTA — the GTA references are in
`HowItWorks.tsx`, `Capabilities.tsx` and the JSON-LD `areaServed` in `app/page.tsx` if you
ever want to go national.

## SEO

Everything a search engine reads lives in four places:

| What | Where |
| --- | --- |
| `<title>`, meta description, Open Graph, Twitter | `TITLE` / `DESCRIPTION` in [`app/layout.tsx`](app/layout.tsx) — one edit updates all of them |
| Share image | `OG_IMAGE` → `public/og.png` |
| `ProfessionalService` + `FAQPage` JSON-LD | [`app/page.tsx`](app/page.tsx) (FAQ entries come from `FAQS` in `FAQ.tsx`, so they can't drift) |
| `/robots.txt`, `/sitemap.xml` | [`app/robots.ts`](app/robots.ts), [`app/sitemap.ts`](app/sitemap.ts) |

**Bump `CONTENT_LAST_MODIFIED` in `app/sitemap.ts` when you change copy.** It is
deliberately a fixed date rather than `new Date()`: build-time stamps tell Google the page
changed on every deploy, including deploys that only touched styles or dependencies, and a
lastmod that always reads "just now" gets ignored — losing you the signal precisely when a
real change needs crawling.

Editing metadata changes what the server sends; it does **not** change what Google has
stored. To refresh a stale snippet, use Search Console → URL Inspection → Request Indexing,
and submit `sitemap.xml`. Expect days, not minutes, and note Google rewrites titles and
descriptions when it judges another string a better match for the query.

## Deploy

Pushing to `main` triggers Hostinger's auto-deploy; the live site updates in roughly 80
seconds. Any Node host works otherwise. `SITE_URL` in [`lib/site.ts`](lib/site.ts) is the
single source for the domain — it feeds `metadataBase`, the canonical tag, the JSON-LD and
the sitemap.

### Logo assets

`public/logo.png` and friends are generated from the source artwork, trimmed to the ink
with a fully transparent background (`logo.png` 1879×482, `logo-mark.png` 423×482, plus
white variants for dark panels). If you replace them, keep the transparency — an opaque
background shows as a black box behind the wordmark in the nav.

**Favicon.** The supplied mark is near-white (`#f3f3f1`), which is invisible on a light
browser tab bar, so there are two 512×512 variants of the same shape:

| File | Used when | Glyph |
| --- | --- | --- |
| `icon-on-dark.png` | `prefers-color-scheme: dark` | as supplied, `#f3f3f1` |
| `icon-on-light.png` | everything else (the fallback) | repainted `#0a0a0a` |

Both are declared in `app/layout.tsx`; the light-scheme entry is listed **last** so
browsers that ignore the `media` attribute fall back to the visible one. `apple-icon.png`
is deliberately **opaque** — iOS composites transparency to black on the home screen.
