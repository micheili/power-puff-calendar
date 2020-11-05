import React, { useContext } from "react";
import MyInvite from "./MyInvite";
import NavInvites from "./NavInvites";
import { Context } from "../App";

import {
  Container,
  Col,
  Card,
  CardBody,
 
} from "reactstrap";

export default function Invitation() {

  const [context] = useContext(Context);

 
  const allInvites = context.allInvites;

  
  return (
    <Container className="data">
      <NavInvites />
      <Col className="justify-content-center mt-4">
        <h3 className={`invite-header ${context.colorTheme}`}>
          {allInvites.length} New invitation
          {allInvites.length > 1
            ? "s"
            : "" || allInvites.length === 0
            ? "s"
            : ""}
        </h3>      
          <Card className="mb-4">            
              <CardBody>             
                {allInvites.length > 0 ? (
                  allInvites.map((invite) => (
                    <MyInvite key={invite.id} {...invite}></MyInvite>
                  ))
                ) : (
                  <h5 className="text-center">You dont have any invites</h5>
                )}
              </CardBody>
          </Card>
        </Col>      
    </Container>
  );
}
