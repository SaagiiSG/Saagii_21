import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GOOSE_PATH } from "./goosePath.js";

// A small flock of ink geese in the hero sky — the classic "descending geese"
// sumi-e motif. Each bird flies in from the lower left on an arc, then glides:
// a slow bob + wing flutter, drifting at its own speed as you scroll.
//
// Three nested layers so the transforms never fight over one axis:
//   outer  — scroll drift (style.x)
//   middle — one-shot fly-in arc (animate x/y/rotate/opacity keyframes)
//   inner  — endless glide loop (animate y/rotate/scaleY)
const BIRDS = [
    { left: "58%", top: "16%", w: 62, o: 0.72, drift: -150, bob: 5.2, delay: 0.9, fromX: -260, fromY: 120 },
    { left: "68%", top: "25%", w: 46, o: 0.52, drift: -100, bob: 6.3, delay: 1.15, fromX: -320, fromY: 90 },
    { left: "77%", top: "11%", w: 34, o: 0.4, drift: -190, bob: 4.7, delay: 1.4, fromX: -380, fromY: 150 },
    { left: "85%", top: "21%", w: 24, o: 0.28, drift: -70, bob: 6.9, delay: 1.65, fromX: -430, fromY: 110 },
];

function Bird({ bird, progress }) {
    const x = useTransform(progress, [0, 1], [0, bird.drift]);
    return (
        <motion.div className="absolute" style={{ left: bird.left, top: bird.top, x }}>
            <motion.div
                initial={{ x: bird.fromX, y: bird.fromY, rotate: -12, opacity: 0 }}
                animate={{
                    x: [bird.fromX, bird.fromX * 0.32, 0],
                    y: [bird.fromY, -bird.fromY * 0.28, 0],
                    rotate: [-12, 5, 0],
                    opacity: [0, bird.o, bird.o],
                }}
                transition={{ duration: 2.1, delay: bird.delay, ease: [0.23, 1, 0.32, 1], times: [0, 0.55, 1] }}
            >
                <motion.svg
                    viewBox="0 0 516 504"
                    width={bird.w}
                    height={Math.round(bird.w * (504 / 516))}
                    fill="var(--ink)"
                    style={{ originX: 0.5, originY: 0.5 }}
                    animate={{ y: [0, -7, 0], rotate: [0, -2.5, 0], scaleY: [1, 0.9, 1] }}
                    transition={{ duration: bird.bob, repeat: Infinity, ease: "easeInOut" }}
                >
                    <path d={GOOSE_PATH} />
                </motion.svg>
            </motion.div>
        </motion.div>
    );
}

export default function GooseFlock() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    return (
        <div ref={ref} aria-hidden="true" className="absolute inset-0 pointer-events-none hidden sm:block">
            {BIRDS.map((b, i) => (
                <Bird key={i} bird={b} progress={scrollYProgress} />
            ))}
        </div>
    );
}
