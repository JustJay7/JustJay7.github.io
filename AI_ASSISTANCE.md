# AI assistance disclosure — portfolio site

Per the professor's guidance ("always good to cite which parts were AI-assisted")
this documents where I used an AI assistant on `index.html`, plus a plain-English
explanation of every interactive feature so I can answer questions on any of it —
in the class Q&A or a job interview.

## What I wrote / decided myself
- All content: bio, project descriptions, Ayebot scope, OI-Bench framing,
  experience, education, skills — my facts, my claims.
- Information architecture: which sections exist and their order.
- Which skills to list (only ones I can defend).
- The RAG pipeline in the diagram — that's my own system; I designed the flow.

## What the AI assistant helped with
- Scaffolding the HTML/CSS and the vanilla-JS for the interactive features below.
- Visual styling: the dark/terminal theme, cyan accent, layout, components.
- Accessibility + SEO scaffolding (skip link, semantic landmarks, focus rings,
  prefers-reduced-motion, JSON-LD Person schema, meta/OG tags).

## The 6 interactive features — how each one works
1. **Interactive terminal.** An `<input>` listens for the Enter key; on Enter I
   read its value, look the command up in a plain JS object (`CMDS`), and append
   the matching text to the terminal `<div>`. Unknown input prints
   "command not found". `clear` empties the div. No backend — it's a lookup table.
2. **Count-up stats.** An `IntersectionObserver` watches the stat numbers; when
   one scrolls into view I animate it from 0 to its target using
   `requestAnimationFrame` (a loop synced to the browser's repaint).
3. **RAG architecture diagram.** Hand-laid inline `<svg>`: `<rect>` boxes for
   nodes, `<path>` lines for edges, and a `<circle>` with `<animateMotion>` that
   rides along the path to show data flowing. It's my Ayebot pipeline.
4. **Typed hero rotator.** A recursive `setTimeout` loop that types a phrase one
   character at a time, pauses, deletes it, and moves to the next phrase.
5. **Theme toggle.** A button flips `data-theme` on the `<html>` element between
   "dark" and "light"; the CSS variables under `html[data-theme="light"]` do the
   recolouring. The choice is saved in `localStorage` so it persists on reload.
6. **Interactive particle background.** A `<canvas>` draws ~70 moving dots and
   links nearby ones with faint lines; the animation runs via
   `requestAnimationFrame`, and dots gently repel from the mouse position.

## Foundations
- **HTML** = semantic structure (`<nav> <main> <header> <section> <article>`).
- **CSS** = all styling, via custom properties (`:root` variables), Grid/Flex,
  `clamp()` for responsive type, and a `@media` query for mobile.
- **Accessibility:** every animation is disabled under `prefers-reduced-motion`;
  visible focus rings; a skip link; aria labels on the canvas, toggle, and SVG.

I understand what each technology does, how they combine, and what every line
is doing.
