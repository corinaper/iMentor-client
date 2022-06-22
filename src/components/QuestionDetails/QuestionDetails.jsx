import './QuestionDetails.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useEffect } from 'react'
import questions from '../../services/question.services'
import User from "../../services/profile.service" 
import skills from "../../services/skills.service.js"
import "../../components/Skills/Skills.css"
import "../../pages/AddQuestion/AddQuestion.css"

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
        <div>
        <div className='flexColumn'>
                    <div className='questionTop width'>
                        <h3 className='titleRectangle'>{question?.title}</h3>
                        <p className='codeRectangle'>{question?.description}</p>
                        {question?.imageUrl &&
                        <img className='uploadedImg' src={question?.imageUrl} alt=""></img>}
                        <div className='skillList'>
                        {skillList?.map((skill)=>(
                            <span className="chips-selected" key={skill._id} id={skill._id}>{skill.name}</span>))}
                        </div>
                    <div>
                        {databaseUser?._id === question?.owner._id && 
                        <div className="editButtons">
                            <div className="flexColumn">
                                <img onClick={deleteQuestion} className="editImg" src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655814034/iMentor/delete_2_ni1yfg.png" alt=""></img>
                                <p id="editpost">Delete Post</p>
                            </div>
                            <div className="flexColumn">
                                <Link className="editImg" to={`/question/${question?._id}/edit`}><img  src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655814037/iMentor/edit_2_wa92up.png" alt=""></img></Link>
                                <p>Edit Post</p>
                            </div>
                        </div>}
                    </div>
        </div>
               
                    <div className='postComment'>
                        <form action="submit" onSubmit={handleSubmit}>
                            <textarea className='comment-area' type="text" name="comment" placeholder="Write you comment" onChange={handleInput}/>
                            <button className='blueButton buttonSizeS' type="submit">Post</button>
                        </form>
                    </div>

                    <div className='showComment'>
                        {question?.comments.map(comment => 
                         {  return(
                             <div key={comment._id} className='commentBox width'>
                                
                                    <img className="profileImg" src={comment.user.profileImg} alt="profile pic" />
                                    <div className="userCommentInfo">
                                        <p className="bold">{comment.user.username}</p>
                                        <p>{comment.text}</p>
                                    </div>
                            </div>) }
                        
                        )}
                    </div>
                    </div>
    </div>                
    )
}




export default Question