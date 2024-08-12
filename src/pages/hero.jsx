import React, { forwardRef } from 'react'
import '../style.css'
import { useEffect, useRef } from 'react'
import {motion, useInView, useAnimation} from 'framer-motion'

 function Hero(props, scrollRef){
    const ScrollRef = scrollRef;
    const ref = useRef(null)
    const isInView = useInView(ref, {once:true})

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
            hidden:{opacity:0, y:30},
                    visible:{opacity:1, y:0}
        };
      }
    return(
        <article  ref={ScrollRef} className='h-[70vh] w-full sm:h-[100vh] flex flex-col  items-start sm:justify-center sm:items-center justify-start pt-[200px] pl-8 sm:pl-0 sm:pt-0'>
            <motion.header 
                ref={ref}
                variants={boxVariants}
                initial={"hidden"}
                animate={mainControls}
                transition={{duration:0.3}}
            className='font-display ml-[4px] md:ml-0 w-full sm:w-auto tracking-[6px] pb-[24px] md:mb-0 2xl:text-[24px]'>SARAN-OCHIR .S</motion.header>
        <h1 className="w-full text-[64px] leading-[62px] sm:w-1/2 md:w-[65%] xl:w-auto flex flex-col items-start sm:items-center md:text-[96px] 2xl:text-[128px] 2xl:leading-[126px] text-center sm:leading-[96px] tracking-[2px] mt-6 md:mt-0" style={{fontFamily:'lexend'}}> 
                <motion.span 
               
                    variants={{hidden:{opacity:.0, y:90}, visible:{opacity:1, y:0}}} initial={"hidden"} 
                    animate={mainControls} 
                    transition={{duration:0.6, delay:0.8}}>coding</motion.span>
                <motion.span 
                    variants={{
                        hidden:{opacity:0.0, y:100}, 
                        visible:{opacity:1, y:0}}} initial={"hidden"} 
                    animate={mainControls} 
                    transition={{duration:0.6, delay:0.8 }}>my visions</motion.span>
                <motion.span 
                    variants={{hidden:{opacity:.0, y:110}, visible:{opacity:1, y:0}}} initial={"hidden"} 
                    animate={mainControls} 
                    transition={{duration:0.6, delay:0.8}}>since</motion.span>
        </h1>
            <motion.h2
           
            variants={{
                hidden:{opacity:0, y:90},
                visible:{opacity:1, y:0}
            }} 
            initial={"hidden"}
            animate={mainControls}
            transition={{duration:0.6, delay:1.05}}
            className="mt-4 md:mt-0 md:text-[88px] font-['sora'] 2xl:text-[120px] text-[60px]">2020</motion.h2>
        </article>
    )
}

export default forwardRef(Hero)