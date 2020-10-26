import React, {useContext, useState, useEffect} from "react";
import useVisibilityToggler from "../hooks/useVisibilityToggler";
import MyInvite from "./MyInvite";
import NavInvites from "./NavInvites";
import { Context } from "../App";

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

export default function Invitation() {

    const [context] = useContext(Context);

    const userId =  context.user.id;

    console.log('this is the currentuserID' + userId)
 
    async function fetchInvitations() {
        setInvitations(await (await fetch(`api/pendingEvents/${userId}`)).json()); 
    }

    
    const [allInvites, setInvitations] = useState([]);
    
    console.log('data' , allInvites)
    
    useEffect(() => {
        fetchInvitations(); 
      }, []);

      //map data in MyInvite here
    const [InvitationCardComponent, toggleVisibility] = useVisibilityToggler(
    <CardBody>
        <hr></hr>
      
      
        {allInvites.map((invite) => {
              return <MyInvite key={invite.id}{...invite}></MyInvite>
        })}
                  
    </CardBody>, true
            
    );
        return(
            <Container className="data" >
                 <NavInvites/>
                <Row className="justify-content-center mt-4 mb-3">
                    <h3>{fetchInvitations.length} New invitation
                    {fetchInvitations.length > 1 ? 's' : ''|| fetchInvitations.length === 0 ? 's' : ''}
                    </h3>  
                </Row>
                <Row>
                    <Col>
                        <Card className="mb-4">
                            <CardBody>
                                <CardTitle className="font-weight-bold d-flex"> has sent you an invitation
                                </CardTitle>
                                <Button color="primary" onClick={toggleVisibility}> Read more </Button>
                            </CardBody>
                            {InvitationCardComponent}
                        </Card>
                    </Col>
                </Row>
            </Container>
        );      
}


