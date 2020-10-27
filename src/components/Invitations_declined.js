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
        <h3>
          Declined invitation
          {allInvites.length > 1
            ? "s"
            : "" || allInvites.length === 0
            ? "s"
            : ""}
        </h3>
      </Row>
      <Row>
        <Col>
          <Card className="mb-4">
            {allInvites.length > 0 ? (
              <CardBody>
                <CardTitle className="font-weight-bold d-flex">
                  {allInvites.map((invite) => (
                    <p key={invite.id}>
                      {invite.userId}
                      has sent you an invitation
                    </p>
                  ))}
                </CardTitle>
                <Button color="primary" onClick={toggleVisibility}>
                  {" "}
                  Read more{" "}
                </Button>
                {InvitationCardComponent}
              </CardBody>
            ) : (
              <div></div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
