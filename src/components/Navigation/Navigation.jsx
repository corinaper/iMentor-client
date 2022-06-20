import './Navigation.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'


const Navigation = () => {

    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)
    
 if (user)
    return (
        <navbar className='navbar' >

            <img className='logo' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png" alt="iMentor"/>
            
            <Link to={`/chats/${user._id}`}><img className='img' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654785964/iMentor/Vector_paufg6.png" alt=""/></Link>

        </navbar>
      
    )
}

export default Navigation 