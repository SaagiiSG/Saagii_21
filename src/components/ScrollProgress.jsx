import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

// Thin ink line on the right edge that fills as you read — a hanging scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed right-[28px] top-[16vh] h-[68vh] w-px bg-[#1918161a] z-40"
    >
      <motion.div
        className="w-full h-full bg-[var(--ink)] origin-top"
        style={{ scaleY }}
      />
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[7px] h-[7px] bg-[var(--vermillion)] rounded-[1px] rotate-45" />
    </div>
  );
}
