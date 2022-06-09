import { Link } from 'react-router-dom'
import Loginform from '../../components/LoginForm/LoginForm'
import './LoginPage.css'


const LoginPage = () => {

    return (
    <div className='loginContainer'>
        <div className='logo-login'>
        <Link to="/">
            <img src='https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png' alt="Logo" />
        </Link>
        </div>

        <Loginform />    
    </div>
    )
}

export default LoginPage