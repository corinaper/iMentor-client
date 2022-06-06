
import Questions from "../../components/QuestionCard/QuestionCard"
import Skills from "../../components/Skills/skills"
import { Link } from 'react-router-dom'

const QuestionPage = () => {


    return (
        <>
        <Link to={`/addform`}>
            <button>Add a post</button>
        </Link>
        <Skills></Skills>
       <Questions></Questions>
       
       </>
    )
}

export default QuestionPage