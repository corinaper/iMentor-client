import './Footer.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'

const Footer = () => {

const { user } = useContext(AuthContext)
console.log('this is our user ',user)
return(
    <footer className='footer'>
         <Link to="/questions" className="nav-link">Questions</Link>
         <Link to="/mentors" className="nav-link">Mentor</Link>
         {user ? <Link to={`/profile/${user._id}`}  className="nav-link">Profile</Link>
         : <Link to={`/`}  className="nav-link">Profile</Link>}
         
    </footer>
)};

export default Footer