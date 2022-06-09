import './QuestionPage.css'
import Questions from "../../components/QuestionCard/QuestionCard"
import Skills from "../../components/Skills/skills"
import { Link } from 'react-router-dom'
import '../QuestionPage/QuestionPage.css'

const QuestionPage = () => {


    return (
        <div className="questionContainer">
        <h2>Feed</h2>
        <Link to={`/addquestion`}>
            <button className="addPostBtn">Add a post</button>
        </Link>
        
       <Questions></Questions>
       
       </div>
    )
}

export default QuestionPage