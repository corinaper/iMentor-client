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

            <h5>iMentor</h5><Link to={`/chats/${user._id}`}><button>Chat List</button></Link>

        </Navbar>
      
    )
}

export default Navigation