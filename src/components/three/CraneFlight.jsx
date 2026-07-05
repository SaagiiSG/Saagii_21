import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const MODEL_URL = `${import.meta.env.BASE_URL}models/origami-crane.glb`;

// The canvas layer is always full-viewport, so measure with plain window
// resize events instead of ResizeObserver (which some embedded webviews stub
// out — R3F would then never size the canvas or render the scene).
class ViewportResizeObserver {
    constructor(callback) {
        this.callback = callback;
        this.targets = new Set();
        this.handle = () =>
            this.callback(
                [...this.targets].map((target) => ({ target, contentRect: target.getBoundingClientRect() })),
                this
            );
    }
    observe(target) {
        this.targets.add(target);
        window.addEventListener("resize", this.handle);
        this.handle();
    }
    unobserve(target) {
        this.targets.delete(target);
    }
    disconnect() {
        this.targets.clear();
        window.removeEventListener("resize", this.handle);
    }
}

// Origami crane by konta johanna (origami design Aimi Sekiguchi), CC BY 3.0,
// via poly.pizza — flat vermillion paper with ink fold lines.
function buildInkCrane(scene) {
    const s = scene.clone(true);
    s.traverse((o) => {
        if (o.isMesh) {
            o.material = new THREE.MeshStandardMaterial({
                color: "#bf3b22",
                flatShading: true,
                roughness: 0.85,
                metalness: 0,
            });
            const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(o.geometry, 10),
                new THREE.LineBasicMaterial({ color: "#5e1a0e", transparent: true, opacity: 0.45 })
            );
            o.add(edges);
        }
    });
    const box = new THREE.Box3().setFromObject(s);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const norm = 1 / Math.max(size.x, size.y, size.z);
    return { s, norm, center };
}

// One crane descending the viewport on its own scroll spring while sweeping
// left-right on a sine path — `crossings` sets how many times it crosses the
// screen on the way down. It turns to face its direction of travel and banks
// into the turns.
function Crane({ progress, scale, phase, crossings }) {
    const group = useRef();
    const gltf = useLoader(GLTFLoader, MODEL_URL);
    const { s, norm, center } = useMemo(() => buildInkCrane(gltf.scene), [gltf]);
    const { viewport } = useThree();
    const reduce = useMemo(
        () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        []
    );

    useFrame((state) => {
        const g = group.current;
        if (!g) return;
        const t = state.clock.getElapsedTime();
        const p = progress.get();

        const a = p * Math.PI * crossings + phase;
        const vx = Math.cos(a); // horizontal direction of travel

        g.position.x = Math.sin(a) * viewport.width * 0.42;
        g.position.y = (0.5 - p) * (viewport.height + 1.8) + (reduce ? 0 : Math.sin(t * 1.1 + phase) * 0.1);

        // turn smoothly to face travel direction, bank into the turn
        const targetYaw = vx >= 0 ? 0.9 : Math.PI - 0.9;
        g.rotation.y += (targetYaw - g.rotation.y) * 0.06;
        const bank = -vx * 0.22 + (reduce ? 0 : Math.sin(t * 0.9 + phase) * 0.06);
        g.rotation.z += (bank - g.rotation.z) * 0.08;
    });

    return (
        <group ref={group} scale={norm * scale}>
            <primitive object={s} position={[-center.x, -center.y, -center.z]} />
        </group>
    );
}

export default function CraneFlight({ progresses }) {
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 6], fov: 40 }}
            gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
            resize={{ polyfill: ViewportResizeObserver, scroll: false, debounce: 0 }}
            style={{ background: "transparent", pointerEvents: "none" }}
            onCreated={({ gl }) => {
                // the layer is decorative — never let the canvas eat clicks/hovers
                gl.domElement.style.pointerEvents = "none";
            }}
        >
            <ambientLight intensity={0.85} />
            <directionalLight position={[3, 4, 5]} intensity={0.9} />
            <Crane progress={progresses[0]} scale={0.6} phase={0.5} crossings={3} />
            <Crane progress={progresses[1]} scale={0.42} phase={2.4} crossings={4} />
            <Crane progress={progresses[2]} scale={0.3} phase={4.2} crossings={2.5} />
        </Canvas>
    );
}
