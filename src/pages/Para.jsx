import React from "react";
import "../style.css"
import { motion } from 'framer-motion'
import SectionHeader from "../components/SectionHeader.jsx"

const EASE = [0.23, 1, 0.32, 1]

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const line = {
    hidden: { y: "112%" },
    visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
}
const word = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

function RevealLine({ children }) {
    return (
        <span className="block w-full overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span variants={line} className="block w-full">{children}</motion.span>
        </span>
    )
}

export default function Para(props){
    const lines = [
        <>{props.lineOne}<span className="text-[var(--vermillion)]">{props.insideSpan}</span>{props.lineOneC}</>,
        props.lineTwo,
        props.lineThree,
        props.lineFour,
        props.lineFive,
    ].filter((l) => l !== undefined && l !== null && l !== "")

    return(
        <article id={props.id} className={`relative flex flex-col items-start sm:items-center justify-center w-full sm:h-screen h-[70vh] pl-8 ${props.dark ? "bg-[var(--ink)] text-[var(--paper)]" : ""}`}>
            {props.backdrop}
            <SectionHeader className={`relative w-full pl-2 sm:w-[65%] ${props.dark ? "!text-[#b3aea4]" : ""}`}>{props.header}</SectionHeader>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-18%" }}
                className={`relative hidden sm:flex flex-col justify-center items-start md:w-[65%] sm:items-center w-auto text-left md:text-[64px] md:leading-[65px] text-[36px] mt-4 ${props.dark ? "font-medium" : ""}`}
            >
                {lines.map((l, i) => (
                    <RevealLine key={i}><p>{l}</p></RevealLine>
                ))}
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-12%" }}
                className={`relative block sm:hidden text-[40px] w-[95%] leading-[42px] mt-4 ${props.dark ? "font-medium" : ""}`}
            >
                <p>
                    {props.wholeText.split(" ").map((w, i) => (
                        <motion.span key={i} variants={word} className="inline-block mr-[0.26em]">{w}</motion.span>
                    ))}
                </p>
            </motion.div>
        </article>
    )
}
