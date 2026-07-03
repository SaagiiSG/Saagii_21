import React from "react";
import { motion } from "framer-motion";

// Sumi-e enso: an almost-closed brush circle, gap at the top.
const ENSO_PATH = "M 360 86.8 A 200 200 0 1 1 225.3 63";

// Pass `progress` (a MotionValue) to scrub the drawing with scroll,
// or omit it to let the circle draw itself once when it enters the viewport.
export default function Enso({
  className = "",
  progress,
  delay = 0,
  stroke = "var(--ink)",
  strokeWidth = 12,
  opacity = 1,
  stretch = false,
}) {
  const pathProps = {
    d: ENSO_PATH,
    fill: "none",
    stroke,
    strokeWidth,
    strokeLinecap: "round",
  };

  return (
    <svg
      viewBox="0 0 520 520"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio={stretch ? "none" : "xMidYMid meet"}
    >
      {progress ? (
        <motion.path {...pathProps} style={{ pathLength: progress }} opacity={opacity} />
      ) : (
        <motion.path
          {...pathProps}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      )}
    </svg>
  );
}
