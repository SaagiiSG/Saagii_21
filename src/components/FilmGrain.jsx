import React from "react";

// Two sets of translucent specks — ink-dark and paper-light — drawn with a
// normal blend, so the grain reads the same on the cream sections and the
// black one (overlay/multiply blends fade out on one or the other).
// Each filter turns fractal noise into alpha: only the dark or light
// extremes of the noise become visible specks.
const speck = (id, seed, rgb, a, b) =>
  `<filter id='${id}'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' seed='${seed}' stitchTiles='stitch'/>` +
  `<feColorMatrix values='0 0 0 0 ${rgb} 0 0 0 0 ${rgb} 0 0 0 0 ${rgb} ${a} 0 0 0 ${b}'/></filter>` +
  `<rect width='240' height='240' filter='url(#${id})'/>`;

const NOISE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>` +
      speck("d", 3, 0.1, 5, -2.4) +
      speck("l", 11, 1, -5, 2.45) +
      `</svg>`
  );

// Full-screen film grain. The oversized tile hops between offsets in steps
// (like frames of film) instead of sliding; reduced-motion freezes it.
export default function FilmGrain() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <div
        className="film-grain absolute -inset-[50%] opacity-[0.14]"
        style={{ backgroundImage: `url("${NOISE}")` }}
      />
    </div>
  );
}
