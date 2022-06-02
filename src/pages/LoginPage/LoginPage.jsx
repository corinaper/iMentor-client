import { Link } from 'react-router-dom'
import Loginform from '../../components/LoginForm/LoginForm'
import './LoginPage.css'


const LoginPage = () => {

    return (
    <>
        <Link to="/">
            <img src='https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png' alt="Logo" className='logo'/>
        </Link> 
        <Loginform />
        <Link to="/signup" className="link-to-signup">
            <p>Dont have a user?</p>
        </Link>
            
    </>
    )
}

export default LoginPage