import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GOOSE_PATH } from "./goosePath.js";

// A whole flock of ink geese for the hero sky. Each bird sweeps in from
// off-screen left, passes large across the screen (entrance scale > 1),
// then recedes and settles into the background behind the text — near
// birds dark and fast, far birds faint and slow. After settling: endless
// glide (bob + flutter) and per-bird parallax drift on scroll.
//
// Layers per bird so transforms never fight over one axis:
//   outer  — scroll drift (style.x)
//   middle — one-shot fly-in swoop (animate x/y/rotate/scale/opacity)
//   inner  — endless glide loop (animate y/rotate/scaleY)
function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(21);
const BIRDS = Array.from({ length: 28 }, () => {
    const depth = rand(); // 0 = far away, 1 = close
    return {
        left: `${4 + rand() * 88}%`,
        top: `${4 + rand() * 34}%`,
        w: Math.round(14 + depth * 52),
        o: 0.16 + depth * 0.55,
        drift: -(40 + depth * 170 + rand() * 60),
        bob: 4.2 + rand() * 3.4,
        delay: 0.45 + rand() * 1.7,
        duration: 2.1 + rand() * 0.9,
        fromX: -(420 + rand() * 520),
        fromY: 60 + rand() * 260,
        swoop: 1.5 + depth * 1.2, // entrance scale — flies past close, recedes to settle
    };
});

function Bird({ bird, progress }) {
    const x = useTransform(progress, [0, 1], [0, bird.drift]);
    return (
        <motion.div className="absolute" style={{ left: bird.left, top: bird.top, x }}>
            <motion.div
                initial={{ x: bird.fromX, y: bird.fromY, rotate: -14, scale: bird.swoop, opacity: 0 }}
                animate={{
                    x: [bird.fromX, bird.fromX * 0.3, 0],
                    y: [bird.fromY, -bird.fromY * 0.26, 0],
                    rotate: [-14, 5, 0],
                    scale: [bird.swoop, bird.swoop * 0.55, 1],
                    opacity: [0, Math.min(0.85, bird.o + 0.3), bird.o],
                }}
                transition={{ duration: bird.duration, delay: bird.delay, ease: [0.23, 1, 0.32, 1], times: [0, 0.55, 1] }}
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
