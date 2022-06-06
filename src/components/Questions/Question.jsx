import './Question.css'
import { useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useEffect } from 'react'
import questions from '../../services/question.service'

const Question = ( ) => {
    const { id } = useParams()
    const [ question, setQuestion ] = useState(null)
    
    useEffect(() => {
        {/*axios
            .get(`${process.env.REACT_APP_API_URL}/questions/${id}`)
            .then(response => {
                setQuestion(response.data)
            })
        .catch(error => console.log(error))*/}
        questions.getOneQuestion(id)
        .then(response => {
            setQuestion(response.data)
            console.log(response)
        })
         .catch(error => console.log(error))
        }, [id])
     

        return (
        <div className='questionContainer'>
        
        <div className='questionContent'>
                    <div className='questionTop'>
                        <h3>{question?.title}</h3>
                        <p>{question?.description}</p>
                        <p>{question?.Comments}</p>
                    </div>
                    
                    <div className='postComment'>
                    <input type="text" name="comment" />
                    <input type="button" name="comment" />
                    </div>

                    <div className='showComment'>
                        {/*<img src={question.imageUrl} alt="profile pic" />*/}
                        <p>{question.Comments}</p>
                    </div>
                    </div>
                    
        </div>
    )
}




export default Question