import { Link } from 'react-router-dom'
import './HomePage.css'

const IndexPage = () => {

    return (
    <div className='homeContainer'>

            <img src='https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png' alt="Logo"/>

        
        <div className='carrouselContainer'>
            <img src="https://res.cloudinary.com/dkipxchhu/image/upload/v1654593243/IMG_20220607_110835_yleh4h.jpg" alt="carrousel"/>
        </div>

        <div className='homeBtns'>
            <div className='signupBtn-Home'>
                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>
            </div>

            <div className='loginBtn-Home'>
                <Link to="/login">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default IndexPage