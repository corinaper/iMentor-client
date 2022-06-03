import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"

import { AuthContext } from "../../context/auth.context"
import { useParams } from "react-router-dom"
import profile from "../../services/profile.service"

import Skills from "../../components/Skills/skills"


const ProfilePage = () => {
    const [userProfile, setuserProfile] = useState([]);
 
    useEffect(()=>{
        profile.getOneUser(profileId.id)
        .then((user)=>{
            console.log("user from card", user)
            setuserProfile(user.data)})
        .catch((err)=>console.log(err))
        
    },[profileId.id])


    const profileId = useParams()
    console.log(profileId)
    const { user } = useContext(AuthContext)
    
    userProfile.getOneUser(profileId.id)
    .then((user)=>
    {if(user.type === "mentor")
        {return (
        <>
            
            <h2>{user.type}</h2>
            <img src={user.profileImg} alt={user.username}></img>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p>{user.ocuppation}</p>
            <p>{user.company}</p>
            <Skills skillList={user.skills}></Skills>
            <container>
                <p>{user.aboutMe}</p>
            </container>
            {/* Add questions component */}
           
        </>)}
        else {return( 
        <>
            
            <h2>{user.type}</h2>
            <img src={user.profileImg} alt={user.username}></img>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <container>
                <p>{user.aboutMe}</p>
            </container>
             {/* Add questions component */}
           
        </>)}
    
    } 
        
        )
    
}

export default ProfilePage