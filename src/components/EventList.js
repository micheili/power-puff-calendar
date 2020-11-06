import React, {useContext} from "react";
import {  
  Button,
  UncontrolledCollapse
} from "reactstrap";
import { Context } from "../App";

import Event from "./Event";
/*eslint-disable*/
export default function EventList(props) {

  let { id, title } = props.combinedEvents;
  const [context] = useContext(Context);

  

  return (
    <>
      <div className="p-3 rounded">
        {props.combinedEvents.map((event) => (
          <div key={event.id} className="pb-3">
            <Button              
              color="secondary"
              id={`my${event.id}`}
              className={`w-100 eventList-Button ${context.colorTheme}`}              
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
