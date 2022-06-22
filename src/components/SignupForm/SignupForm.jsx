import { useState } from "react"
import authService from "../../services/auth.service"
import { useNavigate, Link } from 'react-router-dom'
import './SignupForm.css'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        password: '',
        email: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        
        authService
            .signup(signupData)
            .then(res => {
                navigate('/login')
            })
            .catch(err => {
                console.log(err)
                setErrorMessage(err.response.data.message)
            })
        
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setSignupData({ ...signupData, [name]: value })
    }

    const { username, password, email } = signupData

    return (
        <>
        <form onSubmit={handleSubmit} className="signupForm">

            <div className="labelInput username">
                <label className="username" htmlFor="input-username">Name</label>
                <input 
                    id="input-username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="labelInput email">
                <label htmlFor="input-email">Email</label>
                <input 
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="labelInput password">
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

            {errorMessage && <p className="error">{errorMessage}</p>}

                <button className="blueButton buttonSizeL" type="submit">
                    Sign Up
                </button>

        </form>
        <p id="loginLink">Already have an account? <Link to={"/login"}>Login</Link></p>
        
        </>
    )
} 

export default SignupForm