import React, { forwardRef } from 'react'
import SkillItem from '../components/skill'
import SectionHeader from '../components/SectionHeader.jsx'

function Skill(props, ref){
    return(
        <article ref={ref} className='w-full h-screen flex flex-col justify-center items-center overflow-hidden'>
            <SectionHeader className='w-full pl-10 sm:w-[65%] sm:pl-0 mb-4'>skills I possess</SectionHeader>
            <div className='w-full flex flex-col gap-0 justify-start items-center'>
                <SkillItem index={"01"} skillName={"Human first"} skillDescription={"Focused on design that is frictionless for the user — easy to understand, easy to use"}/>
                <SkillItem index={"02"} skillName={"Structure"} skillDescription={"As vibe coded apps become more and more widespread I focus on the architecture and structure of the software I build"}/>
                <SkillItem index={"03"} skillName={"Water like"} skillDescription={"As water takes the form of its container I focus on the things you do and how you operate"} />
                <div className="w-full border-t-[0.75px] border-[#19181633]" />
            </div>
        </article>
    )
}
export default forwardRef(Skill)
