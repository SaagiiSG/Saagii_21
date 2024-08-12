import React, { lazy, useEffect } from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/navBar';
import {motion, useInView, useAnimation} from 'framer-motion'
import Logo from "./assets/website logo.svg"

import Hero from './pages/hero';
import SocialIcons from './components/socialIcons';
import Para from "./pages/Para.jsx"
import Skill from './pages/what-I-do.jsx';
import Projects from "./pages/projects.jsx"
import Finish from './pages/finishing.jsx';
import Footer from './pages/footer.jsx';
import "./style.css"
import { useRef } from 'react';
function App() {
  
const ref = useRef(null)

const ScrollTo = ()=>{
  ref.current?.scrollIntoView({behavior:'smooth'})
  console.log('clicked');
  
}
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
  return (
   
    <main className='w-full h-auto sm:min-h-screen  sm:overflow-scroll flex flex-col items-center bg-[#f0f8ff] text-[#101720]'>
     <Nav/>

          <Hero/>
          <Para  
            id={"about_me"}
            header={"about me"}
            lineOne={"I’m a "}
            insideSpan={"selectively skilled"}
            lineTwo={"developer with strong desire"}
            lineThree={"to produce high quality"}
            lineFour={"web-apps"}
            wholeText={"I’m a selectively skilled developer with strong desire to produce high quality web-apps"}
          />
          <Skill/>
          <Para 
            header={"Experience"}
            lineOne={"After"}
            insideSpan={" hundreds of "}
            lineOneC={"course,"}
            lineTwo={"tutorial, one portfolio"}
            lineThree={"website and multiple on"}
            lineFour={"going projects later here I am "}
            wholeText={"After hundreds of course tutorial, one portfolio website and multiple on going projects later here I am"}
          />
          
          <Projects/>
          <Finish/>
          <Footer/>

     <SocialIcons/>
     
    </main>
   
  )
}

export default App
