import { useContext } from "react"

import { AuthContext } from "../../context/auth.context"
import { useParams } from "react-router-dom"
import profile from "../../services/profile.service"
import Navigation from "../../components/Navigation/Navigation"
import Footer from "../../components/Footer/Footer"
import Skills from "../../components/Skills/chips/skills"


const ProfilePage = () => {
    const profileId = useParams()
    const { user } = useContext(AuthContext)
    
    profile.getOneUser(profileId)
    .then((user)=>
    {if(user.type === "mentor")
        {return (
        <>
            <Navigation></Navigation>
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
            <Footer></Footer>
        </>)}
        else {return( 
        <>
            <Navigation></Navigation>
            <h2>{user.type}</h2>
            <img src={user.profileImg} alt={user.username}></img>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <container>
                <p>{user.aboutMe}</p>
            </container>
             {/* Add questions component */}
            <Footer></Footer>
        </>)}
    
    } 
        
        )
    
}

export default ProfilePage