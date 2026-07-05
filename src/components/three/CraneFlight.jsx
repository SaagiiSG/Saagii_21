import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

const MODEL_URL = `${import.meta.env.BASE_URL}models/origami-crane.glb`;

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

// One crane riding its own scroll spring from the top of the viewport to the
// bottom. `progress` is a framer-motion MotionValue — each crane gets a
// different spring so the flock trails out while you scroll.
function Crane({ progress, fx, scale, phase, spin }) {
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
        g.position.y = (0.5 - p) * (viewport.height + 1.8);
        g.position.x = viewport.width * fx + (reduce ? 0 : Math.sin(t * 0.6 + phase) * 0.25);
        g.rotation.y = phase + p * Math.PI * 2 * spin + (reduce ? 0 : t * 0.12);
        g.rotation.z = reduce ? 0 : Math.sin(t * 0.9 + phase) * 0.08;
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
            style={{ background: "transparent" }}
        >
            <ambientLight intensity={0.85} />
            <directionalLight position={[3, 4, 5]} intensity={0.9} />
            <Crane progress={progresses[0]} fx={0.31} scale={0.6} phase={0.4} spin={1} />
            <Crane progress={progresses[1]} fx={0.4} scale={0.42} phase={2.1} spin={1.35} />
            <Crane progress={progresses[2]} fx={0.355} scale={0.3} phase={4.0} spin={0.8} />
        </Canvas>
    );
}
