import React, { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import waveSrc from "../assets/great-wave.jpg";

// Hokusai's Great Wave (public domain) re-rendered as ASCII on a canvas.
// A quick scrambled resolve on entry, then the tide takes over: every row
// is displaced by two traveling waves (horizontal swell + vertical lift)
// whose amplitude grows with depth, so the whole grid rolls like water.
const RAMP = "@#%&8*+=~-:.  ";
const FONT = 11;
const LINE_H = 10;

export default function AsciiWave({ dark = false, fullWidth = false }) {
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
        const cols = fullWidth ? (window.innerWidth < 640 ? 104 : 150) : 100;
        const inkColor = dark ? "rgba(209, 205, 195, 0.4)" : "rgba(25, 24, 22, 0.8)";

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
            rows = Math.round(cols * aspect * (charW / LINE_H));

            const off = document.createElement("canvas");
            off.width = cols;
            off.height = rows;
            const octx = off.getContext("2d");
            octx.drawImage(img, 0, 0, cols, rows);
            const data = octx.getImageData(0, 0, cols, rows).data;

            grid = [];
            for (let r = 0; r < rows; r++) {
                const line = [];
                for (let c = 0; c < cols; c++) {
                    const i = (r * cols + c) * 4;
                    const b = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
                    line.push(b > 232 ? " " : RAMP[Math.min(RAMP.length - 1, Math.floor((b / 232) * (RAMP.length - 1)))]);
                }
                grid.push(line.join(""));
            }

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.ceil(cols * charW * dpr);
            canvas.height = Math.ceil((rows * LINE_H + 16) * dpr);
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
            ctx.clearRect(0, 0, cols * charW, rows * LINE_H + 16);
            ctx.fillStyle = inkColor;
            const reveal = Math.min(1, p / 0.35);
            const frontier = reveal * (rows + 8);
            for (let r = 0; r < rows; r++) {
                if (r > frontier) break;
                let line = grid[r];
                if (scramble && reveal < 1 && r > frontier - 4) {
                    line = line.replace(/[^ ]/g, () => RAMP[(Math.random() * (RAMP.length - 3)) | 0]);
                }
                // the tide: two traveling waves, stronger toward the bottom rows
                const depth = r / rows;
                const swayX = Math.sin(t * 0.7 + r * 0.35) * (2 + depth * 9);
                const liftY = Math.sin(t * 1.15 + r * 0.5) * (1 + depth * 3);
                ctx.fillText(line, swayX, r * LINE_H + liftY + 6);
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
    }, [smooth, dark, fullWidth]);

    const placement = fullWidth
        ? "left-0 bottom-0 w-full"
        : "right-[-2%] bottom-[4%] w-[88%] sm:w-[64%] max-w-[900px] mix-blend-multiply";
    const mask = fullWidth
        ? "linear-gradient(to top, black 60%, transparent 99%)"
        : "radial-gradient(ellipse 72% 68% at center, black 48%, transparent 99%)";

    return (
        <div ref={sectionRef} aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
            <canvas
                ref={canvasRef}
                className={`absolute ${placement}`}
                style={{ maskImage: mask, WebkitMaskImage: mask }}
            />
        </div>
    );
}
