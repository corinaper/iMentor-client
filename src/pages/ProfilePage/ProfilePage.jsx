import { useContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import { useParams } from "react-router-dom"
import profile from "../../services/profile.service"
import skills from "../../services/skills.service"
import "../../pages/ProfilePage/ProfilePage.css"
import "../../components/Skills/Skills.css"


const ProfilePage = () => {
    const { user, logOutUser } = useContext(AuthContext)
    const [userProfile, setuserProfile] = useState([]);
    const [skillList, setSkillList] = useState([]);
    const profileId = useParams()

    useEffect(()=>{
        
        profile.getOneUser(profileId.id)
        .then((user)=>{
            setuserProfile(user.data)
            console.log("user from card", userProfile)
            skills.getAllSkills()
                    .then((skillData)=>
                        {
                        const userSkills = skillData.data.filter((skill)=>user.data.skills.includes(skill._id))
                        setSkillList(userSkills)
                        }
            )})
        .catch((err)=>console.log(err))
        
    },[user])


 
    return (
        <div className="mentorProfileContainer">
            <div className="editBox">
                <h2>{userProfile.course}</h2>
                {user._id===userProfile._id && <Link to={"/profile/edit"}><button>Edit</button></Link>}
            </div>
            
            <h2>{userProfile.type}</h2>
            <img className="userImage" src={userProfile.profileImg} alt={userProfile.username}></img>
            <h2>{userProfile.username}</h2>
            <p>{userProfile.email}</p>

            {userProfile.userType === "mentor" && 
            
            <>
                <p>{userProfile.ocuppation}</p>
                <p>{userProfile.company}</p>
                    
                {skillList?.map((skill)=>(
                    <span className="chips-selected" key={skill._id} id={skill._id}>{skill.name}</span>))}
            </>
            }

            <div>
                <p>{userProfile.aboutMe}</p>
                {user._id===userProfile._id && 
                    <Link to={"/"}>
                        <button className="nav-logoutbtn" onClick={logOutUser}>Log out</button>
                    </Link>}
            </div>

            {userProfile.questions?.map((question)=>{
                return(
                    <Link to={`/questions/${question._id}`} className="linkToQuestionDetails">
                    <div key={question._id} className="questionCard">
                        <img className="profileImg" src={question.owner.profileImg} alt=""></img>
                        <h2>{question.title}</h2>
                        <p>{question.description}</p>
                        <img
                        width="150"
                        height="150"
                        src={question.imageUrl}
                        alt="questionsImage"
                        />
                        ;
                    </div>
                    </Link>
                    )
            })}
    
    </div>)
    
    
}

export default ProfilePage
