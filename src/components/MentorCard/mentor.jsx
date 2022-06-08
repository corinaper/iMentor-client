import { useEffect } from "react"
import { Link } from "react-router-dom"
import mentors from "../../services/mentor.service" 
import { useState } from "react"
import "../../pages/MentorPage/mentor.css"
import Skills from "../../components/Skills/skills"
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

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
        <>
        <Skills function={filterMentors}></Skills>
        {filteredList.map((mentor)=>{
        return(
            <div key={mentor._id} className="mentorCard">
                <img className="mentorImage" src={mentor.profileImg} alt={mentor.username}></img>
                <h2>{mentor.username}</h2>
                <p>{mentor.aboutMe}</p>
                <Link to={`/profile/${mentor._id}`}>
                    <button>Profile</button>
                </Link>
                <Link to={`/chats/${user._id}/${mentor._id}`}>
                <button>Contact</button>
                </Link>
            </div>
        )
    }) }
    </>)
    
}

export default Mentors