import { Routes, Route } from "react-router-dom"
import IndexPage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import MentorPage from "../pages/MentorPage/MentorPage"
import EditProfilePage from "../pages/EditProfilePage/EditProfilePage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import PrivateRoute from "./PrivateRoute"
import QuestionPage from "../pages/QuestionPage/QuestionPage"
import AddQuestion from "../pages/AddQuestion/AddQuestion"
import Question from "../components/QuestionDetails/QuestionDetails"
import QuestionDetailsPage from "../pages/QuestionDetailsPage/QuestionDetailsPage"
import ChatListPage from "../pages/ChatPageList/ChatPageList";
import ChatPage from "../pages/ChatPage/ChatPage";
import EditQuestionPage from "../pages/EditQuestionPage/EditQuestionPage"
import NotLoggedInRoute from "./NotLoggedInRoute"



const AppRoutes = () => {

    return (
        <Routes>
            
            <Route path="/" element={<NotLoggedInRoute/>}>
                <Route path="" element={<IndexPage />} />
            </Route>
            
            <Route path="/signup" element={<NotLoggedInRoute/>}>
                <Route path="" element={<SignupPage />} />
            </Route>

            <Route path="/login" element={<NotLoggedInRoute/>}>
                <Route path="" element={<LoginPage />} />
            </Route>
            

            <Route path="/questions" element={<PrivateRoute />}>
                <Route path="" element={<QuestionPage />} />
            </Route>

            
            <Route path="/mentors" element={<PrivateRoute />}>
                <Route path="" element={<MentorPage />} />
            </Route> 

            <Route path="/addquestion" element={<PrivateRoute />}>
            <Route path="" element={<AddQuestion/>} />
            </Route> 

            <Route path="/questions/:id" element={<PrivateRoute />}>
                <Route path="" element={<QuestionDetailsPage />} />
            </Route>

            <Route path="/question/:id/edit" element={<PrivateRoute />}>
                <Route path="" element={<EditQuestionPage />} />
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