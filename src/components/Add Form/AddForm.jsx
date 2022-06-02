import { useState } from "react"


function AddForm = (props) => {

    const [coasterData, setCoasterData] = useState({
        title: '',        
        text:'',        
        image:''

    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setCoasterData({
            ...coasterData,
            [name]: value               
        })
    }

    const handleSubmit = e => {

        e.preventDefault()

        coastersService
            .saveCoaster(coasterData)
            .then(response => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    const handleImageUpload = (e) => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setCoasterData({ ...coasterData, imageUrl: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    const { title, image, text} = coasterData



    return (

        <form>
            
            <label for="fname">Title:</label>
            <input type="text" id="fname" name="title" value={title} onChange={handleInputChange} />
            
            <label for="lname">Text:</label>
            <input type="text" id="lname" name="lname" value={text} onChange={handleInputChange} />

            <input type="file" onChange={(e) => handleImageUpload(e, setImageUrl)} value={image} onChange={handleImageUpload} />
            
            <input type="submit" value="Post" onChange={handleSubmit} ></input>


        
        </form>

    )
}

export default AddForm