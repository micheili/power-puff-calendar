import React from 'react';
import NavInvites from './NavInvites';
import MyDeclinedInvite from './MyDeclinedInvite';
import useVisibilityToggler from "../hooks/useVisibilityToggler";


import { 
    Container,
    Row, 
    Col,
    Card, 
    CardBody,
    Button,
    CardTitle,
    
     }
    from 'reactstrap';


export default function Invitations_declined(){

    const [InvitationCardComponent, toggleVisibility] = useVisibilityToggler(
        <CardBody>
            <hr></hr>
             <MyDeclinedInvite/>
        </CardBody>, true
        );


    return(
              <Container className="data">
                    <NavInvites/>
                <Row className="justify-content-center mt-4 mb-3">
                    <h3>Declined invitations</h3>  
                </Row>
                <Row>
                    <Col>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="font-weight-bold d-flex"> has sent you an invitation
                                </CardTitle>
                                <Button color="primary" onClick={toggleVisibility}>Read more</Button>
                                {InvitationCardComponent}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
    
    
    )
    
}