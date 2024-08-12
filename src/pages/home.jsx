import React from "react";

import Hero from './hero';
import SocialIcons from '../components/socialIcons.jsx';
import Para from "./Para.jsx"
import Skill from './what-I-do.jsx';
import Projects from "./projects.jsx"
import Finish from './finishing.jsx';
import Footer from './footer.jsx';

function Home(){
    return(
        <main className='w-full h-auto sm:min-h-screen  sm:overflow-scroll flex flex-col items-center bg-[#f0f8ff] text-[#101720] ' style={{fontFamily:'sora'}}>

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
            id={"exp"}
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
export default Home