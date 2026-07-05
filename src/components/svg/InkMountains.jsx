import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Layered sumi-e mountain ranges for the hero's lower half. Each ridge is a
// silhouette filled with a vertical ink wash that dissolves into mist at its
// base — far ridges faint and slow, near foothills darker and faster on the
// scroll parallax. They breathe in one after another on load.
const RIDGES = [
    {
        // far range — tall soft peaks, mostly mist
        d: "M0 150 C 90 128, 150 76, 235 96 C 300 111, 345 70, 420 92 C 505 117, 560 96, 650 122 C 745 149, 830 132, 930 152 C 1040 174, 1140 158, 1250 172 C 1330 182, 1395 178, 1440 182 L 1440 320 L 0 320 Z",
        peak: 0.30,
        base: 0.0,
        parallax: 26,
        delay: 0.7,
    },
    {
        // mid range — one dominant peak off-center, ink a step darker
        d: "M0 238 C 80 224, 140 190, 225 205 C 310 220, 380 160, 470 84 C 512 49, 545 52, 592 96 C 655 155, 720 205, 830 224 C 950 244, 1070 230, 1190 244 C 1300 256, 1390 252, 1440 254 L 1440 320 L 0 320 Z",
        peak: 0.34,
        base: 0.02,
        parallax: 62,
        delay: 1.0,
    },
    {
        // near foothills — low, dark, dissolving into the paper
        d: "M0 288 C 130 272, 250 282, 375 288 C 520 295, 620 272, 760 284 C 900 295, 1050 282, 1200 292 C 1320 299, 1400 296, 1440 297 L 1440 320 L 0 320 Z",
        peak: 0.4,
        base: 0.03,
        parallax: 110,
        delay: 1.3,
    },
];

function Ridge({ ridge, index, progress }) {
    const y = useTransform(progress, [0, 1], [0, ridge.parallax]);
    return (
        <motion.div className="absolute inset-0" style={{ y }}>
            <motion.svg
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="absolute bottom-0 left-0 w-full h-full"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.8, delay: ridge.delay, ease: [0.23, 1, 0.32, 1] }}
            >
                <defs>
                    <linearGradient id={`ridge-wash-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#191816" stopOpacity={ridge.peak} />
                        <stop offset="55%" stopColor="#191816" stopOpacity={(ridge.peak + ridge.base) / 4} />
                        <stop offset="100%" stopColor="#191816" stopOpacity={ridge.base} />
                    </linearGradient>
                </defs>
                <path d={ridge.d} fill={`url(#ridge-wash-${index})`} />
            </motion.svg>
        </motion.div>
    );
}

export default function InkMountains() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[52%] pointer-events-none overflow-hidden"
            style={{ maskImage: "linear-gradient(to top, black 82%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 82%, transparent 100%)" }}
        >
            {RIDGES.map((r, i) => (
                <Ridge key={i} ridge={r} index={i} progress={scrollYProgress} />
            ))}
        </div>
    );
}
