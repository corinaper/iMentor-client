import { useState } from "react"
import axios from "axios"



function AddForm(props) {
    const [image, setImage] =useState("")
    
    const [coasterData, setCoasterData] = useState({
        title: '',        
        text:'',        
        image:''

    })


    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setCoasterData({
            ...coasterData,
            [name]: value               
        })
    }

    // const handleSubmit = e => {  // This an axios post to a route where we want to post the form

    //     e.preventDefault()

    //     coastersService
    //         .saveCoaster(coasterData)
    //         .then(response => {
    //             fireFinalActions()
    //         })
    //         .catch(err => console.log(err))

    // axios
    // .post(`https://api.cloudinary.com/v1_1/marcelusironhack/image/upload`, uploadData)
    // .then(res => setImage(res.data.secure_url))
    // .catch(err => console.log("Error while uploading the file on service", err))

    // }

    function handleFileUpload(event) {
        event.preventDefault();
        const uploadData = new FormData();
        
        uploadData.append("file", event.target.files[0])
        uploadData.append("upload_preset","fzk9q9ld")

        axios
        .post(`https://api.cloudinary.com/v1_1/marcelusironhack/image/upload`, uploadData)
        .then(res => setImage(res.data.secure_url))
        .catch(err => console.log("Error while uploading the file on service", err))
    }


    const { title, text} = coasterData



    return (

        <form>
            
            <label for="name">Title:</label>
            <input type="text" id="name" name="title" value={title} onChange={handleInputChange} />
            
            <label for="text">Text:</label>
            <input type="text" id="text" name="text" value={text} onChange={handleInputChange} />

            <input type="file" onChange={(e) => handleFileUpload(e)} value={image} />
            
            <input type="submit" value="Post" onChange={handleSubmit} ></input>


        
        </form>

    )
}

export default AddForm