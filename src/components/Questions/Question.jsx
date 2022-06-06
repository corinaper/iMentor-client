import './Question.css'
import { Navigate } from 'react-router-dom'
import { useParams, useState } from 'react'
import { useEffect } from 'react'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'

const Question = ( ) => {
    const { id } = useParams()
    const [ question, setQuestion ] = useState(null)
    const [ newComment, setNewComment ] = useState({})
    
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/questions/${id}`)
            .then(response => {
                setQuestion(response.data)
            })
            .catch(error => console.log(error))
    }, [id])

    const handleInput = (event) => {
        const inputComments = event.target.Comments;
        const value = event.target.value

        setNewComment((newComment) => {
            return {...newComment, [inputComments]: value};
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios
        .post(`REACT_APP_API_URL=http://localhost:5005/api`, newComment)
        .then((newData) => Navigate(`/questions/:id/comment/add`))
        .catch((error) => console.log(error))
    }

    return (
        <div className='questionContainer'>
            {question ? 
                <div className='questionContent'>
                    <div className='questionTop'>
                        <h3>{question.title}</h3>
                        <p>{question.description}</p>
                        <p>{question.code}</p>
                    </div>
                    
                    <div className='postComment'>
                        <form action="submit" onSubmit={handleSubmit}>
                            <input type="text" name="comment" onChange={handleInput}/>
                            <button type="submit">Post</button>
                        </form>
                    </div>

                    <div className='showComment'>
                        {question.Comments.map(comment => (
                            <div className='commentBox'>
                                <img src={question.user.profileImg} alt="profile pic" />
                                <h3>{question.user.username}</h3>
                                <p>{question.text}</p>
                            </div>
                        )
                        )}
                    </div>
                </div>
            : <Spinner />}
        </div>
    )
}

export default Question;