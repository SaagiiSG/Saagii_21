import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import Logo from "../assets/website logo.svg"
import { useEffect, useRef } from 'react'
import {motion, useInView, useAnimation} from 'framer-motion'
import {sectionIds} from "./sectionIds.jsx"
export default function Nav(props){

    const Aref = useRef(null)
    const isInView = useInView(Aref)

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
            hidden:{y:-90},
            visible:{y:0}
        };
      }

      const [activeLink, setActiveLink] = useState("hero")
      const [isScrolled, setIsScrolled] = useState(false)

      const scrollToSection = (sectionId) =>{
        const element = document.getElementById(sectionId)
        if(element){
            const mTop = 0;
            const scrollToY = element.getBoundingClientRect().top + window.scrollY - mTop;
            window.scrollTo({top:scrollToY, behavior:"smooth"})
        }
      }

    return(
        <motion.nav 
            ref={Aref}
            variants={boxVariants} 
            initial={"hidden"}
            animate={mainControls}
            transition={{duration:0.8}}
            className='z-50 w-full flex flex-row items-center sm:overflow-hidden justify-between 2xl:px-[96px] md:px-[72px] sm:py-[32px] 2xl:py-[48px] md:text-[18px] fixed py-4 px-4 '>
            <header className='z-50 group text-[20px] md:text-[24px] h-auto flex flex-col items-center justify-center sm:justify-start overflow-hidden  tracking-[6px] font-body font-normal  2xl:text-[28px]'>
                {/* <Link to="/" className='duration-700 w-[42px] text-center'>SG</Link> 
                <Link to="/" className='duration-700 w-[42px] text-center 2xl:tracking-[13px]'>21</Link>  */}
                <a href='' className='w-auto h-auto'><motion.img variants={{
                    first:{rotate:0, },
                    second:{rotate:359, }
                }} 
                whileHover={{rotate:310, opacity:1}}
                animate={"second"}
                transition={{duration:2}}
                src={Logo} alt="" className='w-[56px]' /></a>
            </header>
            <section className='flex flex-col [&>button>span]:text-right sm:flex-row sm:gap-[24px] font-["Outfit"] 2xl:text-[24px] [&>button>span]:2xl:leading-[38px]'>

                {
                    sectionIds.map((sectionId, i)=>{
                        return(
                        <li key={i} onClick={()=> scrollToSection(sectionId)}  offset={50} duration={500} className='group w-[75px] [&>span]:cursor-pointer sm:w-auto h-[30px] flex flex-col overflow-hidden translate-x-0 items-end sm:items-start'>
                            <Link to="/" className='z-50 duration-300 md:group-hover:-translate-y-[30px] md:group-hover:duration-300 2xl:group-hover:-translate-y-[40px]'
                                >{sectionId}</Link>
                            <Link to="/" className='translate-y-0 text-slate-600 duration-300 md:group-hover:-translate-y-[30px] 2xl:group-hover:-translate-y-[40px]   
                                group-hover:duration-300'>{sectionId}</Link>
                        </li>
                        )
                    })
                }

                {/* <button onClick={()=>{}}  offset={50} duration={500} className='group w-[75px] [&>span]:cursor-pointer sm:w-auto h-[30px] flex flex-col overflow-hidden translate-x-0 items-end sm:items-start'>
                    <Link to="/" className='duration-300 md:group-hover:-translate-y-[30px] md:group-hover:duration-300 2xl:group-hover:-translate-y-[40px]'
                        >ABOUT</Link>
                    <Link to="/" className='translate-y-0 text-slate-600 duration-300 md:group-hover:-translate-y-[30px] 2xl:group-hover:-translate-y-[40px]   
                        group-hover:duration-300'>ABOUT</Link>
                </button>
                <button onClick={props.click} to="/projects" offset={50} duration={500} className='group w-[75px] [&>span]:cursor-pointer sm:w-auto h-[30px] flex flex-col overflow-hidden translate-x-0 items-end sm:items-start'>
                    <Link to="/" className='duration-300 md:group-hover:-translate-y-[30px] md:group-hover:duration-300 2xl:group-hover:-translate-y-[40px]'
                        >WORK</Link>
                    <Link to="/" className='translate-y-0 text-slate-600 duration-300 md:group-hover:-translate-y-[30px] 2xl:group-hover:-translate-y-[40px]   
                        group-hover:duration-300'>WORK</Link>
                </button>
                <button to="/motto" offset={50} duration={500} className='group w-[75px] [&>span]:cursor-pointer  sm:w-auto h-[30px] flex flex-col overflow-hidden translate-x-0 items-end sm:items-start'>
                    <Link to="/" className='duration-300 md:group-hover:-translate-y-[30px] md:group-hover:duration-300 2xl:group-hover:-translate-y-[40px]'
                        >CONTACT</Link>
                    <Link to="/" className='translate-y-0 text-slate-600 duration-300 md:group-hover:-translate-y-[30px] 2xl:group-hover:-translate-y-[40px]   
                        group-hover:duration-300'>CONTACT</Link>
                </button> */}
            </section>
        </motion.nav>
    )
} 