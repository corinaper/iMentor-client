import { useEffect } from "react"
import { Link } from "react-router-dom"
import question from "../../services/question.service" 
import { useState } from "react"
import "../../components/QuestionCard/QuestionCard.css"



const Question = () => {
    const [questionList, setQuestionList] = useState([]);

    useEffect(()=>{
        question.getAllQuestions()
        .then((questions)=>{
            const reversedQuestions = questions.data.reverse()
            setQuestionList(reversedQuestions)})
        .catch((err)=>console.log(err))
        
    },[])

    return (
        <>
        {questionList.map((question)=>{
        return(
            <div key={question._id} className="questionCard">
                {/*<p>{question.owner}</p>*/}
                <h2>{question.title}</h2>
                <p>{question.description}</p>
            </div>
        )
    }) }
    </>)
}

export default Question