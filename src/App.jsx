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
import Home from './pages/home.jsx'
function App() {
  

      
  return (
   
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
