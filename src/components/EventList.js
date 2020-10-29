import React, { useState } from "react";
import { Alert, CardText, Row, Collapse, Button } from "reactstrap";

import Event from "./Event";
/*eslint-disable*/
export default function EventList(props) {
  console.log("list page", props.myEvents);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* {props.myEvents.map((event) => (
        <>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls={event.id}
            aria-expanded={open}
          >
            click
          </Button>
          <Collapse in={open}>
            <div id={event.id}>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </div>
          </Collapse>
        </>
      ))} */}

      <div className="rounded">
        {props.myEvents.map((event) => (
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
              <Event myEvent={event}></Event>
            </Collapse>
          </div>
        ))}
      </div>
      <div className="rounded">
        <div>Invited events</div>
        {props.invitedEvents.map((event) => (
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
    </>
  );
}
