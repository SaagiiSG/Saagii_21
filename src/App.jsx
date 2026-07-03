import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from 'framer-motion';
import Nav from './components/navBar';
import Home from './pages/home.jsx';
import "./style.css";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='*' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
