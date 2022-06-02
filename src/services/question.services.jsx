import axios from 'axios'

class Questions {

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

    getAllQuestion = () => {
        return this.app.get('/questions')
    }

    getOneQuestion = (id) => {
        return this.app.get(`/questions/${id}`)
    }

    createQuestion = (question) => {
        return this.app.post(`/questions"`, question)
    }
    
    editQuestion = (question, id) => {
        return this.app.post(`/questions/${id}/edit`, question)
    }
    
    deleteQuestion = (id) => {
        return this.app.post(`/questions/${id}/delete`)
    }}



const questions = new Questions()

export default questions