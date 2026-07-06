import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader.jsx'

const projects = [
    {
        index: "01",
        name: "NEON EDU",
        role: "portfolio website developer, designer",
        link: "https://neonedu.net/",
        linkLabel: "see the website",
    },
    {
        index: "02",
        name: "FlowersOS",
        role: "software for the best SAT math edu center in Mongolia — 700+ users",
        link: "https://flowersos.co/",
        linkLabel: "see the website",
    },
]

export default function Projects(){
    return(
        <article id='WORK' className="w-full h-screen flex flex-col justify-center items-center">
            <SectionHeader className='w-[85%] sm:w-[65%] mb-4'>Projects</SectionHeader>
            <section className='w-full flex flex-col gap-0 justify-start items-center'>
                {projects.map((p, i) => (
                    <motion.div
                        key={p.name}
                        className="group w-full flex flex-col justify-center items-center h-auto py-[16px] text-left border-t-[0.75px] border-[#19181626] overflow-hidden pl-6 relative"
                        initial={{ opacity: 0, y: 34 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.65, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <span className="hidden md:block absolute left-[9%] top-[24px] text-[13px] tracking-[4px] opacity-40 font-body">{p.index}</span>
                        <h1 className="w-full text-[64px] md:w-[72%] sm:text-[80px] leading-[80px] duration-300 ease-out-strong relative font-body group-hover:text-[var(--vermillion)] sm:group-hover:translate-x-[1.5%]">{p.name}</h1>
                        <h2 className="md:w-[72%] tracking-[4px] font-body">{p.role}</h2>

                        {p.link && (
                            <a href={p.link} className="w-full text-left sm:absolute sm:opacity-0 sm:w-auto text-[20px] sm:group-hover:block sm:group-hover:opacity-100 sm:group-hover:duration-[400ms] sm:group-hover:translate-x-[40%] font-body ease-out sm:underline cursor-pointer opacity-80 font-light mt-2 active:scale-[0.98]">{p.linkLabel} {`>`}</a>
                        )}
                    </motion.div>
                ))}
            </section>
        </article>
    )
}
