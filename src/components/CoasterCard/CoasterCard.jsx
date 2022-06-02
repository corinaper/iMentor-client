import "./CoasterCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../../context/auth.context";
// Import logo to put it on top of the page ??

function QuestionForm(props) {
  const Questions = ({ _id, imageUrl, title, code, comment }) => {
    const { user } = useContext(AuthContext);

    const [formState, setFormState] = useState(startingFormState);

    const handleSubmit = (event) => {
      
      event.preventDefautl();
      
      setFormState(startingFormState);
      // axios.post("/someURL", formState)
    };

    return (
      <form className="Questions">
        {/* <label>                         this is a component from add and edit
          Title:
          <input type="text" name={title} />
        </label>
        <label>
          Code:
          <input type="text" name={code} />
        </label> */}
        <label>
          Comment:
          <input type="text" name={comment} />
        </label>
        <input type="submit" value="" />
      </form>
    );
  };
}

export default QuestionForm;
