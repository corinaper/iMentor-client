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
import "../../components/QuestionCard/QuestionCard.css"


const ProfilePage = () => {
    const { user, logOutUser } = useContext(AuthContext)
    const [userProfile, setuserProfile] = useState([]);
    const [skillList, setSkillList] = useState([]);
    const profileId = useParams()

    useEffect(()=>{
        profile.getOneUser(profileId.id)
        .then((user)=>{
            setuserProfile(user.data)
            skills.getAllSkills()
                    .then((skillData)=>
                        {
                        const userSkills = skillData.data.filter((skill)=>user.data.skills.includes(skill._id))
                        setSkillList(userSkills)
                        }
            )})
        .catch((err)=>console.log(err))
        
    },[profileId])

    function settingToggle(){
        const menu = document.querySelector(".popupSetting")
        
        if(!menu.classList.contains("hide") && !menu.classList.contains("show"))
            {
                menu.classList.add("show")}
        else{
                menu.classList.toggle("show")
                menu.classList.toggle("hide")}
    }


    const {course, _id, userType, profileImg, username, email, ocuppation, company, aboutMe, questions } = userProfile
    return (
        <div className="mentorProfileContainer width">
            <div className="flex">
                {user._id===_id && 
                <img onClick={settingToggle} className="imgSizeS" src='https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655850057/iMentor/setting_drggve.png' alt='setting'></img>}
                <h2>{username}</h2>
           </div>
            
            <img className="userPhoto" src={profileImg} alt={username}></img>
            <div className="flex">
                {userType === "mentor" ?
                <img src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655746267/iMentor/watering-can_1_vxnhcs.png" alt=""></img> :
                <img src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655745497/iMentor/plant_tvkaul.png" alt=""></img>}
                <p>{userType}</p>
            </div>
            
            <h3>{course}</h3>
            <p className="emailProfile">{email}</p>

            {userType === "mentor" && 
            
            <>
                <p>{ocuppation}</p>
                <p>{company}</p>
                <div className="aboutMe">
                    {aboutMe ?
                    <p>{aboutMe}</p> :
                    <p className="placeholderAbout">{username} is a {userType} for {course} course</p>}
                </div>
                <div className="skillList">
                    {skillList?.map((skill)=>(
                    <span className="chips-selected" key={skill._id} id={skill._id}>{skill.name}</span>))}
                </div>
            </>
            }

            <h3 className="toLeft">Posts ({ questions?.length })</h3>
            <div className="line"></div>

            {questions?.map(({_id, owner, title, description, comments})=>{
                const shortDescription = description.slice(0, 100)+'...'
                return(
                    <div key={_id} className="questionCard ">
                        <div className="flex">
                            <Link to={`/profile/${owner._id}`} className="nomargin">
                                <img className="profileImg" src={owner.profileImg} alt=""></img>
                            </Link>
                            <h3 className="nomargin">{owner.username}</h3>
                        </div>
                        <div className="linkToQuestionDetails">
                            <p>{title}</p>
                            <p>{shortDescription}</p>
                        </div>
                        <div className="flex space-between">
                            <div className="flex comments">
                                <img src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655752346/iMentor/comment_1_wafgsd.png" alt=""></img>
                                <div>{comments.length}</div>
                            </div>
                            <Link to={`/questions/${_id}`} className="whiteButton buttonSizeS">Read more</Link>
                        </div>  
                    </div>
                    )
            })}
    </div>)   
}

export default ProfilePage
