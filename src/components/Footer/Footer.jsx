import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import "./Footer.css";

const Footer = () => {

const { user } = useContext(AuthContext)

if (user)
return (
    <footer className="footer">
        <nav>
            <ul className="nav-links">
                <li>
                    <Link to="/questions" className="nav-link">
                        Questions
                    </Link>
                </li>

                <li>
                    <Link to="/mentors" className="nav-link">
                        Mentor
                    </Link>
                </li>

                <li>
                    <Link to={`/profile/${user._id}`} className="nav-link">
                            Profile
                    </Link>
                </li>
            </ul>
        </nav>
    </footer>
);};

export default Footer