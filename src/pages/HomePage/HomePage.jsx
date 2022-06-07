import { Link } from 'react-router-dom'
import './HomePage.css'

const IndexPage = () => {

    return (
    <div>
        <img src='https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png' alt="Logo" className='logo'/>
        <br/>
        <h1 className='carussell'>Pictures here</h1>
        <img src="https://res.cloudinary.com/dkipxchhu/image/upload/v1654593243/IMG_20220607_110835_yleh4h.jpg" alt="carussell" className='carussell'/>
        <br/>

        <Link to="/login">
            <button className='login-button'>Login</button>
        </Link>
        <br/>
        <br/>
        <Link to="/signup">
            <button className='signup-button'>Sign Up</button>
        </Link>
    </div>
    )
}

export default IndexPage