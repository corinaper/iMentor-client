import { Link } from 'react-router-dom'
import './HomePage.css'

const IndexPage = () => {

    return (
    <div className='homeContainer'>
        <img src='https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png' alt="Logo" className='logo'/>
        
        <div className='carrouselContainer'>
            <img src="https://res.cloudinary.com/dkipxchhu/image/upload/v1654593243/IMG_20220607_110835_yleh4h.jpg" alt="carrousel" className='carrousel'/>
        </div>

        <div>
            <Link to="/login">
                <button className='login-button'>Login</button>
            </Link>

            <Link to="/signup">
                <button className='signup-button'>Sign Up</button>
            </Link>
        </div>
    </div>
    )
}

export default IndexPage