import { Container, Row, Col } from 'react-bootstrap'
import Loginform from '../../components/LoginForm/LoginForm'


const LoginPage = () => {

    return (
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <img src="../public/Group 45.png" alt="logo" />
                    <Loginform />

                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage