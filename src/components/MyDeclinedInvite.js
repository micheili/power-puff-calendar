import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Collapse,
} from "reactstrap";

export default function MyDeclinedInvite(props) {
  let {
    title,
    description,
    start,
    stop,
    ownerFirstName,
    ownerLastName,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="mt-4">
      <Button
        className="text-white"
        color="danger"
        onClick={toggle}
        style={{ marginBottom: "1rem" }}
      >
        {ownerFirstName} {ownerLastName} had sent you an invitation
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
              placeholder="going"
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

          <hr></hr>
        </Form>
      </Collapse>
    </div>
  );
}
