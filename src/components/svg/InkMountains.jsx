import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Layered sumi-e mountain ranges for the hero's lower half, drawn like ink:
// each ridge has a crisp brush stroke along its crest that draws itself in
// (scrubbed pathLength, same language as the dividers and enso), a second
// fainter echo stroke slightly below, and a steep ink wash underneath that
// dissolves into mist. Ridges parallax at different rates on scroll.
const RIDGES = [
    {
        // far range — tall soft peaks, thin distant line
        line: "M0 150 C 70 138, 118 108, 168 112 C 205 115, 232 88, 275 96 C 318 104, 342 84, 388 90 C 442 97, 470 76, 520 88 C 575 101, 610 92, 660 110 C 720 132, 780 122, 845 140 C 915 159, 985 148, 1060 160 C 1140 173, 1220 162, 1300 172 C 1360 179, 1408 176, 1440 180",
        peak: 0.26,
        base: 0,
        strokeWidth: 1.6,
        strokeOpacity: 0.3,
        parallax: 26,
        delay: 0.7,
    },
    {
        // mid range — one dominant brush peak off-center
        line: "M0 240 C 60 230, 108 206, 160 212 C 215 218, 258 190, 310 200 C 355 208, 395 178, 440 130 C 470 98, 492 66, 520 56 C 540 49, 556 58, 574 82 C 600 116, 626 154, 668 186 C 715 222, 770 236, 838 226 C 900 217, 950 232, 1010 238 C 1090 246, 1170 236, 1250 244 C 1330 252, 1395 249, 1440 251",
        peak: 0.36,
        base: 0.02,
        strokeWidth: 2.6,
        strokeOpacity: 0.55,
        parallax: 62,
        delay: 1.0,
    },
    {
        // near foothills — low, dark, heaviest brush
        line: "M0 286 C 90 278, 170 284, 255 286 C 350 288, 420 274, 505 280 C 600 287, 680 276, 770 282 C 870 289, 960 280, 1060 286 C 1160 292, 1260 286, 1355 291 C 1400 293, 1425 293, 1440 294",
        peak: 0.44,
        base: 0.03,
        strokeWidth: 3.2,
        strokeOpacity: 0.62,
        parallax: 110,
        delay: 1.3,
    },
];

function Ridge({ ridge, index, progress }) {
    const y = useTransform(progress, [0, 1], [0, ridge.parallax]);
    const fill = `${ridge.line} L 1440 320 L 0 320 Z`;
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
                        <stop offset="30%" stopColor="#191816" stopOpacity={ridge.peak * 0.4} />
                        <stop offset="100%" stopColor="#191816" stopOpacity={ridge.base} />
                    </linearGradient>
                </defs>
                <path d={fill} fill={`url(#ridge-wash-${index})`} />
                {/* the brush stroke along the crest, drawn in like ink */}
                <motion.path
                    d={ridge.line}
                    fill="none"
                    stroke="#191816"
                    strokeWidth={ridge.strokeWidth}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: ridge.strokeOpacity }}
                    transition={{ duration: 2.4, delay: ridge.delay + 0.2, ease: [0.65, 0, 0.35, 1] }}
                />
                {/* faint echo stroke just below the crest — brush texture */}
                <motion.path
                    d={ridge.line}
                    fill="none"
                    stroke="#191816"
                    strokeWidth={ridge.strokeWidth * 0.5}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    transform="translate(6 7)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: ridge.strokeOpacity * 0.35 }}
                    transition={{ duration: 2.4, delay: ridge.delay + 0.45, ease: [0.65, 0, 0.35, 1] }}
                />
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
