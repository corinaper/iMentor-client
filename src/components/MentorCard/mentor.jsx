import { useEffect } from "react"
import { Link } from "react-router-dom"
import mentors from "../../services/mentor.service" 
import { useState } from "react"



const Mentors = () => {
    const [mentorsList, setMentorsList] = useState([]);
 
    useEffect(()=>{
        mentors.getAllMentors()
        .then((mentors)=>{
            console.log("mentors from card", mentors)
            setMentorsList(mentors.data)})
        .catch((err)=>console.log(err))
        
    },[])

    return (
        <>
        {mentorsList.map((mentor)=>{
        return(
            <div key={mentor._id} className="mentorCard">
                <img src={mentor.profileImg} alt={mentor.username}></img>
                <h2>{mentor.username}</h2>
                <p>{mentor.aboutMe}</p>
                {/* <Link to={`/profile/${mentor._id}`}>
                    <button>Profile</button>
                </Link>
                <Link>
                <button>Contact</button>
                </Link> */}
            </div>
        )
    }) }
    </>)
    
}

export default Mentors