import { useEffect } from "react"
import { Link } from "react-router-dom"
import mentors from "../../services/mentor.service" 
import { useState } from "react"
import "./mentorCard.css"
import "../../pages/MentorPage/mentor.css"
import Skills from "../Skills/skills"

const skillList = []

const Mentors = () => {
    const [mentorsList, setMentorsList] = useState([]);
    const [filteredList, setfilteredList] = useState([]);

    useEffect(()=>{
        mentors.getAllMentors()
        .then((mentors)=>{
            console.log("mentors from card", mentors)
            setMentorsList(mentors.data)
            setfilteredList(mentors.data)})
        .catch((err)=>console.log(err))
        
    },[])
    

    function filterMentors(e){
        if(!skillList.includes(e.target.id))
        skillList.push(e.target.id)
        else{skillList.splice(skillList.indexOf(e.target.id),1)}

        const newList = mentorsList.filter((mentor)=>skillList.some(skill=>mentor.skills.includes(skill)))
        if (newList.length>0)
        setfilteredList(newList)
        else setfilteredList(mentorsList)

        console.log(newList)

    }

    return (
        <div className="mentorCardContainer">
            <Skills function={filterMentors}></Skills>

        {filteredList.map((mentor)=>{
        return(
            <div key={mentor._id} className="mentorCard">
    
                    <img className="mentorImage" src={mentor.profileImg} alt={mentor.username}></img>
                

                <div className="profile-main">
                    <h2 className="mentor-name">{mentor.username}</h2>
                    <p className="mentor-body">{mentor.aboutMe}</p>
                </div>
                
                <div className="mentorBtns">
                    <div className="mentorProfileBtn">
                        <Link to={`/profile/${mentor._id}`}>
                            <button>Profile</button>
                        </Link>
                    </div>
                    
                    <div className="mentorContactBtn">
                        <Link to={"/"}>
                            <button>Contact</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }) }
    </div>)
    
}

export default Mentors