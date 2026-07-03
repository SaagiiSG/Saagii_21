import React from "react";
import { motion } from "framer-motion";

// Section label with a vermillion brush underline that draws in on scroll.
export default function SectionHeader({ children, className = "", centered = false }) {
  return (
    <header className={`header ${className}`}>
      <span className="block">{children}</span>
      <svg
        viewBox="0 0 160 10"
        fill="none"
        aria-hidden="true"
        className={`h-[10px] w-[128px] mt-2 ${centered ? "mx-auto" : ""}`}
      >
        <motion.path
          d="M3 6.5 C 36 3, 84 8, 157 4.5"
          stroke="var(--vermillion)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </header>
  );
}
