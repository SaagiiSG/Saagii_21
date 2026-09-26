import React from "react";

import Hero from './hero';
import SocialIcons from '../components/socialIcons.jsx';
import Para, { Hl } from "./Para.jsx"
import Principles from './what-I-do.jsx';
import Projects from "./projects.jsx"
import Finish from './finishing.jsx';
import Footer from './footer.jsx';
import ScrollProgress from '../components/ScrollProgress.jsx';
import BrushDivider from '../components/svg/BrushDivider.jsx';
import AsciiWave from '../components/AsciiWave.jsx';
import FollowingCranes from '../components/FollowingCranes.jsx';
import FilmGrain from '../components/FilmGrain.jsx';

function Home(){
    return(
        <main className='w-full h-auto sm:min-h-screen flex flex-col items-center bg-[var(--paper)] text-[var(--ink)]' style={{fontFamily:'sora'}}>
          <FilmGrain/>
          <ScrollProgress/>
          <FollowingCranes/>

          <Hero/>
          <BrushDivider/>
          <Para
            id={"ABOUT"}
            header={"about me"}
            lines={[
              "I design and build",
              <>software that feels <Hl>obvious</Hl></>,
              "to use and holds up",
              "under the hood",
            ]}
            wholeText={"I design and build software that feels obvious to use and holds up under the hood"}
          />
          <Principles/>
          <BrushDivider flip/>
          <Para
            id={"exp"}
            dark
            backdrop={<AsciiWave dark fullWidth/>}
            header={"Experience"}
            lines={[
              "Since 2020 I’ve built",
              "client websites, taught AI",
              "at Lambda, and shipped",
              <>FlowersOS to <Hl>700+ users</Hl></>,
            ]}
            wholeText={"Since 2020 I’ve built client websites, taught AI at Lambda, and shipped FlowersOS to 700+ users"}
          />

          <Projects/>
          <BrushDivider/>
          <Finish/>
          <Footer/>

     <SocialIcons/>

    </main>
    )
}
export default Home
