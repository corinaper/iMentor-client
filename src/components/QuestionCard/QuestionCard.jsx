import { useEffect } from "react"
import { Link } from "react-router-dom"
import question from "../../services/question.service" 
import { useState } from "react"
import "../../components/QuestionCard/QuestionCard.css"



const Question = () => {
    const [questionList, setQuestionList] = useState([]);

    useEffect(()=>{
        question.getAllQuestions()
        .then((question)=>{
            console.log("question from card", question)
            setQuestionList(question.data)})
        .catch((err)=>console.log(err))
        
    },[])

    return (
        <>
        {questionList.map((question)=>{
        return(
            <div key={question._id} className="questionCard">
                <p>{question.owner}</p>
                <h2>{question.title}</h2>
                <p>{question.description}</p>
               {/* <Link to={`/question/${question._id}`}>
                    <button>question</button>
        </Link>*/}
            </div>
        )
    }) }
    </>)
}

export default Question