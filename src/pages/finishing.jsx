import React from 'react'
import {useEffect, useRef} from 'react'
import {motion, useInView, useAnimation} from 'framer-motion'

export default function Finish(){

    const ref = useRef(null)
    const isInView = useInView(ref, {once:true})

    const mainContrtols = useAnimation()
    useEffect(()=>{
        if(isInView){
            mainContrtols.start("visible")
        }
    },[isInView])
    const isMobile = window.innerWidth < 768; 
    let boxVariants = {};

    if (!isMobile) {
        boxVariants = {
            hidden:{opacity:0, y:-20},
            visible:{opacity:1, y:20}
        };
      }
    return(
    <article id='contact' className='w-full h-[70vh] sm:h-[100vh] flex flex-col justify-center items-center overflow-hidden'>
        <header className='header text-center w-full'>My motto</header>
        <div className='w-[95%] sm:w-[80%] flex flex-col justify-center items-center text-[40px] sm:text-[96px] text-center sm:leading-[100px] font-display font-bold tracking-[-1px] sm:font-medium sm:tracking-[3px]'>
            <motion.p ref={ref} 
            variants={{
                    hidden:{opacity:0, y:-20},
                    visible:{opacity:1, y:20}
            }}
            initial={"hidden"}
            animate={mainContrtols}
            transition={{duration:0.6, delay:.2}}>
                GOOD CODE IS UNDERSTANDABLE</motion.p>
            <motion.p ref={ref}  variants={{
                    hidden:{opacity:0, y:-30},
                    visible:{opacity:1, y:20}
            }}
            initial={"hidden"}
            animate={mainContrtols}
            transition={{duration:0.6, delay:.4}}> BETTER CODE IS MINIMAL</motion.p>
        </div>
    </article>
)
}