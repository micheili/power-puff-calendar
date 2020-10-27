import React, { useContext, useState, useEffect } from "react";
import NavInvites from "./NavInvites";
import MyDeclinedInvite from "./MyDeclinedInvite";
import useVisibilityToggler from "../hooks/useVisibilityToggler";
import { Context } from "../App";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardTitle,
} from "reactstrap";

export default function Invitations_declined() {
  const [context] = useContext(Context);

  const userId = context.user.id;
  const declinedInvitations = context.declinedInvitations;

  //   async function fetchInvitations() {
  //     if (!userId) {
  //       return;
  //     }
  //     setInvitations(
  //       await (await fetch(`api/invitedEvents/${userId}?accepted=false`)).json()
  //     );
  //   }

  //   const [allInvites, setInvitations] = useState([]);

  //   useEffect(() => {
  //     fetchInvitations();
  //   }, [userId]);

  const [InvitationCardComponent, toggleVisibility] = useVisibilityToggler(
    <CardBody>
      <hr></hr>
      {declinedInvitations.length > 0 ? (
        declinedInvitations.map((invite) => (
          <MyDeclinedInvite key={invite.id} {...invite}></MyDeclinedInvite>
        ))
      ) : (
        <div>You d</div>
      )}
    </CardBody>,
    true
  );

  return (
    <Container className="data">
      <NavInvites />
      <Row className="justify-content-center mt-4 mb-3">
        <h3>Declined invitations</h3>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardBody>
              <CardTitle className="font-weight-bold d-flex">
                {" "}
                has sent you an invitation
              </CardTitle>
              <Button color="primary" onClick={toggleVisibility}>
                Read more
              </Button>
              {InvitationCardComponent}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
