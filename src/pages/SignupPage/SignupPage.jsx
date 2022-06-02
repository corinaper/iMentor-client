import { Link } from 'react-router-dom'
import SignupForm from '../../components/SignupForm/SignupForm'
import './SignupPage.css'

const SignupPage = () => {

    return (
        <>    
        <Link to="/">
            <img src='https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png' alt="Logo" className='logo'/>
        </Link>
            <SignupForm />
            <div className='link-to-login'>
            <Link to="/login" >
            <p>Already got a user?</p> 
            </Link>
            </div>
        </>
    )
}

export default SignupPage