import './Question.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useEffect } from 'react'
import questions from '../../services/question.services'
import "./Question.css"
import User from "../../services/profile.service"

const Question = ( ) => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [ question, setQuestion ] = useState(null)
    const [ newComment, setNewComment ] = useState({comment:""})
    const [databaseUser, setdatabaseUser] = useState()
    const navigate = useNavigate()
    
    useEffect(() => {
        questions.getOneQuestion(id)
        .then(response => {
            setQuestion(response.data)})
            .then(()=>User.getOneUser(user._id))
            .then((user)=>{
                console.log("use effect user", user.data)
                setdatabaseUser(user.data)})
            
          
        
         .catch(error => console.log(error))
        }, [id, user])
     

    const handleInput = (event) => {
        // const inputComments = event.target.comment;
        const value = event.target.value
        
        setNewComment({comment:value}) 
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if(newComment.comment){
        questions.createComment(newComment,id)
        .then((newquestion) => {
            setQuestion(newquestion.data)
            console.log(newquestion.data)
        })
        .then(()=>setNewComment({comment:""}))
        .catch((error) => console.log(error))}
    }

    const deleteQuestion =()=>{
        questions.deleteQuestion(question._id)
        navigate('/questions')
    }


    return (
        <div className='questionContainer'>
         <div>
                {databaseUser?._id === question?.owner._id && 
                <>
                <Link to={`/question/${question?._id}/edit`}><button>Edit</button></Link>
                <button onClick={deleteQuestion}>Delete</button>
                </>}
            </div>
        
        <div className='questionContent'>
                    <div className='questionTop'>
                        <h3>{question?.title}</h3>
                        <p>{question?.description}</p>
                        <img src={question?.imageUrl} alt=""></img>
                        
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