import React, { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import waveSrc from "../assets/great-wave.jpg";

// Hokusai's Great Wave (public domain) re-rendered as ASCII, drawn on a
// canvas in ink. Rows resolve top-to-bottom as the section scrolls in —
// with a scrambled frontier while they settle — and once resolved the
// whole grid sways gently, row by row, like water.
const COLS = 100;
const RAMP = "@#%&8*+=~-:.  ";
const FONT = 11;
const LINE_H = 10;
const MASK = "radial-gradient(ellipse 72% 68% at center, black 48%, transparent 99%)";

export default function AsciiWave() {
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, mass: 0.5 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const font = `${FONT}px ui-monospace, SFMono-Regular, Menlo, monospace`;

        let grid = null;
        let rows = 0;
        let charW = 7;
        let raf = 0;
        let inView = true;

        const img = new Image();
        img.src = waveSrc;
        img.onload = () => {
            ctx.font = font;
            charW = ctx.measureText("M").width;

            const aspect = img.height / img.width;
            rows = Math.round(COLS * aspect * (charW / LINE_H));

            const off = document.createElement("canvas");
            off.width = COLS;
            off.height = rows;
            const octx = off.getContext("2d");
            octx.drawImage(img, 0, 0, COLS, rows);
            const data = octx.getImageData(0, 0, COLS, rows).data;

            grid = [];
            for (let r = 0; r < rows; r++) {
                const line = [];
                for (let c = 0; c < COLS; c++) {
                    const i = (r * COLS + c) * 4;
                    const b = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
                    line.push(b > 232 ? " " : RAMP[Math.min(RAMP.length - 1, Math.floor((b / 232) * (RAMP.length - 1)))]);
                }
                grid.push(line);
            }

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.ceil(COLS * charW * dpr);
            canvas.height = Math.ceil(rows * LINE_H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = font;
            ctx.textBaseline = "top";

            if (reduce) {
                draw(1, 0, false);
            } else {
                raf = requestAnimationFrame(loop);
            }
        };

        function draw(p, t, scramble) {
            ctx.clearRect(0, 0, COLS * charW, rows * LINE_H);
            ctx.fillStyle = "rgba(25, 24, 22, 0.8)";
            const frontier = Math.min(1, p / 0.55) * (rows + 8);
            for (let r = 0; r < rows; r++) {
                if (r > frontier) break;
                let line;
                if (scramble && r > frontier - 4) {
                    line = grid[r]
                        .map((ch) => (ch === " " ? " " : RAMP[(Math.random() * (RAMP.length - 3)) | 0]))
                        .join("");
                } else {
                    line = grid[r].join("");
                }
                const sway = Math.sin(t * 0.9 + r * 0.28) * 2;
                ctx.fillText(line, sway, r * LINE_H);
            }
        }

        function loop(now) {
            if (inView && grid) draw(smooth.get(), now / 1000, true);
            raf = requestAnimationFrame(loop);
        }

        const io = new IntersectionObserver(([e]) => {
            inView = e.isIntersecting;
        });
        io.observe(canvas);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
        };
    }, [smooth]);

    return (
        <div ref={sectionRef} aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
            <canvas
                ref={canvasRef}
                className="absolute right-[-2%] bottom-[4%] w-[88%] sm:w-[64%] max-w-[900px] mix-blend-multiply"
                style={{ maskImage: MASK, WebkitMaskImage: MASK }}
            />
        </div>
    );
}
