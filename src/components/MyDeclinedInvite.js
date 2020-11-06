import React, { useState,useEffect,useContext } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse,
  ListGroup
} from "reactstrap";

import { Context } from "../App";

export default function MyDeclinedInvite(props) {
  let {
    id,
    title,
    description,
    start,
    stop,
    ownerFirstName,
    ownerLastName,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [allGuestsAccept, setInvitedUsersAccept] = useState([]);
  const [context, updateContext] = useContext(Context);

  const toggle = () => setIsOpen(!isOpen);

  async function fetchInvitedUsersAccepted() {
    setInvitedUsersAccept(
      await (await fetch("api/invitedUsers/" + id + "?accepted=1")).json()
    );
  }


  useEffect(() => {
    fetchInvitedUsersAccepted();
  }, []);

  async function fetchEvents() {
    let invitedEvents = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=true")
    ).json();
    if (invitedEvents.error) {
      invitedEvents = [];
    }


    updateContext({
      invitedEvents: invitedEvents
    });
  }

  return (
    <div className="mt-4">
      <Button
        className={`invit-btn ${context.colorTheme} text-white w-100 text-left`}
        color="info"
        onClick={toggle}
        style={{ marginBottom: "1rem" }}
      >
        {ownerFirstName} {ownerLastName} sent you an invitation
      </Button>
      <Collapse isOpen={isOpen} className="invite-card-body">
        <Form className="mb-2 rounded bg-docs-transparent-grid">
          <h3>{title}</h3>
          <FormGroup className={`invit-form ${context.colorTheme}`}>
            <Label for="eventDescription"></Label>
            <Input
              type="textarea"
              name="description"
              id="eventDescription"
              disabled
              placeholder={description}
            />
          </FormGroup>
          <FormGroup>
          <ListGroup>
          <h5>These have accepted the event</h5>
                {allGuestsAccept.length > 0 ? (
                  allGuestsAccept.map((guestAccept) => (
                    <p key={guestAccept.id}>
                      {guestAccept.firstName} {guestAccept.lastName},
                    </p>
                  ))
                ) : (
                  <p>No one has accepted yet</p>
                )}
              </ListGroup>
          </FormGroup>
          <Label>Start:</Label>
          <Row>
            <Col xs="12" lg="12">
              <FormGroup xs="12" lg="12" className={`invit-form ${context.colorTheme}`}>
                <Input
                  type="text"
                  name="startTime"
                  id="eventStartTime"
                  placeholder={start}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col xs="12" lg="12">
              <Label>End:</Label>
              <FormGroup xs="12" lg="12" className={`invit-form ${context.colorTheme}`}>
                <Input
                  type="text"
                  name="stopTime"
                  id="eventEndTime"
                  placeholder={stop}
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Collapse>
    </div>
  );
}
