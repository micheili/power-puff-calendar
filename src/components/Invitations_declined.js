import React, { useContext } from "react";
import NavInvites from "./NavInvites";
import MyDeclinedInvite from "./MyDeclinedInvite";
import { Context } from "../App";

import {
  Container,
  Col,
  Card,
  CardBody,
  
} from "reactstrap";

export default function Invitations_declined() {
  const [context] = useContext(Context);
  const declinedInvitations = context.declinedInvitations;

  return (
    <Container className="data">
      <NavInvites />
      <Col className="justify-content-center mt-4 mb-3">
      <h3 className="invite-header">
          Declined invitation
          {declinedInvitations.length > 1
            ? "s"
            : "" || declinedInvitations.length === 0
            ? "s"
            : ""}
        </h3>
      
          <Card className="mb-4">            
              <CardBody>
              {declinedInvitations.length > 0 ? (
        declinedInvitations.map((invite) => (
          <MyDeclinedInvite key={invite.id} {...invite}></MyDeclinedInvite>
        ))
      ) : (
        <h5 className="text-center">You dont have any declined invitations</h5>
      )}
                
              </CardBody>           
          </Card>
        </Col>      
    </Container>
  );
}
