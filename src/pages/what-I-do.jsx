import React, { forwardRef } from 'react'
import SkillItem from '../components/skill'
function Skill(props, ref){


    return(
        <article ref={ref} className='w-full h-screen flex flex-col justify-center items-center overflow-hidden '>
            <header className='w-full pl-10 sm:w-[65%] header sm:pl-0 '>skills I posses</header>
            <div className='w-full flex flex-col gap-0 justify-start items-center'>
                <SkillItem skillName={"UI/UX designs"} skillDescription={"In other words I can make design that easy to understand and navigate through"}/>
                <SkillItem skillName={"TAILWIND CSS"} skillDescription={"Which means that I can make cool micro animation like in this website effortlessly"}/>
                <SkillItem skillName={"REACTJS"} skillDescription={"By using REACTJS the performance of the website improves drastically"} />
                <SkillItem skillName={""} />
            </div>
        </article>
    )
} 
export default forwardRef(Skill)