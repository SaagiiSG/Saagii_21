import React, { forwardRef } from 'react'
import SkillItem from '../components/skill'
import SectionHeader from '../components/SectionHeader.jsx'

function Skill(props, ref){
    return(
        <article ref={ref} className='w-full h-screen flex flex-col justify-center items-center overflow-hidden'>
            <SectionHeader className='w-full pl-10 sm:w-[65%] sm:pl-0 mb-4'>skills I possess</SectionHeader>
            <div className='w-full flex flex-col gap-0 justify-start items-center'>
                <SkillItem index={"01"} skillName={"Visuals"} skillDescription={"In other words I can make design that easy to understand and navigate through"}/>
                <SkillItem index={"02"} skillName={"Interactions"} skillDescription={"Which means that I can make cool micro animation like in this website effortlessly"}/>
                <SkillItem index={"03"} skillName={"Compatible"} skillDescription={"By using REACTJS the performance of the website improves drastically"} />
                <div className="w-full border-t-[0.75px] border-[#19181633]" />
            </div>
        </article>
    )
}
export default forwardRef(Skill)
