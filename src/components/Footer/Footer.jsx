import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import "./Footer.css";
import postimg from "../../../src/images/post.png"
import mentorimg from "../../../src/images/mentor.png"
import profileimg from "../../../src/images/profile.png"

const Footer = () => {

const { user } = useContext(AuthContext)

if (user) {
return (
    <footer className="footer">
        <nav>
            <ul className="nav-links">
                <li>
                    <Link to="/questions" className="nav-link">
                        <img src={postimg} alt="" />
                    </Link>
                </li>

                <li>
                    <Link to="/mentors" className="nav-link">
                        <img src={mentorimg} alt="" />
                    </Link>
                </li>

                <li>
                    <Link to={`/profile/${user._id}`} className="nav-link">
                        <img src={profileimg} alt="" />
                    </Link>
                </li>
            </ul>
        </nav>
    </footer>
)}
}

export default Footer