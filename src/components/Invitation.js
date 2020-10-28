import React, { useContext, useState, useEffect } from "react";
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
} from "reactstrap";

export default function Invitation(prop) {


  const [context] = useContext(Context);

  const userId = context.user.id;
  const allInvites = context.allInvites;

  const [InvitationCardComponent, toggleVisibility] = useVisibilityToggler(
    <CardBody>
      <hr></hr>
      {allInvites.length > 0 ? (
        allInvites.map((invite) => (
          <MyInvite key={invite.id} {...invite}></MyInvite>
        ))
      ) : (
        <div>You dont have any invites</div>
      )}
    </CardBody>,
    true
  );
  return (
    <Container className="data">
      <NavInvites />
      <Row className="justify-content-center mt-4 mb-3">
        <h3>
          {allInvites.length} New invitation
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
                {/* <CardTitle className="font-weight-bold d-flex">
                  {allInvites.map((invite) => (
                    <p key={invite.id}>{invite.userId},</p>
                  ))}
                  has sent you an invitation
                </CardTitle> */}
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
