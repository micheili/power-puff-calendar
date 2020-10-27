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
  let { name } = prop;

  const [context] = useContext(Context);

  const userId = context.user.id;
  const allInvites = context.allInvites;

  console.log("this is the currentuserID" + userId);

  //   async function fetchInvitations() {
  //     //if(!userId){return;}
  //     setInvitations(
  //       await (await fetch(`api/invitedEvents/${userId}?accepted=null`)).json()
  //     );
  //   }

  //   const [allInvites, setInvitations] = useState([]);
  //   console.log("invitation", allInvites);

  console.log("allInvites", allInvites);

  //   useEffect(() => {
  //     fetchInvitations();
  //   }, [userId]);

  const [InvitationCardComponent, toggleVisibility] = useVisibilityToggler(
    <CardBody>
      <hr></hr>
      {allInvites.length > 0 ? (
        allInvites.map((invite) => (
          <MyInvite key={invite.id} {...invite}></MyInvite>
        ))
      ) : (
        <div>You don't have any invites</div>
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
            <CardBody>
              <CardTitle className="font-weight-bold d-flex">
                {" "}
                has sent you an invitation
              </CardTitle>
              <Button color="primary" onClick={toggleVisibility}>
                {" "}
                Read more{" "}
              </Button>
            </CardBody>
            {InvitationCardComponent}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
