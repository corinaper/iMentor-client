import { useContext } from "react"

import Footer from "../../components/Footer/Footer"
import Mentors from "../../components/MentorCard/mentor"
import Navigation from "../../components/Navigation/Navigation"
import Skills from "../../components/Skills/chips/skills"
// import { MentorContext } from "../../context/mentor.context" //to be created
// import { SkillContext } from "../../context/skill.context" //to be created

const MentorPage = () => {


    return (
        <>
        
        {/* <Skills skillList={skills}></Skills> */}
       <Mentors></Mentors>
       
       </>
    )
}

export default MentorPage