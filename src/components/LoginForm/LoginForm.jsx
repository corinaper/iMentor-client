import { useContext, useState } from "react"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'


const Loginform = () => {

    const [loginData, setLoginData] = useState({
        password: '',
        email: ''
    })

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)
   

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const { password, email } = loginData

    return (

        <form onSubmit={handleSubmit} className="loginForm">
            
            <div className="labelInput">
                <label htmlFor="input-email">Email</label>
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
                <label htmlFor="input-password">Password</label>
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
    )
}

export default Loginform