import React from "react";
import { motion } from 'framer-motion'
import SectionHeader from "../components/SectionHeader.jsx";
import SealStamp from "../components/SealStamp.jsx";

const EASE = [0.23, 1, 0.32, 1]

function Link(props){
    return(
        <motion.a
            href={props.footeLink}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group w-[254px] flex items-center justify-start gap-2 h-[36px] ml-[36px] active:scale-[0.98]"
        >
            <div className="w-2 h-2 bg-[var(--ink)] rounded-sm group-hover:scale-[1.5] group-hover:bg-[var(--vermillion)] duration-200 ease-out-strong"></div>
            <p className="font-body font-extrabold tracking-[8px] text-[20px] border-b-2 border-b-transparent group-hover:border-b-[var(--vermillion)] group-hover:duration-300">{props.socialLink}</p>
        </motion.a>
    )
}

function ContactInfo(props){
    return(
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group w-[227px] flex flex-col items-start justify-center font-body ml-[36px]"
        >
            <h3 className="font-extrabold text-[24px]">{props.contactInfoName}</h3>
            <p className="font-extrabold text-[16px] text-[var(--ink-soft)] group-hover:scale-105 duration-300 ease-out-strong">{props.contactInformation}</p>
        </motion.div>
    )
}

export default function Footer(){
    return(
        <footer id='CONTACT' className="w-full h-auto py-[64px] flex flex-col justify-center items-center">
            <SectionHeader className="pl-8 w-full md:pl-0 md:w-[65%] pb-[24px]">Let's connect</SectionHeader>
            <div className="h-auto w-full sm:w-[60%] flex sm:flex-row flex-col justify-start items-start gap-x-[24px] gap-y-4 sm:gap-y-0 sm:justify-center">
                <div className="w-full flex flex-col justify-start items-start sm:gap-y-[48px] gap-y-4">
                    <Link socialLink={"Instagram"} footeLink={"https://www.instagram.com/saagii_21/"}/>
                    <Link socialLink={"Git-Hub"} footeLink={"https://github.com/SaagiiSG"}/>
                </div>
                <div className="w-full flex flex-col justify-start items-start sm:gap-y-[48px] gap-4">
                    <Link socialLink={"LinkedIn"} footeLink={"https://www.linkedin.com/in/saran-ochir-s-96265931b/"}/>
                    <Link socialLink={"Behance"} footeLink={"https://www.behance.net/saranochir"}/>
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-4 sm:gap-y-[24px] mt-[72px] sm:mt-0">
                    <ContactInfo contactInfoName={"Email"} contactInformation={"saranochir.s@gmail.com"}/>
                    <ContactInfo contactInfoName={"Phone"} contactInformation={"(+976) 88163115"}/>
                </div>
            </div>

            <div className="w-full flex flex-col items-center justify-center mt-[88px] gap-5">
                <SealStamp/>
                <p className="text-[11px] tracking-[3px] uppercase opacity-40 font-body">© 2020 — {new Date().getFullYear()} Saran-Ochir.S</p>
                <p className="text-[10px] tracking-[1px] opacity-30 font-body text-center px-6">
                    wave — Hokusai (public domain) · goose — Wikimedia Commons (CC BY-SA 3.0) · origami crane — konta johanna / Aimi Sekiguchi via poly.pizza (CC BY 3.0)
                </p>
            </div>
        </footer>
    )
}
