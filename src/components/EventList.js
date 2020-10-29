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
  UncontrolledCollapse
} from "reactstrap";

import Event from "./Event";
/*eslint-disable*/
export default function EventList(props) {
  let { id, title } = props.combinedEvents;

  const [isOpen, setIsOpen] = useState(false);

  //const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="p-3 rounded">
        {props.combinedEvents.map((event) => (
          <div key={event.id} className="pb-3">
            <Button              
              color="secondary"
              id={`my${event.id}`}
              className="w-100 eventList-Button"              
              style={{ marginBottom: "1rem" }}
            >
              {event.title}
            </Button>
            <UncontrolledCollapse toggler={`#my${event.id}`}>
              <Event combinedEvents={event} ></Event>
            </UncontrolledCollapse>
          </div>
        ))}
      </div>
    </>
  );
}
