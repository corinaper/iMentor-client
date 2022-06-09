import './QuestionPage.css'
import Questions from "../../components/QuestionCard/QuestionCard"
import Skills from "../../components/Skills/skills"
import { Link } from 'react-router-dom'

const QuestionPage = () => {


    return (
        <div className="questionContainer">
            <Link to={`/addform`}>
                <button className="addPostBtn">Add a post</button>
            </Link>

            <Questions />
    
        </div>
    )
}

export default QuestionPage