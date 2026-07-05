import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GOOSE_PATH } from "./goosePath.js";

// The migration: a whole flock of ink geese pours in from the right and
// crosses the hero sky right-to-left. Roughly 90% fly straight through and
// leave off the left edge, shrinking as they go; a few stragglers settle
// scattered in the background behind the text and stay — gliding, and
// drifting further left as you scroll.
//
// Layers per bird so transforms never fight over one axis:
//   outer  — scroll drift (style.x)
//   middle — the one-shot flight (animate x/y/rotate/scale/opacity)
//   inner  — endless glide loop (animate y/rotate/scaleY), mirrored to face left
function mulberry32(seed) {
    return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(21);
const BIRDS = Array.from({ length: 30 }, (_, i) => {
    const depth = rand(); // 0 = far away, 1 = close
    return {
        stay: i % 10 === 4, // 3 of 30 settle, the rest pass through
        left: `${6 + rand() * 84}%`,
        top: `${4 + rand() * 36}%`,
        w: Math.round(14 + depth * 52),
        o: 0.16 + depth * 0.55,
        drift: -(40 + depth * 170 + rand() * 60),
        bob: 4.2 + rand() * 3.4,
        delay: 0.4 + rand() * 1.9,
        duration: 2.2 + rand() * 1.0,
        crossDuration: 3.4 + rand() * 1.8,
        fromX: 460 + rand() * 560, // enter from off-screen right
        fromY: -40 - rand() * 160, // slightly above their line of flight
        exitX: -(2700 + rand() * 700),
        exitY: -50 - rand() * 140,
        swoop: 1.4 + depth * 1.2,
    };
});

function Bird({ bird, progress }) {
    const x = useTransform(progress, [0, 1], [0, bird.drift]);

    const flight = bird.stay
        ? {
              animate: {
                  x: [bird.fromX, bird.fromX * 0.3, 0],
                  y: [bird.fromY, bird.fromY * 0.2, 0],
                  rotate: [8, -3, 0],
                  scale: [bird.swoop, bird.swoop * 0.55, 1],
                  opacity: [0, Math.min(0.85, bird.o + 0.3), bird.o],
              },
              transition: { duration: bird.duration, delay: bird.delay, ease: [0.23, 1, 0.32, 1], times: [0, 0.55, 1] },
          }
        : {
              animate: {
                  x: [bird.fromX, bird.fromX * 0.4, 0, bird.exitX],
                  y: [bird.fromY, bird.fromY * 0.5, 0, bird.exitY],
                  rotate: [8, 3, 0, -5],
                  scale: [bird.swoop, bird.swoop * 0.85, bird.swoop * 0.65, bird.swoop * 0.45],
                  opacity: [0, Math.min(0.9, bird.o + 0.35), Math.min(0.9, bird.o + 0.3), 0],
              },
              transition: { duration: bird.crossDuration, delay: bird.delay, ease: "easeInOut", times: [0, 0.3, 0.62, 1] },
          };

    return (
        <motion.div className="absolute" style={{ left: bird.left, top: bird.top, x }}>
            <motion.div initial={{ x: bird.fromX, y: bird.fromY, opacity: 0, scale: bird.swoop }} {...flight}>
                <motion.svg
                    viewBox="0 0 516 504"
                    width={bird.w}
                    height={Math.round(bird.w * (504 / 516))}
                    fill="var(--ink)"
                    style={{ originX: 0.5, originY: 0.5, scaleX: -1 }}
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
