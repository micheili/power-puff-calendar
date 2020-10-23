import React, {useState, useEffect} from "react";
import useVisibilityToggler from "../hooks/useVisibilityToggler";
import MyInvite from "./MyInvite";
import NavInvites from "./NavInvites";

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

export default function Invitation(props) {
    //let {inviteId, title, description, start, stop} = props;

    async function fetchInvitations() {
        setInvitation(await (await fetch('/api/')).json());
    }
    
    const [allInvites, setInvitation] = useState({});
    console.log(allInvites);

    useEffect(() => {
        fetchInvitations();
      }, []);


    const [InvitationCardComponent, toggleVisibility] = useVisibilityToggler(
    <CardBody>
        <hr></hr>
            <MyInvite/>   
    </CardBody>, true
    );
        return(
            <Container className="data">
                 <NavInvites/>
                <Row className="justify-content-center mt-4 mb-3">
                    <h3>New invitations</h3>  
                </Row>
                <Row>
                    <Col>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="font-weight-bold d-flex"> has sent you an invitation
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


