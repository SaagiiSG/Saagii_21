import React from "react";
import { motion } from "framer-motion";

// Vermillion hanko-style signature seal, pressed onto the page.
export default function SealStamp({ className = "" }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`w-12 h-12 rounded-[6px] bg-[#bf3b22] text-[#f7f5f0] flex flex-col items-center justify-center select-none ${className}`}
      initial={{ opacity: 0, scale: 1.5, rotate: 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
    >
      <span className="font-body font-bold text-[15px] leading-[16px] tracking-[2px]">SG</span>
      <span className="font-body font-bold text-[13px] leading-[14px] tracking-[3px]">21</span>
    </motion.div>
  );
}
