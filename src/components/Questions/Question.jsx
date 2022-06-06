import './Question.css'
import { useParams } from 'react-router-dom'
import { useContext, useState, Navigate } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useEffect } from 'react'
import questions from '../../services/question.service'
import axios from 'axios'

const Question = ( ) => {
    const { id } = useParams()
    const [ question, setQuestion ] = useState(null)
    const [ newComment, setNewComment ] = useState({})
    
    useEffect(() => {
        questions.getOneQuestion(id)
        .then(response => {
            setQuestion(response.data)
            console.log(response)
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
        
        <div className='questionContent'>
                    <div className='questionTop'>
                        <h3>{question?.title}</h3>
                        <p>{question?.description}</p>
                        <p>{question?.Comments}</p>
                    </div>
                    
                    <div className='postComment'>
                        <form action="submit" onSubmit={handleSubmit}>
                            <input type="text" name="comment" onChange={handleInput}/>
                            <button type="submit">Post</button>
                        </form>
                    </div>

                    <div className='showComment'>
                        {question?.Comments.map(comment => (
                            <div className='commentBox'>
                                <img src={question.user.profileImg} alt="profile pic" />
                                <h3>{question.user.username}</h3>
                                <p>{question.text}</p>
                            </div>
                        )
                        )}
                    </div>
                    </div>
                    
        </div>
    )
}




export default Question