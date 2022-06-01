import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const IndexPage = () => {

    return (
    <div>
        <h1>iMentor</h1>
        <br/>
        <br/>
        <h5>Do you need a mentor?
        <br/>
        <br/>
        Thats why we here!
        <br/>
        <br/>
        Sign up or login here</h5>
        <Link to="/login">
            <Button variant="dark" size='lg'>Login</Button>
        </Link>
        <br/>
        <br/>
        <Link to="/signup">
            <Button variant="dark" size='lg'>Sign Up</Button>
        </Link>
    </div>
    )
}

export default IndexPage