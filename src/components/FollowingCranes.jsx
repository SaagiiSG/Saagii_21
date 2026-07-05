import React, { lazy, Suspense, useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";

// three.js loads in its own chunk, desktop only
const CraneFlight = lazy(() => import("./three/CraneFlight.jsx"));

// Fixed, click-through 3D layer: three vermillion origami cranes descend the
// right side of the viewport as you read, each on its own spring so the
// flock strings out and regroups when you stop scrolling.
export default function FollowingCranes() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setShow(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    const { scrollYProgress } = useScroll();
    const p1 = useSpring(scrollYProgress, { stiffness: 55, damping: 18, mass: 0.6 });
    const p2 = useSpring(scrollYProgress, { stiffness: 34, damping: 16, mass: 0.8 });
    const p3 = useSpring(scrollYProgress, { stiffness: 22, damping: 14, mass: 1.0 });

    if (!show) return null;

    return (
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[35]">
            <Suspense fallback={null}>
                <CraneFlight progresses={[p1, p2, p3]} />
            </Suspense>
        </div>
    );
}
