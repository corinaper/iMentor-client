import axios from 'axios'

class Skills {

    constructor() {

        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`
        })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getAllSkills = () => {
        return this.app.get('/skills')
    }

    get5Skills = () => {
        return this.app.get('/only5skills')
    }

}

const skills = new Skills()

export default skills