import { useState } from "react"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        password: '',
        email: ''
    })

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(res => {
                navigate('/homepage')
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setSignupData({ ...signupData, [name]: value })
    }

    const { username, password, email } = signupData

    return (

        <form onSubmit={handleSubmit} className="signupForm">

            <div className="labelInput">
                <label htmlFor="input-username">Username</label>
                <input 
                    id="input-username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="labelInput">
                <label htmlFor="input-email">Email</label>
                <input 
                    id="input-email"
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
                    id="input-password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    required
                    minLength="8"
                />
            </div>

            <div className="signupBtn">
                <button type="submit">
                    Signup
                </button>
            </div>

        </form>

    )
} 

export default SignupForm