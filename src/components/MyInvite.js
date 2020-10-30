import React, { useEffect, useState, useContext } from "react";

import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse,
  ListGroup,
} from "reactstrap";
import { Context } from "../App";

export default function MyInvite(props) {
  let {
    id,
    inviteId,
    title,
    description,
    start,
    stop,
    ownerFirstName,
    ownerLastName,
  } = props;
  const [context, updateContext] = useContext(Context);

  const [allGuests, setInvitedUsers] = useState([]);
  const [allGuestsAccept, setInvitedUsersAccept] = useState([]);
  const [allGuestsDecline, setInvitedUsersDecline] = useState([]);

  async function fetchInvitedUsers() {
    setInvitedUsers(
      await (await fetch("api/invitedUsers/" + id + "?accepted=null")).json()
    );
  }

  async function fetchInvitedUsersAccepted() {
    setInvitedUsersAccept(
      await (await fetch("api/invitedUsers/" + id + "?accepted=1")).json()
    );
  }

  async function fetchInvitedUsersDecline() {
    setInvitedUsersDecline(
      await (await fetch("api/invitedUsers/" + id + "?accepted=0")).json()
    );
  }

  useEffect(() => {
    fetchInvitedUsers();
  }, []);

  useEffect(() => {
    fetchInvitedUsersAccepted();
  }, []);

  useEffect(() => {
    fetchInvitedUsersDecline();
  }, []);

  async function Decline() {
    let result = await (
      await fetch("/api/invite/" + inviteId, {
        method: "PUT",
        body: JSON.stringify({
          accepted: 0,
        }),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    fetchEvents();
    //window.location.reload();
  }

  async function Accept() {
    let result = await (
      await fetch("/api/invite/" + inviteId, {
        method: "PUT",
        body: JSON.stringify({
          accepted: 1,
        }),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    fetchEvents();
    //window.location.reload();
  }

  async function fetchEvents() {
    let allInvites = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=null")
    ).json();
    if (allInvites.error) {
      allInvites = [];
    }

    let invitedEvents = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=true")
    ).json();
    if (invitedEvents.error) {
      invitedEvents = [];
    }

    let declinedInvitations = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=false")
    ).json();
    if (declinedInvitations.error) {
      declinedInvitations = [];
    }

    updateContext({
      allInvites: allInvites,
      invitedEvents: invitedEvents,
      declinedInvitations: declinedInvitations,
    });
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="mt-4">
        <Button
          className="text-white w-100 text-left"
          color="info"
          onClick={toggle}
          style={{ marginBottom: "1rem" }}
        >
          {ownerFirstName} {ownerLastName} has sent you an invitation
        </Button>
        <Collapse isOpen={isOpen} className="invite-card-body">
          <Form className="p-3 my-2 rounded bg-docs-transparent-grid">
            <h3>{title}</h3>
            <FormGroup>
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
                <h5>Invited</h5>
                {allGuests.map((guest) => (
                  <p key={guest.id}>
                    {guest.firstName} {guest.lastName},
                  </p>
                ))}
              </ListGroup>
              <ListGroup>
                <h5>Going</h5>
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
              <ListGroup>
                <h5>Declined</h5>
                {allGuestsDecline.length > 0 ? (
                  allGuestsDecline.map((guestDecline) => (
                    <p key={guestDecline.id}>
                      {guestDecline.firstName} {guestDecline.lastName},
                    </p>
                  ))
                ) : (
                  <p>No one has declined yet</p>
                )}
              </ListGroup>
            </FormGroup>
            <Label>Start:</Label>
            <Row>
              <Col xs="12" lg="12">
                <FormGroup xs="12" lg="12">
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
                <FormGroup xs="12" lg="12">
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
            <hr></hr>
            <Row>
              <Button onClick={Decline} color="danger" className="ml-2">
                No, cant make it
              </Button>
              <Button onClick={Accept} color="primary" className="ml-2">
                Yes, count me in!
              </Button>
            </Row>
            
          </Form>
        </Collapse>
      </div>
    </>
  );
}
