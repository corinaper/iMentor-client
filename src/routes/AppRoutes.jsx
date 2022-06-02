import { Routes, Route } from "react-router-dom"
import IndexPage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import MentorPage from "../pages/MentorPage/mentorpage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import PrivateRoute from "./PrivateRoute"


const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/perfil" element={<PrivateRoute />}>
                <Route path="" element={<MentorPage />} />
            </Route>

            <Route path="/questions" element={<PrivateRoute />}>
                {/* <Route path="" element={<MentorPage />} /> */}
            </Route>

            <Route path="/questions/:id" element={<PrivateRoute />}>
                {/* <Route path="" element={<MentorPage />} /> */}
            </Route>

            <Route path="/profile/:id" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
            </Route>


            <Route path="*" element={<h1>Esto es un 404, melón</h1>} />
        </Routes>
    )
}

export default AppRoutes