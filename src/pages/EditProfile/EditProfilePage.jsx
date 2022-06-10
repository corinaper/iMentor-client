import { useContext } from "react"
import { useEffect } from "react"
import { useState} from "react"
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from 'react-router-dom'
import Profile from "../../services/profile.service"
import Skills from "../../components/Skills/skills"
import uploadService from "../../services/upload.service"
import './EditProfilePage.css'

const EditProfilePage = () => {
const { user } = useContext(AuthContext)
console.log(user)
const [formState, setFormState] = useState()
const [userType, setUserType] = useState()
const [error, setError] = useState(null)
const navigate = useNavigate()
useEffect(()=>{
    Profile.getOneUser(user._id)
    .then((user)=>{
        console.log("user",user.data)
        setFormState(user.data)
        setUserType(user.data.userType)})
    .catch((err)=>console.log(err))
},[user])
const [image, setImage] = useState(false)
const handleSubmit = (event)=>{
      event.preventDefault()
      if(formState.username && formState.course)
       {Profile.editUser(user._id, formState)
        navigate(`/profile/${user._id}`)}
        else{
            setError("Please fill out the empty fields")
        }
    }
const handleInputChange = (event)=>{
      const {name, value } = event.currentTarget
      const newFormState = {...formState, [name]: value}
      setFormState(newFormState)
    }
function handleFileUpload(event) {
      setImage(true)
        const uploadData = new FormData();
        uploadData.append("imageData", event.target.files[0])
        uploadService
        .uploadImage(uploadData)
        .then(({data}) => {
          setImage(false)
          setFormState({ ...formState,  profileImg: data.cloudinary_url })
        })
        .catch((err) => console.log(err))
    }
function handleType(){
    if(userType==="mentor")
    {setUserType("mentee")
    setFormState({ ...formState, userType: "mentee" })
console.log(formState)}
    else
    {setUserType("mentor")
    setFormState({ ...formState, userType: "mentor" })
    console.log(formState)}
}
function skillChange(e){
    const skillId = e.target.id
    const newForm = {...formState}
    if(!newForm.skills.includes(skillId))
    newForm.skills.push(skillId)
    else newForm.skills.splice(newForm.skills.indexOf(skillId),1)
    setFormState(newForm)
}
    return (
        
        <div className="edContainer">
                
        <form className="fomid" onSubmit={handleSubmit}>
            <div className="formidinside" >
            
            <img className="userImage" src={formState?.profileImg} alt={formState?.username}></img>


            <select id="course" name="course" onChange={handleInputChange}>
               
                {!formState?.course &&
                
                <option value="" selected>Select a course</option>}
                {formState?.course === "Web Development" ?
                
                <option value="Web Development" selected>Web Development</option>
                :
                
                <option value="Web Development">Web Development</option>}
                {formState?.course === "UX/UI" ?
                
                <option value="UX/UI" selected>UX/UI</option>
                :
                
                <option value="UX/UI">UX/UI</option>}
                {formState?.course === "Data Analytics" ?
                
                <option value="Data Analytics" selected>Data Analytics</option>
                :
                
                <option value="Data Analytics">Data Analytics</option>}
            
            </select>
            


        <label className="switch">
        
        {userType === "mentor" ?  <input type="checkbox" checked onClick={handleType}/>
        : <input type="checkbox" onClick={handleType}/>}
            <span className="slider round"></span>
        
        
        </label>
            
            
            
            <input type="text" id="name" name="username" placeholder="Name" className="imputs" value={formState?.username} onChange={handleInputChange} />
            <p className="par" >{formState?.email}</p>
            {userType === "mentor" &&
           
            <>

            
            <input placeholder="Current position" className="imputs" type="text" id="name" name="ocuppation" value={formState?.ocuppation} onChange={handleInputChange} />
            
            <input placeholder="Company name" className="imputs" type="text" id="name" name="company" value={formState?.company} onChange={handleInputChange} />
            <Skills function={skillChange}></Skills>
            </>}

            <textarea placeholder="About Me" className="about" type="text" id="name" name="aboutMe" value={formState?.aboutMe} onChange={handleInputChange} />
            
            <input type="file" className="file" placeholder="Upload Image" name='profileImg' onChange={handleFileUpload} /> 

            <button  className="uploadbtn" type="submit" value="Post">Save Changes</button>
          
            </div>
          </form>
          
          {error && <p>{error}</p>  }

          
          
          </div>
    )
        
}
export default EditProfilePage