import React from "react";
import { useHref } from "react-router-dom";
import { useEffect, useRef } from "react";
import {motion, useInView, useAnimation} from 'framer-motion'

function Link(props){

    const ref = useRef(null)
    const isInView = useInView(ref)

    const mainControls = useAnimation()

    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])

    return(
        <motion.a ref={ref} href={props.footeLink} 
        variants={{
            hidden:{opacity:0, y:90},
            visible:{opacity:1, y:0}
        }}
        initial={"hidden"}
        animate={mainControls}
        onClick={()=>{
            
        }} className="group w-[254px] flex items-center justify-start gap-2 h-[36px] ml-[36px]">
            <div className="w-2 h-2 bg-slate-800 rounded-sm group-hover:scale-[1.5] group-hover:bg-slate-500 duration-200"></div>
            <p className="font-body font-extrabold tracking-[8px] text-[20px] border-b-2 border-b-transparent group-hover:border-b-slate-500 group-hover:duration-500">{props.socialLink}</p>
        </motion.a>
    )
}
function ContactInfo(props){
    const ref = useRef(null)
    const isInView = useInView(ref)

    const mainControls = useAnimation()

    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])
    return(
        
        <motion.div
        ref={ref} 
        variants={{
            hidden:{opacity:0, y:90},
            visible:{opacity:1, y:0}
        }}
        initial={"hidden"}
        animate={mainControls}
        className="group w-[227px] flex flex-col items-start justify-center font-display ml-[36px]">
            <h3 className="font-extrabold text-[24px]">{props.contactInfoName}</h3>
            <p className="font-extrabold text-[16px] text-slate-900 opacity-85 group-hover:scale-105 duration-300 ">{props.contactInformation}</p>
        </motion.div>
)
}
export default function Footer(){
    return(
        <footer id='CONTACT' className="w-full h-auto py-[64px] flex flex-col justify-center items-center ">
            <header className="md:w-[65%] header pb-[32px]">Let's connect</header>
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
        </footer>
    )
}