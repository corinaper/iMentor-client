import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import "./Footer.css";

const Footer = () => {

const { user } = useContext(AuthContext)

if (user)
return(
     
    <footer className='footer'>
        
        <Link to="/questions" className="nav-link">
            <img src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654784636/iMentor/post_dcmeoh.png" alt=""/>
        </Link>
         <Link to="/mentors" className="nav-link">
         <img src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654784636/iMentor/mentor_lub2qh.png" alt=""/>
         </Link>
          <Link to={`/profile/${user._id}`}  className="nav-link">
          <img src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654784636/iMentor/profile_ha2cmd.png" alt=""/>
          </Link>
         
    </footer>

)}


export default Footer