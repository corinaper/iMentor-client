import skills from "../../services/skills.service" 
import './Skills.css'
import { useState, useEffect } from "react"

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
                setSkillsList (skills.data)})
            .catch((err)=>console.log(err))   
    }

    function showLess(){ 
        skills.get5Skills()
        .then((skills)=>{
            setSkillsList (skills.data)})
        .catch((err)=>console.log(err))  
    }

    return (
    <div className="chipsContainer">
        <div className="divChips">
            {skillsList.map((skill)=>{
                return(
                    props.filtering?.includes(skill._id) ?
                    <span className="chips-selected" key={skill._id} id={skill._id} onClick={(e)=>props.function(e)}>{skill.name}</span> :
                    <span className="chips" key={skill._id} id={skill._id} onClick={(e)=>props.function(e)}>{skill.name}</span>
                    )
            })}
        </div>
            {skillsList.length === 5 ?
                <div onClick={showAll} className="showSkills">+</div>
                :
                <div onClick={showLess} className="showSkills">-</div>
            }
    
    </div>)
    
}

export default Skills