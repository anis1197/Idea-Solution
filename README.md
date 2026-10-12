# Idea-Solution

Company Portfolio Website — a static landing page built from
`idea solution website.svg`. No backend, no build step.

## Run

Open `index.html` directly, or serve it:

    python3 -m http.server 8000

## Structure

    index.html        all markup + Tailwind config
    assets/img/       40 images extracted from the source SVG (~1.5 MB total)

## Notes

- Tailwind is loaded via the Play CDN and configured inline in `<head>`
  (palette sampled from the SVG: navy `#00194C`, brand blue `#0164FF`,
  deep blue `#002395`, cream `#F6F6EE`, amber `#FFAE00`).
  For production, swap the CDN for a compiled stylesheet via the Tailwind CLI.
- Font: Outfit (Google Fonts).
- `assets/img/cta-illus.jpg` is a flat crop whose top 110px is white and the
  rest brand blue, so it composites seamlessly over the blue call banner —
  keep the banner 225px tall and the image bottom/right aligned to it.
- Sections: header, hero, ratings, about, services, call banner, key products,
  why we are the best, clients feedback, global partners, team, recent
  activities, footer.

## Interactions

**Services — pinned heading + stacking cards (desktop only).** The
"Service We Offer" title *and* subtitle sit in a sticky bar pinned under the
site header. Each card is `position: sticky` with a staggered top offset and an
increasing `z-index`, so as you scroll a card pins below that bar and the next
one slides up and covers it, leaving a thin sliver of each card beneath.

The card offset is not hard-coded: a few lines of JS set `--svc-top` from the
measured height of the site header plus the sticky bar, so changing the heading
copy can't knock the cards out of alignment. To change how much of each buried
card shows, edit the `22px` step in
`.svc-card { top: calc(var(--svc-top) + var(--i) * 22px) }`.

The pinned bar costs ~255px of viewport, so on screens too short to also show a
whole card the stacking is switched off and the cards flow as a normal list
(thresholds: under 830px tall below 1280px wide, under 800px tall above it —
cards are taller at narrower widths). Those override selectors are doubled
(`.svc-card.svc-card`) to outrank Tailwind's `lg:sticky`, which the Play CDN
injects after this stylesheet. Below 1024px the whole effect is off.

**Experts — hover to expand.** Pure CSS (`.team-row` / `.team-card`). Every card
is a uniform 396px tall, with the name/designation overlaid on the bottom of the
photo rather than sitting below it — that is what keeps the heights equal.
Collapsed cards are 150px (130px while another is hovered) and the expanded card
is 310px. Only the expanded card shows its caption. The CEO is expanded by
default via `.is-lead`. `:focus-within` mirrors the hover for keyboard users;
gated behind `@media (hover: hover) and (min-width: 640px)` so touch devices keep
the plain horizontally-scrollable row.

> **Placeholder names.** Only the CEO is named in the source SVG. The other five
> cards read `TEAM MEMBER` / `Designation` — replace those two lines in each
> `<figcaption>` with the real name and role.
