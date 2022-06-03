import axios from 'axios'

class Question {

    constructor() {

        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`
        })

    }

    getAllQuestions = () => {
        return this.app.get('/questions')
        
    }


}

const questions = new Question()

export default questions

{/*
   filterMentors = (skillsId,mentors) => {
       const filteredMentors = mentors.filter((mentor)=>{
           return skillsId.some((skillId)=>{
            return mentor.skills.includes(skillId)
           })
       })
       return filteredMentors
    }
*/}
