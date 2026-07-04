# Rotaract District 3191 — Design Guide

This document describes the visual language used across all pages in this project. Follow these patterns when building new pages or components.

---

## Color Palette

| Role | Value | Usage |
|---|---|---|
| Brand / Primary | `#d41367` | Buttons, accents, icons, active states |
| Brand Hover | `#b71258` | Hover state for primary buttons |
| Brand Tint BG | `#d41367` at `/10` opacity | Badge backgrounds, subtle highlights |
| Brand Tint Border | `#d41367` at `/20` opacity | Badge borders, card hover borders |
| Heading Text | `slate-900` | All headings and strong labels |
| Body Text | `slate-600` / `slate-700` | Paragraphs, descriptions |
| Muted / Meta Text | `slate-500` | Eyebrow labels, tracking codes, captions |
| Surface | `white` | Cards, panels, hero sections |
| Offset Surface | `slate-50` | Metric pills, section headers, icon wells |
| Border | `slate-200` | All borders in default state |
| Success | `green-500` / `green-700` | Live/operational status indicators |

---

## Typography

### Eyebrow / Label
Small all-caps label placed above a heading to give context (e.g. "FLIGHT OPERATIONS", "DOCUMENT VAULT").

```
text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500
```
Or in brand pink when it is a badge:
```
text-xs font-bold tracking-[0.25em] text-[#d41367]
```

### Page Heading (H1)
```
text-5xl font-black tracking-tight text-slate-900
```

### Section / Card Heading (H2, H3)
```
text-2xl font-black tracking-tight text-slate-900   // section
text-xl  font-black text-slate-900                  // card
```

### Body / Description
```
text-sm leading-7 text-slate-600   // sm
text-base leading-relaxed text-slate-600  // base
```

---

## Layout

All pages use the same outer wrapper:

```jsx
<div className="mx-auto max-w-7xl px-4 py-6">
```

Use `sm:px-6 lg:px-8 lg:py-6` when the page needs more breathing room at large breakpoints.

---

## Hero Section

Every page opens with a hero card. The structure is consistent:

1. A `rounded-4xl border border-slate-200 bg-white shadow-sm` container
2. A 1 px top accent bar as the very first child
3. An eyebrow badge with an icon on the left
4. A large H1 heading beneath it
5. Optional metric pills on the right side at `md+`

```jsx
<section className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
  {/* Top accent bar */}
  <div className="h-1 bg-linear-to-r from-[#d41367] via-pink-300 to-slate-900" />

  <div className="p-8">
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

      <div>
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2">
          <SomeIcon size={14} />
          <span className="text-xs font-bold tracking-[0.25em] text-[#d41367]">
            SECTION NAME
          </span>
        </div>

        {/* Heading */}
        <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
          Page Title
        </h1>

        <p className="mt-4 max-w-2xl text-slate-600">
          Short description of the page.
        </p>
      </div>

      {/* Metric pills (optional, hidden on mobile) */}
      <div className="hidden md:grid grid-cols-3 gap-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500">{label}</div>
            <div className="mt-2 text-2xl font-black text-slate-900">{value}</div>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>
```

---

## Cards

All content cards share this base:

```
rounded-3xl border border-slate-200 bg-white shadow-sm
transition-all duration-300 hover:-translate-y-1 hover:border-[#d41367]
```

Use `rounded-2xl` for smaller, nested cards (e.g. document rows, metric pills).

**Optional top accent stripe on cards** (2 px, used in BrandCenter section cards):
```jsx
<div className="absolute inset-x-0 top-0 h-2 bg-linear-to-r from-[#d41367] via-[#ff8fb0] to-slate-900" />
```

**Image cards** (LogoCard, ProfileCard) use `overflow-hidden` with an image that scales on hover:
```
group-hover:scale-105 transition-transform duration-500
```

---

## Buttons

### Primary (solid pink)
```
rounded-full bg-[#d41367] px-4 py-2 text-sm font-semibold text-white
shadow-[0_10px_24px_rgba(212,19,103,0.22)]
hover:bg-[#b71258] transition
```

