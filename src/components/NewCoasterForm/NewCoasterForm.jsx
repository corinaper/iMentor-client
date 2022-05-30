import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import coastersService from "../../services/coaster.service"
import uploadService from "../../services/upload.service"


const NewCoasterForm = ({ fireFinalActions }) => {

    const [coasterData, setCoasterData] = useState({
        title: '',
        description: '',
        inversions: 0,
        length: 0,
        imageUrl: ''
    })

    const [loadingImage, setLoadingImage] = useState(false)

    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setCoasterData({
            ...coasterData,
            [name]: value               // computed property names
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

    const { title, description, inversions, length } = coasterData



    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
                <Form.Text className="text-muted">Mínimo 20 caracteres</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="length">
                <Form.Label>Longitud</Form.Label>
                <Form.Control type="number" value={length} onChange={handleInputChange} name="length" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="inversions">
                <Form.Label>Inversiones</Form.Label>
                <Form.Control type="number" value={inversions} onChange={handleInputChange} name="inversions" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control type="text" value={imageUrl} onChange={handleInputChange} name="imageUrl" />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>Imagen (archivo)</Form.Label>
                <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>

            <Button variant="dark" type="submit" disabled={loadingImage}>{loadingImage ? 'Cargando imagen...' : 'Crear montaña rusa'}</Button>
        </Form>

    )
}

export default NewCoasterForm