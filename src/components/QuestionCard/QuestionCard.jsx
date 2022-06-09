import { useEffect } from "react"
import { Link } from "react-router-dom"
import questions from "../../services/question.services" 
import { useState } from "react"
import "../../components/QuestionCard/QuestionCard.css"
import Skills from "../../components/Skills/skills"

const skillList = []

const Question = () => {
    const [questionList, setQuestionList] = useState([]);
    const [filteredList, setfilteredList] = useState([]);

    useEffect(()=>{
        questions.getAllQuestions()
        .then((questions)=>{
            const reversedQuestions = questions.data.reverse()
            setQuestionList(reversedQuestions)
            setfilteredList(reversedQuestions)})
        .catch((err)=>console.log(err))
        
    },[])

    function filterQuestions(e){
        if(!skillList.includes(e.target.id))
        skillList.push(e.target.id)
        else{skillList.splice(skillList.indexOf(e.target.id),1)}

        const newList = questionList.filter((mentor)=>skillList.some(skill=>mentor.skills.includes(skill)))
        if (newList.length>0)
        setfilteredList(newList)
        else setfilteredList(questionList)

        console.log(newList)

    }


    return (
        <>
        <Skills function={filterQuestions}></Skills>
        {filteredList.map(({_id,owner, title,description})=>{
            const shortDescription = description.slice(0, 100)+'...'
        return(
            <div key={_id} className="questionCard">
                <img className="profileImg" src={owner.profileImg} alt=""></img>
                <p>{owner.username}</p>
                <Link to={`/questions/${_id}`} className="linkToQuestionDetails">
                <h2>{title}</h2>
                <p>{shortDescription}</p>
                </Link>
            </div>
        )
    }) }
    </>)
}

export default Question