import './AddForm.css'
import { useState, useNavigate } from "react"
import uploadService from "../../services/upload.service"
import questionService from "../../services/question.services"
import axios from 'axios'



function AddForm(props) {
    const [image, setImage] = useState(false)

    const startingFormState = {
        title: '',        
        text:'',        
        image:''
      }

    const [formState, setFormState] = useState(startingFormState)

    const handleSubmit = (event)=>{   // revisar!!
      
      event.preventDefault()

        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/questions`, formState)
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
        /*
        uploadData.append("upload_preset","fzk9q9ld")
        uploadService.uploadImage(uploadData)
        .then(fileUrl => setImage(fileUrl))*/

    }



    return (

      <div>
        
        <h1 className='ask' >Ask Questions</h1>

        <form>
            
            <label htmlFor="name">Title:</label> <br />
            <input className='titleRectangle' type="text" id="name" name="title" value={formState.title} onChange={handleInputChange} /> <br /><br />
            
            <label htmlFor="text"></label> <br />
            <input  className='codeRectangle' placeholder="Post your Code Here" type="text" id="text" name="text" value={formState.text} onChange={handleInputChange} /> <br /><br />

            <input type="file" name='image' onChange={handleFileUpload} /> <br /><br />
          
            <button className='questionButton' type="submit" value="Post" onChange={handleSubmit}>Post Topic</button>


        
        </form>


        </div>
    )
}

export default AddForm