import './Question.css'
import { useParams } from 'react-router-dom'
import { useContext, useState, Navigate } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useEffect } from 'react'
import questions from '../../services/question.services'
import "./Question.css"

const Question = ( ) => {
    const { id } = useParams()
    const [ question, setQuestion ] = useState(null)
    const [ newComment, setNewComment ] = useState({comment:""})
    
    useEffect(() => {
        questions.getOneQuestion(id)
        .then(response => {
            setQuestion(response.data)
            console.log(response.data)
        })
         .catch(error => console.log(error))
        }, [id])
     

    const handleInput = (event) => {
        // const inputComments = event.target.comment;
        const value = event.target.value
        
        setNewComment({comment:value}) 
    }

    const handleSubmit = (event) => {
        event.preventDefault()
     
        questions.createComment(newComment,id)
        .then((newquestion) => {
            setQuestion(newquestion.data)
            console.log(newquestion.data)
        }
             
        )
        .catch((error) => console.log(error))
    }

    return (
        <div className='questionContainer'>
        
        <div className='questionContent'>
                    <div className='questionTop'>
                        <h3>{question?.title}</h3>
                        <p>{question?.description}</p>
                        
                    </div>
                    
                    <div className='postComment'>
                        <form action="submit" onSubmit={handleSubmit}>
                            <input type="text" name="comment" onChange={handleInput}/>
                            <button type="submit">Post</button>
                        </form>
                    </div>

                    <div className='showComment'>
                        {question?.Comments.map(comment => 
                         {  return(
                             <div key={comment._id} className='commentBox'>
                                <img className="profileImg" src={comment.user.profileImg} alt="profile pic" />
                                <h3>{comment.user.username}</h3>
                                <p>{comment.text}</p>
                            </div>) }
                        
                        )}
                    </div>
                    </div>
                    
        </div>
    )
}




export default Question