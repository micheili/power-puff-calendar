import React from "react";
import {
  Alert,
  CardText,
  Row,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";
/*eslint-disable*/
export default function EventList(props) {
  console.log("list page", props.myEvents);
  return (
    <>
      {/* <CardText>
        <h3 className="bg-danger">My events:</h3>
        {props.myEvents.map((event) => (
          <Alert key={event.id}>{event.title}</Alert>
        ))}
      </CardText>
      <CardText>
        <h3 className="bg-danger">I am invited for:</h3>
        {props.invitedEvents.map((event) => (
          <Alert key={event.id}>{event.title}</Alert>
        ))}
      </CardText> */}
      <div className="p-3 bg-success my-2 rounded">
        <Toast>
          <ToastHeader>My events:</ToastHeader>
          <ToastBody>
            {props.myEvents.map((event) => (
              <Alert  key={event.id}>{event.title}</Alert>
            ))}
          </ToastBody>
        </Toast>
      </div>
      <div className="p-3 bg-warning my-2 rounded">
        <Toast>
          <ToastHeader>I am invited for:</ToastHeader>
          <ToastBody>
            {props.invitedEvents.map((event) => (
              <Alert color="warning" key={event.id}>
                {event.title}
              </Alert>
            ))}
          </ToastBody>
        </Toast>
      </div>
    </>
  );
}
