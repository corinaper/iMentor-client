
import Questions from "../../components/QuestionCard/QuestionCard"
import Skills from "../../components/Skills/skills"
import { Link } from 'react-router-dom'

const QuestionPage = () => {


    return (
        <>
        <Link to={`/addquestion`}>
            <button>Add a post</button>
        </Link>
       <Questions></Questions>
       
       </>
    )
}

export default QuestionPage