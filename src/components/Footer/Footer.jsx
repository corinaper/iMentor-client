import './Footer.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

const Footer = () => {

const { user, logOutUser, isLoggedIn } = useContext(AuthContext);

return(
    <footer className='footer'>
         <Link to="/questions" className="nav-link">Questions</Link>
         <Link to="/mentors" className="nav-link">Mentor</Link>
         <Link to="/profile/:id" className="nav-link">Profile</Link>
    </footer>
)};

export default Footer;