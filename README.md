# Rajwada Resort Pushkar

Next.js 16 · React 19 · TypeScript · Tailwind v4 · GSAP · Motion · Lenis

A palatial garden estate on the edge of Pushkar.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm start          # serve the build
```

Node 20+ required.

---

## Structure

```
app/
  layout.tsx            root layout, fonts, nav, footer, JSON-LD
  page.tsx              home — the only route with the curtain intro
  stay/ experiences/ weddings/ gallery/ contact/
  (landing)/[slug]/     SEO landing pages, statically generated
  contact/actions.ts    server action for the enquiry form
  sitemap.ts robots.ts  generated at build
components/             presentation only, no content
content/                >>> ALL EDITABLE COPY LIVES HERE <<<
lib/                    enquiry delivery, metadata, schema, WhatsApp links
public/images/          photography, organised by section
```

**To change copy, rates, room names or the gallery, edit `content/`.** Nothing else
should need touching. Every file is typed, so a mistake is a build error rather
than a broken page.

---

## Configuration

Copy `.env.example` to `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_WHATSAPP=919876543210    # digits only, country code, no + or spaces
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_EMAIL=
```

Every WhatsApp CTA falls back to `/contact` when `NEXT_PUBLIC_WHATSAPP` is empty,
so nothing is ever a dead link.

---

## Open items

### 1. Enquiry delivery — DECISION PENDING

`lib/enquiry.ts` is the only stub in the project. The form validates, submits
through a server action, and reports honestly to the visitor that delivery is not
connected. To wire Resend:

```bash
npm i resend
```

then set `RESEND_API_KEY` and `ENQUIRY_TO_EMAIL` and replace the body of
`deliver()`. To go WhatsApp-only instead, delete `lib/enquiry.ts` and
`app/contact/actions.ts` — the form already offers a WhatsApp deep link.

### 2. Unverified facts

These come from OTA listings and a wedding directory, not from the owner.
Confirm before launch — all of them live in `content/site.ts`:

- 25 rooms (Tripadvisor says 25, other OTAs say 30, WedMeGood says 11)
- 2,000 lawn capacity, 2 lawns, weddings since 2017
- Room category names are ours, not the property's
- `site.geo` coordinates are approximate — replace with surveyed values
- Phone, WhatsApp and email are blank

### 3. Missing photography

No food photography, no real wedding imagery, no people, no Pushkar context
(lake, temple, fair, desert). Source images cap at 1360×1020, which is below
what a 2560px retina hero wants. A golden-hour shoot with drone is the single
highest-value thing outstanding.

### 4. Not yet added

Favicon and app icons · a real OG image · analytics · Google Business Profile
and Tripadvisor listing claims.

---

## Notes on the build

- **Curtain intro** runs on the home page only, once per session
  (`sessionStorage`), skippable from 400 ms, disabled under
  `prefers-reduced-motion`, with a 9-second failsafe so a JS error can never
  trap a visitor. Timings live in `BEATS` at the top of
  `components/CurtainIntro.tsx`.
- **Sequence is strictly sequential:** curtains complete their travel, then the
  logo, then the strapline, then the site. ~4.3 s desktop, ~3.6 s mobile.
- **Lenis** smooth scroll pauses automatically while the body is locked.
- **Images** go through `next/image` with AVIF and WebP output and explicit
  `sizes` on every instance.
- **Fonts** are Cormorant Garamond 300/400/500 and Inter 400/500, self-hosted
  automatically by `next/font/google` at build time. This requires network
  access to Google Fonts during `npm run build`.
- **Colour contrast** was audited: gold `#B89A5A` fails WCAG AA on both
  backgrounds and is used decoratively only; terracotta `#C66A3D` is large-text
  only. Do not use either for body copy or links.
