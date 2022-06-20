import './QuestionDetails.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useEffect } from 'react'
import questions from '../../services/question.services'
import User from "../../services/profile.service" 
import skills from "../../services/skills.service.js"
import "../../components/Skills/Skills.css"

const Question = ( ) => {
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    const [ question, setQuestion ] = useState(null)
    const [ newComment, setNewComment ] = useState({comment:""})
    const [databaseUser, setdatabaseUser] = useState()
    const [skillList, setSkillList] = useState([]);
    const navigate = useNavigate()
     
    useEffect(() => {
        questions.getOneQuestion(id)
        .then(question => {
            setQuestion(question.data)
            skills.getAllSkills()
                .then((skillData)=>
                    {
                    const questionSkills = skillData.data.filter((skill)=>question.data.skills.includes(skill._id))
                    setSkillList(questionSkills)
                    })})
            .then(()=>User.getOneUser(user._id))
            .then((user)=>{
                console.log("use effect user", user.data)
                setdatabaseUser(user.data)
                
            })
         .catch(error => console.log(error))
        }, [user, newComment])
     

    const handleInput = (event) => {
        
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
            
            
        
        <div className='questionContent'>
                    <div className='questionTop'>
                        <h3 className='title'>{question?.title}</h3>
                        <p className='description'>{question?.description}</p>
                        <img src={question?.imageUrl} alt=""></img>
                        {skillList?.map((skill)=>(
                    <span className="chips-selected" key={skill._id} id={skill._id}>{skill.name}</span>))}
                    <div>
                        {databaseUser?._id === question?.owner._id && 
                        <>
                        <Link to={`/question/${question?._id}/edit`}><button>Edit</button></Link>
                        <button onClick={deleteQuestion}>Delete</button>
                        </>}
                    </div>
        </div>
                    
                    <div className='postComment'>
                        <form action="submit" onSubmit={handleSubmit}>
                            <input className='comment-area' type="text" name="comment" placeholder="Write you comment" onChange={handleInput}/>
                            <button className='post' type="submit">Post</button>
                        </form>
                    </div>

                    <div className='showComment'>
                        {question?.comments.map(comment => 
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