import skills from "../../services/skills.service" 
import './skills.css'
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
        <div className="chipsContainer">
            <div className="divChips">
    {skillsList.map((skill)=>{
        return(
            <button className="chips">
                <span key={skill._id} id={skill._id} onClick={(e)=>props.function(e)}>{skill.name}</span>
            </button>
    )})}
        </div>
        <div className="plusMinus">
    {skillsList.length === 5 ?
            <div onClick={showAll} className="showMore">+</div>
            :
            <div onClick={showLess} className="showLess">-</div>
    }
        </div>
    </div>)
}

export default Skills