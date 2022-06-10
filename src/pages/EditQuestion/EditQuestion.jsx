import { useContext } from "react"
import { useEffect } from "react"
import { useState} from "react"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../../context/auth.context"
import questions from "../../services/question.services"
import Skills from "../../components/Skills/skills"
import "../../pages/ProfilePage/profilePage.css"
import uploadService from "../../services/upload.service"
import '../EditQuestion/EditQuestion.css'

const EditQuestionPage = () => {
const {id} = useParams()
const { user } = useContext(AuthContext)
console.log(user)
const [formState, setFormState] = useState()
const [imageUrl, setImageUrl] = useState(false)
const [error, setError] = useState()
const navigate = useNavigate()
useEffect(()=>{
    questions.getOneQuestion(id)
    .then((question)=>{
        console.log("question",question.data)
        setFormState(question.data)})
    .catch((err)=>console.log(err))
},[id])
const handleSubmit = (event)=>{
      event.preventDefault()
      if(formState.title && formState.description){
        questions.editQuestion(formState, id)
            navigate(`/questions/${id}`)}
      else{setError("Please fill out the empty fields")}
    }
const handleInputChange = (event)=>{
      const {name, value } = event.currentTarget
      const newFormState = {...formState, [name]: value}
      setFormState(newFormState)
    }
function handleFileUpload(event) {
      setImageUrl(true)
        const uploadData = new FormData();
        uploadData.append("imageData", event.target.files[0])
        uploadService
        .uploadImage(uploadData)
        .then(({data}) => {
          setImageUrl(false)
          setFormState({ ...formState,  imageUrl: data.cloudinary_url })
        })
        .catch((err) => console.log(err))
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
    <div>
      <h1 className='ask'>Ask Questions</h1>
      <br /><br />
      <form onSubmit={handleSubmit}>
          <label htmlFor="name">Title:</label> <br />
          <input className='titleRectangle' type="text" id="name" name="title" value={formState?.title} onChange={handleInputChange} /> <br /><br />
          <label htmlFor="text"></label> <br /> <br />
          <input  className='codeRectangle' placeholder="Post your Code Here" type="text" id="text" name="description" value={formState?.description} onChange={handleInputChange} /> <br /><br />
          <input type="file" className='upload' name='imageUrl' onChange={(e) => handleFileUpload(e, setImageUrl)} multiple/>
          { formState?.imageUrl && (
            <>
          <img src={formState?.imageUrl} alt="profile" style={{'maxWidth': '40vw'}}/>
            </> )} <br /><br />
          <Skills function={skillChange} filtering={formState?.skills}></Skills>
          {/* <input type="file" className='upload' name='imageUrl' onChange={handleFileUpload} /> <br /><br /> */}
          {/*<Link to={"/question"}><button className="questionButton" onClick={handleSubmit} value="Post">Post Topic</button></Link>*/}
          <button className='questionButton' type="submit" value="Post" >Save</button>
      </form>
      {error && <p>{error}</p>}
      </div>
  )
}
export default EditQuestionPage