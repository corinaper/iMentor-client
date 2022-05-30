import { Row, Col } from "react-bootstrap"
import CoasterCard from "../CoasterCard/CoasterCard"
import Loader from "../Loader/Loader"

const CoastersList = ({ coasters }) => {

    return (
        coasters.length
            ?
            <Row>
                {
                    coasters.map(coaster => {
                        return (
                            <Col md={{ span: 4 }} key={coaster._id}>
                                <CoasterCard {...coaster} />
                            </Col>
                        )
                    })
                }
            </Row>
            :
            <Loader />
    )
}

export default CoastersList