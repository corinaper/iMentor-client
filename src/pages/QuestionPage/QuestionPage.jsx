
import Questions from "../../components/QuestionCard/QuestionCard"
import Skills from "../../components/Skills/skills"
import { Link } from 'react-router-dom'
import '../QuestionPage/QuestionPage.css'

const QuestionPage = () => {


    return (
        <div className="questionContainer">
        <Link to={`/addquestion`}>
            <button className="addPostBtn">Add a post</button>
        </Link>
       <Questions></Questions>
       
       </div>
    )
}

export default QuestionPage