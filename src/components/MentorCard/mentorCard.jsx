import { useEffect } from "react"
import { Link } from "react-router-dom"
import mentors from "../../services/mentor.service" 
import { useState } from "react"
import "./mentorCard.css"
import "../../pages/MentorPage/mentor.css"
import Skills from "../../components/Skills/skills"
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import '../MentorCard/mentor.css'

const skillList = []

const Mentors = () => {
    const [mentorsList, setMentorsList] = useState([]);
    const [filteredList, setfilteredList] = useState([]);

    const { user } = useContext(AuthContext)
    
 
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
        <div className="padding-bottom">
            <div className='mentorCardContainer'>
        <Skills function={filterMentors} filtering={skillList}></Skills> 
        {filteredList.map(({_id, profileImg, username, aboutMe})=>{
            const shortAboutMe = aboutMe.slice(0, 100)+'...'
        return(
            <div key={_id} className="mentorCard">
                <img className="mentorImage" src={profileImg} alt={username}></img>

            <div className="profile-main">
                <h2 className="mentor-name">{username}</h2>
                <p className="mentor-body">{shortAboutMe}</p>
            </div>
                
            <div className="mentorBtns">
                <div className="mentorProfileBtn">
                    <Link to={`/profile/${_id}`}>
                        <button>Profile</button>
                    </Link>
                </div>
            </div>

            <div className="mentorContactBtn">
                <Link to={`/chats/${user._id}/${_id}`}>
                    <button>Contact</button>
                </Link>
            </div>
            </div>
        )
    }) }
    </div>
    </div>
    )
    
}

export default Mentors