import { useContext } from "react"
import { AuthContext } from "../context/auth.context"

import { Navigate, Outlet } from 'react-router-dom'


const NotLoggedInRoute = () => {

    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn) {
        
        return <Navigate to="/mentors" />
    }

    return <Outlet />
}

export default NotLoggedInRoute