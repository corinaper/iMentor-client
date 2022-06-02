import { useContext } from "react"

import Footer from "../../components/Footer/Footer"
import Mentors from "../../components/MentorCard/mentor"
import Navigation from "../../components/Navigation/Navigation"
import Skills from "../../components/Skills/chips/skills"
import { MentorContext } from "../../context/mentor.context" //to be created
import {SkillContext } from "../../context/skill.context" //to be created

const MentorPage = () => {

    const { mentors } = useContext(MentorContext)
    const { skills } = useContext(SkillContext)

    return (
        <>
        <Navigation></Navigation>
        <Skills skillList={skills}></Skills>
       <Mentors mentors={mentors}></Mentors>
       <Footer></Footer>
       </>
    )
}

export default MentorPage