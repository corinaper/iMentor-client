import axios from 'axios'

class Profile {

    constructor() {

        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`
        })

    }

    getOneUser = (id) => {
        return this.app.get(`/profile/${id}`)
    }


}

const profile = new Profile()

export default profile