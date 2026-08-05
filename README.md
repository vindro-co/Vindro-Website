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
| `BOOKING_URL` | `https://calendly.com/noel-vindro/30min` |

There is deliberately **no phone number** anywhere on the site — contact is email or the
Calendly booking only. `formatDetection.telephone` is `false` in `app/layout.tsx` so iOS
doesn't turn stray digits (job values, the ROI figures) into tap-to-call links.

Every "Book a demo" button points at `BOOKING_URL` and spreads `EXTERNAL_LINK`
(`target="_blank"` + `rel="noopener noreferrer"`). Change the link once and all seven
CTAs follow.

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

Useful attributes (set in `VoiceWidget.tsx`): `variant="compact|expanded"`, `dismissible`,
`disable-banner` (hides "Powered by ElevenLabs" — plan-dependent), `server-location`, and
the text overrides `action-text` / `start-call-text` / `listening-text`. Note the text
overrides appeared to be ignored by 0.15.1 in testing — the control still reads "Start a
call".

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

## Deploy

Any Node host works. On Vercel, import the repo and accept the defaults — no environment
variables required. Set the real domain in `SITE_URL` (`app/layout.tsx`) and the `url`
field in the JSON-LD block (`app/page.tsx`) before going live.

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
