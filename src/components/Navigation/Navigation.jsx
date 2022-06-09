import './Navigation.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'


const Navigation = () => {

    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)
    
 if (user)
    return (
        <Navbar className='navbar' bg="white" variant="white" >

            <h5>iMentor</h5>
            
            <Link to={`/chats/${user._id}`}><img className='img' src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654785964/iMentor/Vector_paufg6.png" alt=""/></Link>

        </Navbar>
      
    )
}

export default Navigation 