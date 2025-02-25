import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Alert = () => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 200, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.1;
    x.set(offsetX);
    y.set(offsetY);
  };

  return (
    
    <motion.div
      className="fixed bottom-6 right-8 w-1/6 h-10 rounded-lg bg-slate-800 bg-opacity-80 text-slate-50 flex items-center justify-center text-lg shadow-lg"
      style={{ x: smoothX, y: smoothY }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div className="px-4">
        <h1 className="text-sm font-semibold">New phase coming soon</h1>
      </motion.div>
    </motion.div>
  );
};

export default Alert;