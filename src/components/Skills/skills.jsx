import skills from "../../services/skills.service" 
import { useState } from "react"
import { useEffect } from "react"

const Skills = (props) => {
    const [skillsList, setSkillsList] = useState([]);

    useEffect(()=>{
        skills.get5Skills()
        .then((skills)=>{
            setSkillsList (skills.data)})
        .catch((err)=>console.log(err))
        
    },[])

    function showAll(){
        
            skills.getAllSkills()
            .then((skills)=>{
                // console.log("skills from card", skills)
                setSkillsList (skills.data)})
            .catch((err)=>console.log(err))
            
        
    }

    function showLess(){
        
        skills.get5Skills()
        .then((skills)=>{
            // console.log("skills from card", skills)
            setSkillsList (skills.data)})
        .catch((err)=>console.log(err))
        
    
}
 
    return (
        <>
    {skillsList.map((skill)=>{
        return(
            <span key={skill._id} id={skill._id} onClick={(e)=>props.function(e)}>{skill.name}</span>)
            
    }) }
        {skillsList.length === 5 ?
            <div onClick={showAll} className="showMore">+</div>
            :
            <div onClick={showLess} className="showLess">-</div>}
    
    </>)
    
}

export default Skills