import './Navigation.css'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'


const Navigation = () => {

    const { user, logOutUser, isLoggedIn } = useContext(AuthContext)
 
    return (
        <Navbar className='navbar' bg="white" variant="white" >

        <h5>iMentor</h5>

      
                    </Navbar>
      
    )
}

export default Navigation