### Secondary (pink tint)
```
rounded-full border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2
text-sm font-semibold text-[#d41367] hover:bg-[#d41367]/15 transition
```

### Ghost / Neutral
```
rounded-full border border-slate-200 bg-slate-50 px-4 py-2
text-sm font-semibold text-slate-700 hover:bg-slate-100 transition
```

For rectangular inline buttons (e.g. inside cards) swap `rounded-full` for `rounded-xl`.

**Disabled state:**
```
cursor-not-allowed border border-slate-200 bg-slate-100 text-slate-400
```

---

## Badges / Tags

### Brand badge (inline with icon)
```
inline-flex items-center gap-2 rounded-full
border border-[#d41367]/20 bg-[#d41367]/10 px-4 py-2
text-xs font-bold tracking-[0.25em] text-[#d41367]
```

### Count / status chip (small, no icon)
```
rounded-full border border-[#d41367]/20 bg-[#d41367]/10
px-3 py-1 text-xs font-bold text-[#d41367]
```

### Success / operational chip
```
rounded-full border border-green-200 bg-green-50
px-3 py-1 text-xs font-semibold text-green-700
```

---

## Status Dot

A pulsing dot used to indicate live or active systems:

```jsx
<span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
// or in brand pink:
<span className="h-2.5 w-2.5 rounded-full bg-[#d41367] animate-pulse" />
```

---

## Section Divider

Used between document categories or major content groups:

```jsx
<div className="my-12 flex items-center gap-5">
  <div className="h-px flex-1 bg-pink-200" />
  <h2 className="text-center text-lg md:text-3xl font-black uppercase tracking-[0.35em] text-[#d41367]">
    Section Title
  </h2>
  <div className="h-px flex-1 bg-pink-200" />
</div>
```

---

## Grid Layouts

| Columns | Class |
|---|---|
| 2 | `grid gap-6 md:grid-cols-2` |
| 3 | `grid gap-6 md:grid-cols-2 xl:grid-cols-3` |
| 4 | `grid gap-5 sm:grid-cols-2 xl:grid-cols-4` |
| Status metrics (3) | `grid grid-cols-3 gap-3` |

---

## Modal / Overlay

Modals use a full-screen backdrop with blur:

```
fixed inset-0 z-50 flex items-center justify-center
bg-slate-950/80 px-4 py-6 backdrop-blur-md
```

The modal panel:
```
max-h-[90vh] w-full max-w-6xl overflow-hidden
rounded-4xl bg-white shadow-[0_30px_100px_rgba(15,23,42,0.3)]
```

The scrollable body inside:
```
max-h-[calc(90vh-5.5rem)] overflow-y-auto px-5 py-5 sm:px-6
```

---

## Naming / Vocabulary

The site uses an aerospace / operations control metaphor throughout. When writing labels, section names, or status text, prefer this vocabulary:

| Generic | Preferred |
|---|---|
| Dashboard | Command Deck / Cockpit |
| Files / Assets | Fleet / Inventory |
| Download | Acquire / Deploy |
| Preview | Inspect / Hangar |
| Active | Operational |
| Ready | Ready for Deployment |
| Team | Command Directory |
| Documents | Mission Documents / Document Vault |

This is cosmetic flavour — do not force it where it reads awkwardly. Use it on labels, badge text, and section eyebrows.

---

## Shadows

| Scale | Value |
|---|---|
| Card (subtle) | `shadow-sm` |
| Card (raised) | `shadow-[0_18px_48px_rgba(15,23,42,0.08)]` |
| Hero / Panel | `shadow-[0_24px_80px_rgba(15,23,42,0.12)]` |
| Modal | `shadow-[0_30px_100px_rgba(15,23,42,0.3)]` |
| Primary button | `shadow-[0_10px_24px_rgba(212,19,103,0.22)]` |
| Primary button hover glow | `hover:shadow-[0_0_25px_rgba(212,19,103,0.35)]` |

---

## Gradient Backgrounds (Image Preview Areas)

Used as the background behind logo/image thumbnails:

```
bg-[linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)]
```

Or as an image overlay for text legibility on dark:
```
bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.78))]
```
