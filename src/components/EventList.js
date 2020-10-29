import React, { useState } from "react";
import {
  Alert,
  CardText,
  Row,
  Collapse,
  Button,
  UncontrolledCollapse,
  Card,
  CardBody,
} from "reactstrap";

import Event from "./Event";
/*eslint-disable*/
export default function EventList(props) {
  let { id, title } = props.combinedEvents;
  console.log("list page", props.combinedEvents);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-3 rounded">
        {props.combinedEvents.map((event) => (
          <div>
            <Button
              color="secondary"
              id={`my${event.id}`}
              style={{ marginBottom: "1rem" }}
            >
              {event.title}
            </Button>
            <UncontrolledCollapse toggler={`#my${event.id}`}>
              <Card>
                <CardBody>
                  <Event combinedEvents={event}></Event>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        ))}
      </div>
    </>
  );
}
