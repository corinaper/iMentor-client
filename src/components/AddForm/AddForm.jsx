import './AddForm.css'
import { useState, useContext } from "react"
import uploadService from "../../services/upload.service"
import questionService from "../../services/question.services"
import { AuthContext } from "../../context/auth.context"



function AddForm(props) {
    const [imageUrl, setImageUrl] = useState(false)
    const { user } = useContext(AuthContext)
    const startingFormState = {
        title: '',        
        description:'',        
        imageUrl:'',
        owner: {user}
      }

    const [formState, setFormState] = useState(startingFormState)

    const handleSubmit = (event)=>{   // revisar!!      
      event.preventDefault()      

      questionService.createQuestion(formState)
            .then(({ data }) => {
              console.log(data) // aquí hauràs de fer servir useNavigate per anar a la pàgina de la nova pregunta
            }) 
            .catch((error) => {
                console.log(error);
            })
  
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
          setImageUrl(data.cloudinary_url)
          setFormState({ ...formState, imageUrl: data.cloudinary_url })
        })
        .catch((err) => console.log(err))
        /*
        uploadData.append("upload_preset","fzk9q9ld")
        uploadService.uploadImage(uploadData)
        .then(fileUrl => setImage(fileUrl))*/

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

            {/* <input type="file" className='upload' name='imageUrl' onChange={handleFileUpload} /> <br /><br /> */}
          
            <button className='questionButton' type="submit" value="Post" >Post Topic</button>

          
  


        
        </form>


        </div>
    )
}

export default AddForm