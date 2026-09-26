import React from 'react'
import SkillItem from '../components/skill'
import SectionHeader from '../components/SectionHeader.jsx'

export default function Principles(){
    return(
        <article className='w-full h-screen flex flex-col justify-center items-center overflow-hidden'>
            <SectionHeader className='w-full pl-10 sm:w-[65%] sm:pl-0 mb-4'>principles</SectionHeader>
            <div className='w-full flex flex-col gap-0 justify-start items-center'>
                <SkillItem index={"01"} skillName={"Human first"} skillDescription={"If you have to think about how to use it, I haven’t finished building it."}/>
                <SkillItem index={"02"} skillName={"Structure"} skillDescription={"AI made code cheap. I spend my effort on the architecture, so the software still works a year from now."}/>
                <SkillItem index={"03"} skillName={"Like water"} skillDescription={"Water takes the shape of its container. I build around how you already work, not the other way around."} />
                <div className="w-full border-t-[0.75px] border-[#19181633]" />
            </div>
        </article>
    )
}
