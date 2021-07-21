import React, {
    useState,
    useEffect
} from 'react';
import {
    Row,
    Col,
    Container,
} from 'reactstrap'


const SideBar = (props) => {








    return(
        <Container id='mainWrapper'>
            <Row>
                <Col>
                    stuff here
                </Col>
            </Row>
            <Row xl="3">
                <Col>
                    stuff here too
                </Col>
                <Col>
                    stuff here too
                </Col>
                <Col>
                    stuff here too
                </Col>
            </Row>
        </Container>
    )
}

export default SideBar