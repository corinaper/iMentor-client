


const Skills = (props) => {
    
 
    props.skillList.map((skill)=>{
        return(
            <span key={skill._id}>skill.name</span>
        )
    }) 
    if(props.skillList.length === 5)
    return (<button className="showMore">+</button>)
    
    
}

export default Skills