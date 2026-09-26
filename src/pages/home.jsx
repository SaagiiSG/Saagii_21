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

// Subtle washi-paper grain laid over everything.
const GRAIN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

function Home(){
    return(
        <main className='w-full h-auto sm:min-h-screen flex flex-col items-center bg-[var(--paper)] text-[var(--ink)]' style={{fontFamily:'sora'}}>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-multiply"
            style={{ backgroundImage: `url("${GRAIN}")` }}
          />
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
