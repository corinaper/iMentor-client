import { useContext, useState } from "react"
import authService from "../../services/auth.service"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import "../../components/LoginForm/LoginForm.css"
import  Spinner from "../Spinner/Spinner"
import profile from "../../services/profile.service.js"


const Loginform = () => {

    const [loginData, setLoginData] = useState({
        password: '',
        email: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { storeToken, authenticateUser, user } = useContext(AuthContext)
    const { password, email } = loginData

    const handleSubmit = e => {
        e.preventDefault()
        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                setLoading(true)
                setError(false)
            })
            .then(()=>
                profile.getOneUser(user?._id)
                .then((user)=>console.log("course", user.course)))
            .catch(err => {
                setError(true)
                setLoginData({
                    ...loginData, 
                    email: ''
                }) 
                console.log("this is the login error",err)})
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    } 

    return ( 
        <>
            <form onSubmit={handleSubmit} className="loginForm">
                
                <div className="labelInput login-email">
                    <label htmlFor="input-email">Email</label>
                        <input 
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleInputChange} 
                            required
                        />
                </div>

                <div className="labelInput login-password">
                    <label htmlFor="input-password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            required
                            minLength="8"
                        />
                </div>

                {error && 
                    <p className="error">Incorrect login details</p>}
                        <button className="blueButton buttonSizeL" type="submit">
                            Login
                        </button>
                

            </form>
            
            <p>Don't have an account? <Link to={"/signup"}>SignUp</Link></p>
            
            {loading &&
            <Spinner></Spinner>}
        </>
    )
}

export default Loginform