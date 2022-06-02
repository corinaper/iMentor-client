import axios from 'axios'

class Mentor {

    constructor() {

        this.app = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}`
        })

    }

    getAllMentors = () => {
        return this.app.get('/mentors')
        
    }


    filterMentors = (skillsId,mentors) => {
       const filteredMentors = mentors.filter((mentor)=>{
           return skillsId.some((skillId)=>{
            return mentor.skills.includes(skillId)
           })
       })
       return filteredMentors
    }

}

const mentors = new Mentor()

export default mentors