import './Navigation.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'


const Navigation = () => {

    const { user } = useContext(AuthContext)
    
 if (user)
    return (
        <nav className='navbar flex'>
            <img className='logo' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png" alt="iMentor"/> 
            <Link to={`/chats/${user?._id}`}><img className='img' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654785964/iMentor/Vector_paufg6.png" alt=""/></Link>
        </nav>
      
    )
}

export default Navigation 