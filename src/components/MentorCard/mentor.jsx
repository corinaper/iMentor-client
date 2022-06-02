import { Link } from "react-router-dom"

const Mentors = (props) => {
    
 
    props.mentors.map((mentor)=>{
        return(
            <div key={mentor._id} className="mentorCard">
                <img src={mentor.profileImg} alt={mentor.username}></img>
                <h2>{mentor.username}</h2>
                <p>{mentor.aboutMe}</p>
                <Link to={`/profile/${mentor._id}`}>
                    <button>Profile</button>
                </Link>
                <Link>
                <button>Contact</button>
                </Link>
            </div>
        )
    }) 
    
}

export default Mentors