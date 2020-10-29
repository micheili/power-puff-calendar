import React, { useState } from "react";
import { Alert, CardText, Row, Collapse, Button } from "reactstrap";

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
          <div key={event.id} className="pb-3">
            <Button
              className="text-info"
              color="secondary"
              onClick={toggle}
              style={{ marginBottom: "1rem" }}
            >
              {event.title}
            </Button>
            <Collapse isOpen={isOpen}>
              <Event combinedEvents={event}></Event>
            </Collapse>
          </div>
        ))}
      </div>
    </>
  );
}
