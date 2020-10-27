import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router-dom";

import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse,
  ToastBody,
  ToastHeader,
  Toast,
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

  const [allGuests, setGuests] = useState([]);

  async function fetchGuests() {
    setGuests(await (await fetch("/invitedUsers/" + id)).json());
  }

  console.log("all guests", allGuests);

  useEffect(() => {
    fetchGuests();
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
    console.log("result and id ", result, inviteId);
    fetchPendingEvents();
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
    console.log("result and id ", result, inviteId);
    fetchPendingEvents();
    //window.location.reload();
  }

  async function fetchPendingEvents() {
    let allInvites = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=null")
    ).json();
    if (allInvites.error) {
      allInvites = [];
    }
    updateContext({ allInvites: allInvites });
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="mt-4">
        <Button
          className="text-white"
          color="danger"
          onClick={toggle}
          style={{ marginBottom: "1rem" }}
        >
          {ownerFirstName} {ownerLastName} has sent you an invitation
        </Button>
        <Collapse isOpen={isOpen}>
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
              <Label for="eventUserId">{}</Label>
              <Input
                type="text"
                name="userId"
                id="eventUserId"
                placeholder={
                  allGuests.length > 0 ? "nrofguests" : "No one is coming"
                }
                disabled
              />
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
            <Row>
              <Button onClick={Decline} color="danger" className="ml-2">
                No, cant make it
              </Button>
              <Button onClick={Accept} color="primary" className="ml-2">
                Yes, count me in!
              </Button>
            </Row>
            <hr></hr>
          </Form>
        </Collapse>
      </div>

      {/* <div className="p-3 my-2 rounded bg-docs-transparent-grid">
            <Toast>
              <ToastHeader>{title}</ToastHeader>
              <ToastBody>{description}</ToastBody>
              <ToastBody>starts: {start}</ToastBody>
              <ToastBody>ends: {stop}</ToastBody>
              <ToastBody>
                {allGuests.length > 0 ? "nrofguests" : "No one is coming"}
              </ToastBody>
              <Button onClick={Decline} color="danger" className="ml-2">
                No, cant make it
              </Button>
              <Button onClick={Accept} color="primary" className="ml-2">
                Yes, count me in!
              </Button>
            </Toast>
          </div> */}
    </>
  );
}
