import React from "react";
import useVisibilityToggler from "../hooks/useVisibilityToggler";

import { 
    Container,
    Row, 
    Col,
    Card, 
    CardBody,
    CardText,
    Button,
    CardTitle
     }
    from 'reactstrap';

const Invitation = (props) => {
    const [InvitationCardComponent, toggleVisibility] = useVisibilityToggler(
    <CardBody>
        <hr></hr>
            <CardText>Info about the event</CardText>
            <Button color="danger float-right">No, cant make it</Button>
            <Button color="primary mr-2 float-right">Yes, count me in!</Button>     
    </CardBody>, true
    );
        return(
            <Container className="data">
                <Row className="justify-content-center mt-4 mb-3">
                    <h3>New invitations</h3>
                </Row>
                <Row>
                    <Col>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="font-weight-bold d-flex">Buttercup has sent you an invitation
                                </CardTitle>
                                <Button color="primary" className="" onClick={toggleVisibility}>Read more</Button>
                            </CardBody>
                            {InvitationCardComponent}
                        </Card>
                    </Col>
                </Row>
            </Container>
        );      
}

export default Invitation;
