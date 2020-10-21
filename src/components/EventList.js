import React from "react";
import { Alert } from "reactstrap";

export default function EventList(props) {

  props.map(event => {
    return (
      <Alert color="primary">{event.title}</Alert>
    )
  });

}
