import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Alert = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 200, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-8 z-40"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 2.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* mouse-follow spring lives on its own element so the entrance animation can't overwrite it */}
      <motion.div
        className="h-10 px-5 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center gap-2 shadow-lg"
        style={{ x: smoothX, y: smoothY }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.span
          className="w-[6px] h-[6px] rounded-full bg-[var(--vermillion)]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <h1 className="text-sm font-body tracking-[1px]">New phase coming soon</h1>
      </motion.div>
    </motion.div>
  );
};

export default Alert;
