import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// A horizontal brush stroke that draws itself as it scrolls into view.
export default function BrushDivider({ flip = false, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 45%"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative w-full flex justify-center pointer-events-none py-2 ${className}`}
    >
      <svg
        viewBox="0 0 1200 40"
        fill="none"
        preserveAspectRatio="none"
        className={`w-[86%] sm:w-[65%] h-[28px] ${flip ? "-scale-x-100" : ""}`}
      >
        <motion.path
          d="M8 24 C 180 10, 340 32, 540 22 S 920 10, 1192 20"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength }}
          opacity="0.8"
        />
        <motion.path
          d="M64 31 C 260 22, 470 35, 710 28 S 1010 20, 1150 26"
          stroke="var(--ink)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{ pathLength }}
          opacity="0.25"
        />
      </svg>
    </div>
  );
}
