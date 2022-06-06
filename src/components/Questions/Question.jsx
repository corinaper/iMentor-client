import './Question.css'
import { Link } from 'react-router-dom'
import { useContext, useParams, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'

const Question = ( ) => {
    const { id } = useParams()
    const [ question, setQuestion ] = useState(null)
    
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/questions/${id}`)
            .then(response => {
                setQuestion(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div className='questionContainer'>
            {question ? 
                <div className='questionContent'>
                    <div className='questionTop'>
                        <h3>{question.title}</h3>
                        <p>{question.description}</p>
                        <p>{question.Comments}</p>
                    </div>
                    
                    <div className='postComment'>
                        <input type="text" name="comment" />
                        <input type="button" name="comment" />
                    </div>

                    <div className='showComment'>
                        <img src={img} alt="profile pic" />
                        <p>{question.Comments}</p>
                    </div>
                </div>
            : <Spinner />}
        </div>
    )
}

export default Question;