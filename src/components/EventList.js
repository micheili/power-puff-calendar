import React from "react";
import {  
  Button,
  UncontrolledCollapse
} from "reactstrap";

import Event from "./Event";
/*eslint-disable*/
export default function EventList(props) {

  let { id, title } = props.combinedEvents;


  

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
