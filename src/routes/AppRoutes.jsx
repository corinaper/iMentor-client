import { Routes, Route } from "react-router-dom"
import IndexPage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import MentorPage from "../pages/MentorPage/mentorpage"
import EditProfilePage from "../pages/ProfilePage/EditProfilePage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import PrivateRoute from "./PrivateRoute"
import QuestionPage from "../pages/QuestionPage/QuestionPage"
import AddForm from "../components/AddForm/AddForm"
import Question from "../components/QuestionDetails/QuestionDetails"
import QuestionDetailsPage from "../pages/QuestionDetailsPage/QuestionDetailsPage"
import ChatListPage from "../pages/ChatPageList/ChatPageList";
import ChatPage from "../pages/ChatPage/ChatPage";



const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            

            <Route path="/questions" element={<PrivateRoute />}>
                <Route path="" element={<QuestionPage />} />
            </Route>

            
            {/* <Route path="/mentors" element={<PrivateRoute />}> */}
                <Route path="/mentors" element={<MentorPage />} />
            {/* </Route> */}

            <Route path="/addform" element={<AddForm/>} />

            <Route path="/questions/:id" element={<PrivateRoute />}>
                <Route path="" element={<QuestionDetailsPage />} />
            </Route>

            <Route path="/profile/:id" element={<PrivateRoute />}>
                <Route path="" element={<ProfilePage />} />
            </Route>

            <Route path="/profile/edit" element={<PrivateRoute />}>
                <Route path="" element={<EditProfilePage />} />
            </Route>

            <Route path="/chats/:id" element={<PrivateRoute />}>
                <Route path="" element={<ChatListPage />} />
            </Route>

            <Route path="/chats/:id/:otherId" element={<PrivateRoute />}>
                <Route path="" element={<ChatPage />} />
            </Route>        

            <Route path="*" element={<h1>Super-duper error 404</h1>} />
        </Routes>
    )
}

export default AppRoutes