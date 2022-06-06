import { useContext } from "react"
import { useEffect } from "react"
import { useState, useNavigate } from "react"
import { AuthContext } from "../../context/auth.context"
import Profile from "../../services/profile.service"
import Skills from "../../components/Skills/skills"
import "../../pages/ProfilePage/profilePage.css"
import uploadService from "../../services/upload.service"

const EditProfilePage = () => {
const { user } = useContext(AuthContext)
console.log(user)

useEffect(()=>{
    Profile.getOneUser(user._id)
    .then((user)=>{
        
        setFormState(user.data)
        setUserType(user.data.userType)})
    .catch((err)=>console.log(err))
    
},[user])


const [formState, setFormState] = useState()
const [userType, setUserType] = useState()

const [image, setImage] = useState(false)



const handleSubmit = (event)=>{   // revisar!!     
      event.preventDefault()
        Profile.editUser(user._id, formState)
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
          setFormState({ ...formState, image: data.cloudinary_url })
        })
        .catch((err) => console.log(err))
       
    }

function handleType(){
    if(userType==="mentor")
    setUserType("mentee")
    else setUserType("mentor")
}

    
    
    return (
        <>
        <form onSubmit={handleSubmit}>

            <select id="course" name="course">
                <option value="Web Development">Web Development</option>
                <option value="UX/UI">UX/UI</option>
                <option value="Data Analytics">Data Analytics</option>
            </select>

        <label className="switch">
        {userType === "mentor" ?  <input type="checkbox" checked />
        : <input type="checkbox" onClick={handleType}/>}
            <span className="slider round"></span>
        </label>
            
            <input type="file" className='upload' name='profileImg' onChange={handleFileUpload} /> <br /><br />
            <img className="userImage" src={formState?.profileImg} alt={formState?.username}></img>
            <input type="text" id="name" name="username" value={formState?.username} onChange={handleInputChange} />
            <p>{formState?.email}</p>
            
            {userType === "mentor" &&
            <>
            <input type="text" id="name" name="ocuppation" value={formState?.ocuppation} onChange={handleInputChange} />
            <input type="text" id="name" name="company" value={formState?.company} onChange={handleInputChange} />

            <Skills></Skills>
            </>}

            <div>
                <input type="text" id="name" name="username" value={formState?.aboutMe} onChange={handleInputChange} />
            </div>
           
            <button className='questionButton' type="submit" value="Post" >Save Changes</button>
          </form>   
        </>)
}

export default EditProfilePage