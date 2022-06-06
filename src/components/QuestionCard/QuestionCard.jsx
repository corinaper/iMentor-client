import { useEffect } from "react"
import { Link } from "react-router-dom"
import question from "../../services/question.service" 
import { useState } from "react"
import "../../components/QuestionCard/QuestionCard.css"
import Skills from "../../components/Skills/skills"

const skillList = []

const Question = () => {
    const [questionList, setQuestionList] = useState([]);
    const [filteredList, setfilteredList] = useState([]);

    useEffect(()=>{
        question.getAllQuestions()
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
        {filteredList.map((question)=>{
        return(
            <div key={question._id} className="questionCard">
                {/* <p>{question.owner.imageUrl}</p> */}
                <h2>{question.title}</h2>
                <p>{question.description}</p>
            </div>
        )
    }) }
    </>)
}

export default Question