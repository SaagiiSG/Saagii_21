import React from "react";
import "../style.css"
import { motion } from 'framer-motion'

export default function SkillItem(props){
    return(
        <motion.div
            className="group w-full flex flex-col sm:flex-row justify-center items-center h-auto py-[16px] text-left border-t-[0.75px] border-[#19181633] relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        >
            <span className="hidden md:block absolute left-[9%] top-[24px] text-[13px] tracking-[4px] opacity-40 font-body">{props.index}</span>
            <h1 className="text-right sm:text-left w-[90%] text-[56px] md:w-[72%] md:text-[80px] md:leading-[80px] sm:group-hover:-translate-x-[6%] duration-300 ease-out-strong relative font-body group-hover:opacity-40">{props.skillName}</h1>
            {/* touch screens can't hover — show the description inline */}
            <p className="block sm:hidden w-[90%] text-right text-[14px] leading-[20px] font-body text-[var(--ink-faint)] pb-1">{props.skillDescription}</p>
            <p className="hidden sm:block sm:absolute opacity-0 w-[40%] text-[24px] sm:group-hover:block sm:group-hover:opacity-100 sm:group-hover:duration-[500ms] sm:group-hover:translate-x-[70%] font-body ease-out">{props.skillDescription}</p>
        </motion.div>
    )
}
