import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import "./Footer.css";

const Footer = () => {

const { user, logOutUser } = useContext(AuthContext)

function hideSetting(){
    const menu = document.querySelector(".popupSetting")
    menu.classList.toggle("show")
    menu.classList.toggle("hide")
}

if (user)
return(
     <>
        <footer className='footer'>
             <section className='popupSetting'>
            <Link onClick={hideSetting} to="/profile/edit" className="userEdit flex">
                <img className='imgSizeL edit' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655814037/iMentor/edit_2_wa92up.png" alt=""/>
                <p>Edit Profile</p>
            </Link>
            <Link to="/" onClick={logOutUser} className="userEdit flex">
                <img className='imgSizeL' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1655851965/iMentor/logout_d8cga5.png" alt=""/>
                <p>Logout</p>
            </Link>
        </section>

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

       
    </>

)}


export default Footer