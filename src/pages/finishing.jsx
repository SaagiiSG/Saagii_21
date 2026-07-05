import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Enso from '../components/svg/Enso'
import SectionHeader from '../components/SectionHeader.jsx'

const EASE = [0.23, 1, 0.32, 1]

export default function Finish(){
    const ref = useRef(null)

    // The enso draws itself, scrubbed by scroll, as the motto approaches center screen.
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "center center"],
    })
    const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 })

    return(
    <article ref={ref} className='relative w-full h-[70vh] sm:h-[100vh] flex flex-col justify-center items-center overflow-hidden'>
        <Enso
            progress={pathLength}
            strokeWidth={9}
            opacity={0.08}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[78vmin] h-[78vmin] pointer-events-none"
        />
        <SectionHeader centered className='text-center w-full [&>span]:w-full'>My motto</SectionHeader>
        <div className='relative w-[95%] sm:w-[80%] flex flex-col justify-center items-center text-[40px] sm:text-[96px] text-center sm:leading-[100px] font-body font-bold tracking-[-1px] sm:font-medium sm:tracking-[3px] mt-6'>
            <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}>
                GENERALITY IS A SCAM</motion.p>
            <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.7, delay: 0.28, ease: EASE }}>
                SPECIFICITY IS THE NEW NORM</motion.p>
        </div>
    </article>
)
}
