import React from 'react'
import { redirect, useNavigate, Link } from 'react-router-dom'
import {useEffect, useRef} from 'react'
import {motion, useInView, useAnimation} from 'framer-motion'

export default function Projects(props){
    const ref = useRef(null)
    const isInView = useInView(ref, {once:true})

    const mainContrtols = useAnimation()
    useEffect(()=>{
        if(isInView){
            mainContrtols.start("visible")
        }
    },[isInView])
    let thirdPname = "Runiversity"
    let boxVariants = {};
    
    const isMobile = window.innerWidth < 768;
    if(isMobile){
        thirdPname="RU";
    }
    if (!isMobile) {
        boxVariants = {
            hidden:{opacity:0, x:40},
            visible:{opacity:1, x:0}
        };
      }
    return(
        <artcile id='work' className="w-full h-screen flex flex-col justify-center items-center">
            <header className='w-[65%] header'>Projects</header>
            <section className='w-full flex flex-col gap-0 justify-start items-center '>
                <motion.div ref={ref} className="group w-full flex flex-col justify-center items-center h-auto py-[16px] text-left border-t-[0.75px] border-slate-400 overflow-hidden pl-6" 
                variants={boxVariants}
                initial={"hidden"}
                animate={mainContrtols}
                transition={{duration:0.6, delay:.3}}
                >
                    <h1 className="w-full text-[64px] md:w-[72%] sm:text-[80px] leading-[80px]  duration-300 relative font-display group-hover:text-[#FF6C00] group-hover:opacity-100">NEON EDU</h1>
                    <h2 className="md:w-[72%] tracking-[4px] font-display"> portfolio website developer, designer</h2>

                    <a href='https://neonedu.net/' className="w-full text-left sm:absolute sm:opacity-0 sm:w-auto text-[20px]  sm:group-hover:block sm:group-hover:opacity-100 sm:group-hover:duration-[400ms] sm:group-hover:translate-x-[40%] font-body ease-out   sm:underline cursor-pointer opacity-80 font-light mt-2">see the website {`>`}</a>
                </motion.div >
                <motion.div ref={ref} className="group w-full flex flex-col justify-center items-center h-auto py-[16px] text-left border-t-[0.75px] border-slate-400 overflow-hidden pl-6"
                variants={boxVariants}
                initial={"hidden"}
                animate={mainContrtols}
                transition={{duration:0.6, delay:.6}}
                >
                    <h1 className="w-full text-[64px] md:w-[72%] sm:text-[80px] leading-[80px]  duration-300 relative font-display group-hover:text-[#CA53BA] group-hover:opacity-100">LUNCHRR</h1>
                    <h2 className="md:w-[72%] tracking-[4px] font-display">front-end developer, ui/ux designer</h2>

                    <a href='https://github.com/SaagiiSG/LUNCHRR-test' className="w-full text-left sm:absolute sm:opacity-0 sm:w-auto text-[20px]  sm:group-hover:block sm:group-hover:opacity-100 sm:group-hover:duration-[400ms] sm:group-hover:translate-x-[40%] font-body ease-out   sm:underline cursor-pointer opacity-80 font-light mt-2"
                        >git repo {`>`}</a>
                </motion.div >
                <motion.div ref={ref} className="group w-full flex flex-col justify-center items-center h-auto py-[16px] text-left border-t-[0.75px] border-slate-400 overflow-hidden pl-6"
                  variants={boxVariants}
                initial={"hidden"}
                animate={mainContrtols}
                transition={{duration:0.6, delay:.9}}
                >
                    <h1 className="w-full text-[64px] md:w-[72%] sm:text-[80px] leading-[80px]  duration-300 relative font-display group-hover:text-[#18CBE6] group-hover:opacity-100">{thirdPname}</h1>
                    <h2 className="md:w-[72%] tracking-[4px] font-display">founder, lead developer, ui/ux designer</h2>

                    <a href='' className="w-full text-left sm:absolute sm:opacity-0 sm:w-auto text-[20px]  sm:group-hover:block sm:group-hover:opacity-100 sm:group-hover:duration-[400ms] sm:group-hover:translate-x-[40%] font-body ease-out   sm:underline cursor-pointer opacity-80 font-light mt-2">coming soon {`>`}</a>
                </motion.div>
                    
            </section>
        </artcile>
    )
}