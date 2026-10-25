# CRT and postage stamp UI

The full self-contained stylesheet is `src/app/retro.css`. The React helpers are in `src/components/RetroStamp.tsx`. No package, Tailwind plugin or external texture is needed. `docs/retro-preview.html` embeds the same stylesheet and demonstrates the plain HTML version.

The project imports the stylesheet once in the root layout, after `globals.css`. `crt-page` on `<body>` enables fixed, noninteractive scanline and SVG grain layers. Remove that class to disable the viewport effect. Cards have their own grain texture. All effects are static: no flicker or constant repainting animation.

## React / Tailwind

```tsx
import { RetroStamp, RetroMeter } from "@/components/RetroStamp";

export default function EventTicket() {
  return (
    <section className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-2">
      <RetroStamp
        tone="paper"
        edge="all"
        serial="SYSTEM 2026 / GH.01"
        status="REGISTRATION OPEN"
        contentClassName="flex flex-col gap-6"
      >
        <h2 className="retro-heading">GoldenHour V1</h2>
        <p>12 hours of making. Delhi NCR.</p>
        <RetroMeter label="Free entry" value={100} valueLabel="100% FREE" />
        <a className="brutal-btn-orange" href="/goldenhour">Explore the event ↗</a>
      </RetroStamp>
      <RetroStamp tone="ink" serial="TRACK 02" status="GAME DEVELOPMENT">
        <h2 className="retro-heading">Build a playable world.</h2>
        <hr className="retro-divider" />
        <p>Make the loop feel good. Make the rules interesting.</p>
      </RetroStamp>
    </section>
  );
}
```

`tone` accepts `paper`, `ink`, `orange`, or `yellow`. `edge="sides"` is the default; `edge="all"` cuts all four edges. Layout utility classes belong on `className` (the shadow shell) or `contentClassName` (the padded, masked interior). Keep content at least 28px from the edge; avoid adding a background to the outer shell, which would fill the cutouts. `as="div"` is available when an article is not appropriate.

## Plain HTML

```html
<!-- Load retro.css once and add crt-page to your existing body. -->
<body class="crt-page">
  <div class="retro-stamp-shell">
    <article class="retro-stamp" data-tone="paper" data-edge="all">
      <header class="retro-stamp-meta">
        <span class="retro-serial">SYSTEM 2026 / GH.01</span>
        <span class="retro-status">REGISTRATION OPEN</span>
      </header>
      <h2 class="retro-heading">GoldenHour V1</h2>
      <p>12 hours of making. Delhi NCR.</p>
      <div class="retro-meter">
        <div class="retro-meter-label">
          <span>Free entry</span><span aria-hidden="true">100% FREE</span>
        </div>
        <meter min="0" max="100" value="100" aria-label="Free entry" aria-valuetext="100% free">100%</meter>
      </div>
    </article>
  </div>
</body>
```

The value is a native, accessible meter. Supply real data; the live example describes free entry, not capacity or registration progress. For actual async loading, use a labelled native `<progress>` element instead of pretending a decorative animation is progress.

## Implementation details

- Scanlines: 1px `rgba(0,0,0,.25)` at a 4px pitch, with overall opacity `.34` to keep body copy readable. Grain: tiled inline SVG `feTurbulence`, opacity `.14`, overlay blending. Tune those opacity values in `retro.css`.
- Mask layers intersect to remove semicircles every 24px. The unmasked parent uses a hard 6px `drop-shadow`; this avoids a mask clipping its own box shadow. Unsupported masks fall back to a framed rectangle.
- Only GoldenHour brand colors are used: #050505, #f7f7f2, #ff5a00 and #ffd400. Paper/ink stamps follow the existing theme toggle; orange/yellow accents retain their original colors. Perforation-only classes never override the existing card colors.
- Ticket displays and the admin scanner contain `data-crt-clean`, disabling viewport interference while QR codes are shown. Print, forced colors and increased contrast preferences disable the relevant effects. Links and keyboard focus remain native.

Applied throughout the site: landing/event cards, founders, schedules, sponsors, FAQs, information cards, account/admin panels and ticket containers. Existing copy, destinations, event facts, TechText headings and the theme toggle are preserved.

References: [MDN mask-composite](https://developer.mozilla.org/docs/Web/CSS/mask-composite), [MDN feTurbulence](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence), [Tailwind mask composition](https://tailwindcss.com/docs/mask-composite).
