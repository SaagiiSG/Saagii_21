import React from 'react'
import InstaIcon from "../assets/instagram-logo.svg"
import GitIcon from "../assets/github.svg"
import LinkedInIcon from "../assets/linkedin.svg"
import {motion, useInView, useAnimation} from 'framer-motion'
import { useEffect , useRef} from "react";

export default function SocialIcons(){
    const ref = useRef(null)
    const isInView = useInView(ref)

    const mainControls = useAnimation()
    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])
    const isMobile = window.innerWidth < 768; 
    let boxVariants = {};

    if (!isMobile) {
        boxVariants = {
          hidden:{opacity:0, x:-100},
              visible:{opacity:1, x:0}
        };
      }
    return(
        <motion.section 
        ref={ref}
        variants={boxVariants}
        initial={"hidden"}
        animate={mainControls}
        transition={{duration:0.8,}}
        className='hidden sm:flex flex-col md:gap-[32px] fixed md:bottom-[56px] md:left-[72px] 2xl:left-[96px] 2xl:bottom-[106px] [&>a>img]:2xl:w-[32px] 2xl:gap-[72px]'> 
            <motion.a href='https://www.instagram.com/saagii_21/' whileHover={{x:4, y:-4, opacity:1}}><img src={InstaIcon} alt="" className='md:w-[28px] hover:scale-105 duration-100 hover:duration-100 hover:fill-slate-500' /></motion.a>
            <motion.a href='https://github.com/SaagiiSG' whileHover={{x:4, y:-4, opacity:1}}><img src={GitIcon} alt="" className='md:w-[28px] hover:scale-105 duration-100 hover:duration-100 hover:fill-slate-500'/></motion.a >
            <motion.a href='https://www.linkedin.com/in/saran-ochir-s-96265931b/' whileHover={{x:4, y:-4, opacity:1}}><img src={LinkedInIcon} alt="" className='md:w-[28px] hover:scale-105 duration-100 hover:duration-100 hover:fill-slate-500' /></motion.a >
        </motion.section>
    )
}