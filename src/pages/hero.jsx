import React, { useRef } from 'react'
import '../style.css'
import { motion, useScroll, useTransform } from 'framer-motion'
import Alert from '../components/alert'
import Enso from '../components/svg/Enso'
import GooseFlock from '../components/svg/GooseFlock'
import InkMountains from '../components/svg/InkMountains'

const EASE = [0.23, 1, 0.32, 1]

function Line({ children, delay }) {
    return (
        <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
                className="block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    )
}

function Hero() {
    const articleRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: articleRef,
        offset: ["start start", "end start"],
    })
    const driftY = useTransform(scrollYProgress, [0, 1], [0, 90])
    const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

    return (
        <article ref={articleRef} className='relative h-[70vh] w-full sm:h-[100vh] flex flex-col items-start sm:justify-center sm:items-center justify-start pt-[200px] pl-8 sm:pl-0 sm:pt-0'>
            <InkMountains />
            <GooseFlock />
            <Alert />
            <motion.div style={{ y: driftY, opacity: fade }} className="flex flex-col items-start sm:items-center">
                <motion.header
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                    className="ml-[4px] md:ml-0 w-full sm:w-auto tracking-[6px] pb-[24px] md:mb-0 2xl:text-[24px] font-['sora']">SARAN-OCHIR.S</motion.header>
                <h1 className="w-full text-[56px] leading-[58px] sm:w-1/2 md:w-[65%] xl:w-auto flex flex-col items-start sm:items-center md:text-[96px] 2xl:text-[128px] 2xl:leading-[126px] text-center sm:leading-[96px] tracking-[2px] mt-6 md:mt-0" style={{ fontFamily: 'lexend' }}>
                    <Line delay={0.55}>coding</Line>
                    <Line delay={0.67}>my visions</Line>
                    <Line delay={0.79}>since</Line>
                </h1>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
                    className="relative mt-4 md:mt-0 md:text-[88px] font-['sora'] 2xl:text-[120px] text-[54px] px-[0.3em]">
                    <Enso
                        stretch
                        delay={1.6}
                        strokeWidth={14}
                        opacity={0.9}
                        className="absolute -inset-x-[0.24em] -inset-y-[0.08em] w-[calc(100%+0.48em)] h-[calc(100%+0.16em)] -rotate-2"
                    />
                    <span className="relative">2020</span>
                </motion.h2>
            </motion.div>

            <motion.div
                aria-hidden="true"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
            >
                <span className="text-[10px] tracking-[4px] uppercase opacity-50 font-body">scroll</span>
                <div className="h-10 w-px bg-[#19181633] overflow-hidden">
                    <motion.div
                        className="w-full h-full bg-[var(--ink)]"
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </article>
    )
}

export default Hero
