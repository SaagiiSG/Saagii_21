import React from "react";
import { useEffect , useRef} from "react";
import "../style.css"
import {motion, useInView, useAnimation} from 'framer-motion'



export default function Para(props){

    const ref = useRef(null)
    const isInView = useInView(ref)

    const mainControls = useAnimation()
    useEffect(()=>{
        if(isInView){
            mainControls.start("visible")
        }
    },[isInView])
    let boxVariants = {};
    const isMobile = window.innerWidth < 768; 
    if (!isMobile) {
      boxVariants = {
        hidden:{opacity:0, x:-100},
            visible:{opacity:1, x:0}
      };
    }
    return(
        <motion.article 
           id={props.id}
            variants={boxVariants}
        initial={"hidden"}
        animate={mainControls}
        transition={{duration:1.3, delay:.4}} className="flex flex-col items-start sm:items-center justify-center w-full sm:h-screen h-[70vh] pl-8">
            <header className="w-full pl-2 sm:w-[65%] md:text-[20px] header">{props.header}</header>

            <div  ref={ref}   className="hidden sm:flex flex-col justify-center items-start md:w-[65%] sm:items-center w-auto text-left md:text-[64px] md:leading-[65px] sm:[&>p]:w-full [&>p]:w-auto text-[36px] ">
                <p>{props.lineOne}<span>{props.insideSpan}</span>{props.lineOneC}</p>
                <p>{props.lineTwo}</p>
                <p>{props.lineThree}</p>
                <p>{props.lineFour}</p>
            </div>
            <motion.div variants={{
                first:{opacity:1}
            }} className="block sm:hidden text-[40px] w-[95%] leading-[42px]">
                <p>{props.wholeText}</p>
            </motion.div>
        </motion.article>
    )
}