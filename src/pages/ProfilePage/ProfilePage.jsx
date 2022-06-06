import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "../../context/auth.context"
import { useParams } from "react-router-dom"
import profile from "../../services/profile.service"
import QuestionCard from "../../components/QuestionCard/QuestionCard"

import Skills from "../../components/Skills/skills"
import "../../pages/ProfilePage/profilePage.css"

const ProfilePage = () => {
    const { isLoggedIn, user, logOutUser, authenticateUser } = useContext(AuthContext)
    const [userProfile, setuserProfile] = useState([]);
    const profileId = useParams()

    useEffect(()=>{
        profile.getOneUser(profileId.id)
        .then((user)=>{
            // console.log("user from card", user)
            setuserProfile(user.data)})
        .catch((err)=>console.log(err))
        
    },[profileId.id])


    console.log(user._id, userProfile._id)
 
    if(userProfile.type === "mentor")
        {return (
        <>
           <div>
                <h2>{userProfile.course}</h2>
                {user._id===userProfile._id && <Link to={"/profile/edit"}><button>Edit</button></Link>}
            </div>
            
            <h2>{userProfile.type}</h2>
            <img className="userImage" src={userProfile.profileImg} alt={userProfile.username}></img>
            <h2>{userProfile.username}</h2>
            <p>{userProfile.email}</p>
            <p>{userProfile.ocuppation}</p>
            <p>{userProfile.company}</p>
            {userProfile.skills.map((skill)=>
            {return(<span key={skill._id}>{skill.name}</span>)})}
            <div>
                <p>{userProfile.aboutMe}</p>
            </div>
            <QuestionCard></QuestionCard>
            <div>
                {user._id===userProfile._id && <Link to={"/profile/edit"}><button className="nav-logoutbtn" onClick={logOutUser}>Log out</button></Link>}
            </div>
           
        </>)}
    else {return( 
        <>
            
            <div>
                <h2>{userProfile.course}</h2>
                {user._id===userProfile._id && <Link to={"/profile/edit"}><button>Edit</button></Link>}
            </div>
            <img className="userImage" src={userProfile.profileImg} alt={userProfile.username}></img>
            <h2>{userProfile.username}</h2>
            <p>{userProfile.email}</p>
            <div>
                <p>{userProfile.aboutMe}</p>
            </div>
            <QuestionCard></QuestionCard>
            <div>
                {user._id===userProfile._id && <Link to={"/profile/edit"}><button className="nav-logoutbtn" onClick={logOutUser}>Log out</button></Link>}
            </div>
           
           
        </>)}
    
}

export default ProfilePage