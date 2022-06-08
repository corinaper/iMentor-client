import { useContext, useEffect, useState } from "react"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import "../../components/LoginForm/LoginForm.css"
import  Spinner from "../Spinner/Spinner"

const Loginform = () => {

    const [loginData, setLoginData] = useState({
        password: '',
        email: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const { storeToken, authenticateUser, user } = useContext(AuthContext)
   

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
            .catch(err => {
                setError(true)
                setLoginData({
                    password: '',
                    email: ''
                }) 
                console.log("this is the login error",err)})
    }

    useEffect(()=>{ 
       if(user && user.course) navigate('/mentors')
       else if (user && !user.course) navigate(`/profile/${user._id}`)
    },[user])

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const { password, email } = loginData

    return ( 
        <>
        <form onSubmit={handleSubmit} className="loginForm">
            
            <div className="labelInput">
                <label className="login-email" htmlFor="input-email">Email</label>
                    <input
                        id="imput-email" 
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChange} 
                        required
                        />
            </div>

            <div className="labelInput">
                <label className='login-password' htmlFor="input-password">Password</label>
                    <input
                        id="imput-password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        required
                        minLength="8"
                    />
            </div>

            <div className="loginBtn">
                <button className="login-btn" type="submit">
                    Login
                </button>
            </div>

        </form>
        {error && 
        <p>Incorrect login details</p>}
        {loading &&
        <Spinner></Spinner>}
        </>
    )
}

export default Loginform