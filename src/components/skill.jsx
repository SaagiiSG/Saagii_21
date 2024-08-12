import React from "react";
import "../style.css"
import { useEffect, useRef } from "react";
import {motion, useInView, useAnimation} from 'framer-motion'

export default function SkillItem(props){
    
    const ref = useRef(true)
    const isInView  = useInView(ref, {once:true})
    
    const mainContrtols = useAnimation();
    
    useEffect(()=>{
        if(isInView){
            mainContrtols.start("visible")
        }
    },[isInView])
    const isMobile = window.innerWidth < 768; 
    let boxVariants = {};

    if (!isMobile) {
        boxVariants = {
            hidden:{opacity:0, x:90},
            visible:{opacity:1, x:0}
        };
      }
    return(
        <motion.div ref={ref} className="group w-full flex justify-center items-center h-auto py-[16px] text-left border-t-[0.75px] border-slate-900"
            variants={boxVariants}  
            initial="hidden"
            animate={mainContrtols}    
            transition={{ duration:0.6, delay:.25}}
        >
            <h1 className="text-right sm:text-left w-[90%] text-[56px] md:w-[72%] md:text-[80px] md:leading-[80px] sm:group-hover:-translate-x-[6%] duration-300 relative font-display group-hover:opacity-50">{props.skillName}</h1>
            <p className="hidden sm:block sm:absolute opacity-0 w-[40%] text-[24px] sm:group-hover:block sm:group-hover:opacity-100 sm:group-hover:duration-[900ms] sm:group-hover:translate-x-[70%] font-body ease-out">{props.skillDescription}</p>
        </motion.div>
    )
}