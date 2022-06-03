import skills from "../../services/skills.service" 
import { useState } from "react"
import { useEffect } from "react"

const Skills = () => {
    const [skillsList, setSkillsList] = useState([]);

    useEffect(()=>{
        skills.get5Skills()
        .then((skills)=>{
            console.log("skills from card", skills)
            setSkillsList (skills.data)})
        .catch((err)=>console.log(err))
        
    },[])

    function showAll(){
        
            skills.getAllSkills()
            .then((skills)=>{
                console.log("skills from card", skills)
                setSkillsList (skills.data)})
            .catch((err)=>console.log(err))
            
        
    }

    function showLess(){
        
        skills.get5Skills()
        .then((skills)=>{
            console.log("skills from card", skills)
            setSkillsList (skills.data)})
        .catch((err)=>console.log(err))
        
    
}
 
    return (
        <>
    {skillsList.map((skill)=>{
        return(
            <span key={skill._id}>{skill.name}</span>)
            
    }) }
        {skillsList.length === 5 ?
            <button onClick={showAll} className="showMore">+</button>
            :
            <button onClick={showLess} className="showLess">-</button>}
    
    </>)
    
}

export default Skills