import { Routes, Route } from "react-router-dom"
import CoasterDetailsPage from "../pages/CoasterDetailsPage/CoasterDetailsPage"
import CoastersPage from '../pages/CoastersPage/CoastersPage'
import IndexPage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import PrivateRoute from "./PrivateRoute"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/galeria" element={<CoastersPage />} />
            <Route path="/detalles/:coaster_id" element={<CoasterDetailsPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/inicio-sesion" element={<LoginPage />} />

            <Route path="/perfil" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
            </Route>


            <Route path="*" element={<h1>Esto es un 404, melón</h1>} />
        </Routes>
    )
}

export default AppRoutes