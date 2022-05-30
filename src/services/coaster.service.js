import axios from 'axios'

class CoastersService {

    constructor() {

        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/coasters`
        })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getAllCoasters = () => {
        return this.app.get('/getAllCoasters')
    }

    getOneCoaster = id => {
        return this.app.get(`/getOneCoaster/${id}`)
    }

    saveCoaster = coaster => {
        return this.app.post(`/saveCoaster`, coaster)
    }
}

const coastersService = new CoastersService()

export default coastersService