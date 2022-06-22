import { useContext } from "react"
import { AuthContext } from "../context/auth.context"
import { Navigate, Outlet } from 'react-router-dom'


const NotLoggedInRoute = () => {

    const { isLoggedIn, user} = useContext(AuthContext)
     
    if (isLoggedIn ) 
    { return <Navigate to={`/profile/${user?._id}`} /> }
    
    return <Outlet />
    
}

export default NotLoggedInRoute