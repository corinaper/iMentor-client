import './AddForm.css'
import { useState, useContext } from "react"
import uploadService from "../../services/upload.service"
import questionService from "../../services/question.services"
import { AuthContext } from "../../context/auth.context"
import Skills from "../../components/Skills/skills"
import { useNavigate } from 'react-router-dom'



function AddForm() {
    const [imageUrl, setImageUrl] = useState(false)
    const { user } = useContext(AuthContext)
    const startingFormState = {
        title: '',        
        description:'',        
        imageUrl:'',
        owner: {user},
        skills:[]
      }

    const [formState, setFormState] = useState(startingFormState)
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleSubmit = (event)=>{        
      event.preventDefault()      
      if(formState.title && formState.description){
      questionService.createQuestion(formState)
            .then(( data ) => {
              console.log(data.data) 
              navigate(`/questions/${data?.data._id}`)
            }) 
            
            .catch((error) => {
                console.log(error);
            })
          }
          else{setError("Please fill out the empty fields")}
            
    }
  
    const handleInputChange = (event)=>{
      const {name, value } = event.currentTarget
      const newFormState = {...formState, [name]: value}
      setFormState(newFormState)
    } 

    function handleFileUpload(event) {

        const uploadData = new FormData();
        uploadData.append("imageData", event.target.files[0])

        uploadService
        .uploadImage(uploadData)
        .then(({data}) => {
          setImageUrl(data.cloudinary_url)
          setFormState({ ...formState, imageUrl: data.cloudinary_url })
        })
        .catch((err) => console.log(err))
        /*
        uploadData.append("upload_preset","fzk9q9ld")
        uploadService.uploadImage(uploadData)
        .then(fileUrl => setImage(fileUrl))*/

    }

    function skillChange(e){
      const skillId = e.target.id
      const newForm = {...formState}
     
      if(!newForm.skills.includes(skillId))
      newForm.skills.push(skillId)
      else newForm.skills.splice(newForm.skills.indexOf(skillId),1)
      setFormState(newForm)
      console.log(newForm.skills)
  }



    return (

      <div>
        
        <h1 className='ask'>Ask Questions</h1> 

        <br /><br />

        <form onSubmit={handleSubmit}>
            
            <label htmlFor="name">Title:</label> <br />
            <input className='titleRectangle' type="text" id="name" name="title" value={formState.title} onChange={handleInputChange} /> <br /><br />
            
            <label htmlFor="text"></label> <br /> <br />
            <input  className='codeRectangle' placeholder="Post your Code Here" type="text" id="text" name="description" value={formState.description} onChange={handleInputChange} /> <br /><br />

            <input type="file" className='upload' name='imageUrl' onChange={(e) => handleFileUpload(e, setImageUrl)} multiple/>
            { imageUrl && (
              <>
            <img src={imageUrl} alt="profile" style={{'maxWidth': '40vw'}}/>  
              </> )} <br /><br />
            <Skills function={skillChange}></Skills>

            <button className='questionButton' type="submit" value="Post" >Post Question</button>

        
        </form>
              {error && <p>{error}</p>}

        </div>
    )
}

export default AddForm