import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import SectionHeader from '../components/SectionHeader.jsx'

const EASE = [0.23, 1, 0.32, 1]

// `image` is optional — drop a screenshot in src/assets/projects/, import it,
// and set it here. Without one the preview card shows an ink title card.
const projects = [
    {
        index: "01",
        name: "NEON EDU",
        role: "designed and developed the company website",
        link: "https://neonedu.net/",
        domain: "neonedu.net",
        linkLabel: "see the website",
    },
    {
        index: "02",
        name: "FlowersOS",
        role: "built the platform for a Mongolian SAT math center — 700+ users",
        link: "https://flowersos.co/",
        domain: "flowersos.co",
        linkLabel: "see the website",
    },
    {
        index: "03",
        name: "AI Instructor",
        role: (
            <>
                I teach people to use AI in their real work at{" "}
                <a
                    href="https://lambda.global/"
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 text-[var(--vermillion)] underline-offset-4 hover:underline"
                >
                    Lambda
                </a>
            </>
        ),
        link: "https://lambda.global/ai/instructor/61",
        domain: "lambda.global",
        linkLabel: "meet the instructor",
    },
]

const CARD_W = 340
const CARD_H = 272
const GAP = 24

function useCanHover(){
    const [canHover, setCanHover] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
        const update = () => setCanHover(mq.matches)
        update()
        mq.addEventListener("change", update)
        return () => mq.removeEventListener("change", update)
    }, [])
    return canHover
}

function Preview({ project }){
    if (project.image) {
        return <img src={project.image} alt="" className="w-full h-full object-cover" />
    }
    return (
        <div className="relative w-full h-full bg-[var(--ink)] text-[var(--paper)] overflow-hidden">
            <span className="absolute -right-2 -bottom-10 text-[150px] leading-none font-body font-extralight opacity-[0.08]">{project.index}</span>
            <span className="absolute left-4 top-4 w-3 h-3 bg-[var(--vermillion)] rotate-3" />
            <span className="absolute left-4 bottom-4 text-[30px] leading-[32px] font-body">{project.name}</span>
        </div>
    )
}

function HoverCard({ active, x, y }){
    // lean the card into the direction of travel
    const velocity = useVelocity(x)
    const rotate = useSpring(useTransform(velocity, [-2000, 2000], [-7, 7], { clamp: true }), { stiffness: 250, damping: 30 })
    const project = active === null ? null : projects[active]

    return (
        <motion.div
            aria-hidden="true"
            className="fixed left-0 top-0 z-[60] pointer-events-none"
            style={{ x, y, rotate }}
        >
            <AnimatePresence>
                {project && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="origin-top-left bg-[var(--paper)] border border-[#19181626] shadow-[0_18px_40px_-12px_rgba(25,24,22,0.35)] p-3"
                        style={{ width: CARD_W }}
                    >
                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                            {/* every preview stays mounted so switching rows crossfades instead of popping */}
                            {projects.map((p, i) => (
                                <motion.div
                                    key={p.name}
                                    className="absolute inset-0"
                                    initial={false}
                                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                >
                                    <Preview project={p} />
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex items-center justify-between pt-3 font-body text-[14px] tracking-[1px]">
                            <span className="text-[var(--ink-soft)]">{project.domain}</span>
                            <span className="text-[var(--vermillion)]">visit ↗</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default function Projects(){
    const canHover = useCanHover()
    const [active, setActive] = useState(null)

    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)
    const x = useSpring(rawX, { stiffness: 300, damping: 30, mass: 0.6 })
    const y = useSpring(rawY, { stiffness: 300, damping: 30, mass: 0.6 })

    const handleMouseMove = (e) => {
        // sit below-right of the cursor, flipping when it would leave the viewport
        const nextX = e.clientX + GAP + CARD_W > window.innerWidth ? e.clientX - GAP - CARD_W : e.clientX + GAP
        const nextY = e.clientY + GAP + CARD_H > window.innerHeight ? e.clientY - GAP - CARD_H : e.clientY + GAP
        if (active === null) {
            // first frame of a hover: appear at the cursor instead of flying in from the last spot
            x.jump(nextX)
            y.jump(nextY)
        }
        rawX.set(nextX)
        rawY.set(nextY)
    }

    return(
        <article id='WORK' className="w-full h-screen flex flex-col justify-center items-center">
            <SectionHeader className='w-[85%] sm:w-[65%] mb-4'>Projects</SectionHeader>
            <section
                className='w-full flex flex-col gap-0 justify-start items-center'
                onMouseMove={canHover ? handleMouseMove : undefined}
                onMouseLeave={() => setActive(null)}
            >
                {projects.map((p, i) => (
                    <motion.div
                        key={p.name}
                        className="group w-full flex flex-col justify-center items-center h-auto py-[16px] text-left border-t-[0.75px] border-[#19181626] overflow-hidden pl-6 relative"
                        initial={{ opacity: 0, y: 34 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.65, delay: i * 0.12, ease: EASE }}
                        onMouseEnter={canHover ? () => setActive(i) : undefined}
                    >
                        <span className="hidden md:block absolute left-[9%] top-[24px] text-[13px] tracking-[4px] opacity-40 font-body">{p.index}</span>
                        <h1 className="w-full text-[64px] md:w-[72%] sm:text-[80px] leading-[80px] duration-300 ease-out-strong relative font-body group-hover:text-[var(--vermillion)] group-focus-within:text-[var(--vermillion)] sm:group-hover:translate-x-[1.5%]">{p.name}</h1>
                        <h2 className="w-full md:w-[72%] tracking-[4px] font-body">{p.role}</h2>

                        {!canHover && (
                            <a href={p.link} target="_blank" rel="noreferrer" className="relative z-10 w-full md:w-[72%] text-left text-[20px] font-body opacity-80 font-light mt-2 active:scale-[0.98]">{p.linkLabel} {`>`}</a>
                        )}

                        {/* covers the whole row so it's one big click target; inner links sit above it on z-10 */}
                        <a href={p.link} target="_blank" rel="noreferrer" aria-label={`${p.name} — ${p.domain}`} className="absolute inset-0 focus-visible:outline-none" />
                    </motion.div>
                ))}
            </section>

            {canHover && <HoverCard active={active} x={x} y={y} />}
        </article>
    )
}
