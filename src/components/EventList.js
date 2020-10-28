import React, { useState } from "react";
import {
  Alert,
  CardText,
  Row,
  Toast,
  ToastBody,
  ToastHeader,
  Collapse,
  Button,
} from "reactstrap";

import Event from "./Event";
/*eslint-disable*/
export default function EventList(props) {
  console.log("list page", props.myEvents);

  const [isOpen, setIsOpen] = useState(false);

  //const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="p-3 rounded">
        {props.myEvents.map((event) => (
          <div key={event.id} className="pb-3">
            <Button
              className="text-info"
              color="secondary"
              onClick={() => setIsOpen(!isOpen)}
              style={{ marginBottom: "1rem" }}
            >
              {event.title}
            </Button>
            <Collapse isOpen={isOpen}>
              <Event myEvent={event}></Event>
            </Collapse>
          </div>
        ))}
      </div>
      {/* <div className="p-3 my-2 rounded">
        <div>Invited events</div>
        {props.invitedEvents.map((event) => (
          <div key={event.id} className="mb-3 pb-3">
            <Button
              className="text-white"
              color="danger"
              onClick={() => setIsOpen(!isOpen)}
              style={{ marginBottom: "1rem" }}
            >
              {event.title}
            </Button>
            <Collapse isOpen={isOpen}>
              <Event myEvent={event}></Event>
            </Collapse>
          </div>
        ))}
      </div> */}
    </>
  );
}
