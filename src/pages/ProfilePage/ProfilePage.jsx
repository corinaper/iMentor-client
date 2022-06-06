import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"

import { AuthContext } from "../../context/auth.context"
import { useParams } from "react-router-dom"
import profile from "../../services/profile.service"

import Skills from "../../components/Skills/skills"
import "../../pages/ProfilePage/profilePage.css"

const ProfilePage = () => {
    const [userProfile, setuserProfile] = useState([]);
    const profileId = useParams()

    useEffect(()=>{
        profile.getOneUser(profileId.id)
        .then((user)=>{
            console.log("user from card", user)
            setuserProfile(user.data)})
        .catch((err)=>console.log(err))
        
    },[profileId.id])


    
    console.log(profileId)
    const { isLoggedIn, user, logOutUser, authenticateUser } = useContext(AuthContext)
    
 
    if(userProfile.type === "mentor")
        {return (
        <>
            <h2>{userProfile.course}</h2>
            <h2>{userProfile.type}</h2>
            <img className="userImage" src={userProfile.profileImg} alt={userProfile.username}></img>
            <h2>{userProfile.username}</h2>
            <p>{userProfile.email}</p>
            <p>{userProfile.ocuppation}</p>
            <p>{userProfile.company}</p>
            <Skills skillList={userProfile.skills}></Skills>
            <div>
                <p>{userProfile.aboutMe}</p>
            </div>
            <li>
                <button className="nav-logoutbtn" onClick={logOutUser}>
                   Logout
                </button>
            </li>
            {/* Add questions component */}
           
        </>)}
    else {return( 
        <>
            
            <h2>{userProfile.type}</h2>
            <img className="userImage" src={userProfile.profileImg} alt={userProfile.username}></img>
            <h2>{userProfile.username}</h2>
            <p>{userProfile.email}</p>
            <div>
                <p>{userProfile.aboutMe}</p>
            </div>
            <li>
                <button className="nav-logoutbtn" onClick={logOutUser}>
                   Logout
                </button>
            </li>
             {/* Add questions component */}
           
        </>)}
    
}

export default ProfilePage