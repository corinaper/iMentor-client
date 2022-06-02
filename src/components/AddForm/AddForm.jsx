import { useState } from "react"
import uploadService from "../../services/upload.service"
import questionService from "../../services/question.services"


function AddForm(props) {
    const [image, setImage] = useState("")

    const startingFormState = {
        title: '',        
        text:'',        
        image:''
      }

    const [formState, setFormState] = useState(startingFormState)

    const handleSubmit = (event)=>{
      event.preventDefault()
      console.log("formState: ", formState)
      setFormState(startingFormState)
      //uploadService.uploadImage()
      questionService.createQuestion(formState)
  
    }
  
    const handleInputChange = (event)=>{
      let value
      if(event.target.type === "checkbox") value = event.target.checked
      else value = event.target.value
      // const newFormState = Oject.assign({}, formState, {[event.target.name]: value}})
      const newFormState = {...formState, [event.target.name]: value}
      setFormState(newFormState)
    } 



    function handleFileUpload(event) {
        event.preventDefault();
        const uploadData = new FormData();
        
        uploadData.append("file", event.target.files[0])
        uploadData.append("upload_preset","fzk9q9ld")
        uploadService.uploadImage(uploadData)
        .then(fileUrl => setImage(fileUrl))

    }



    return (

        <form>
            
            <label htmlFor="name">Title:</label>
            <input type="text" id="name" name="title" value={formState.title} onChange={handleInputChange} />
            
            <label htmlFor="text">Text:</label>
            <input type="text" id="text" name="text" value={formState.text} onChange={handleInputChange} />

            <input type="file" onChange={(e) => handleFileUpload(e)} value={image} />
            
            <button type="submit" value="Post" onChange={handleSubmit}>Submit</button>


        
        </form>

    )
}

export default AddForm