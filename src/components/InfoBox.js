import React from "react";
import Event from "./Event";
import EventList from "./EventList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  CardHeader,
  Card,
  CardText,
  CardBody,
  Button,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const Infobox = (props) => {
  props = [
    {
      id: "",
      eventTitle: "",
      eventDescription: "",
      start: "",
      ends: "",
      invitedGuests: "",
    },
  ];

  let events = props;
  let date = "Chosen Date/Today";

  let eventDetails = null;
  let eventList = null;
  let defaultText = null;

  //visa detaljvy om bara ett event finns vald dag
  if (events === 1) {
    eventDetails = <Event key={events.id} {...events} />;
  } //ifall det finns flera event
  else if (events.val > 1) {
    //skapa en komponent för att visa en lista
    //info för alla events eller id?
    eventList = events.map((event) => <EventList key={event.id} {...event} />);
  } else {
    defaultText = (
      <CardText>
        You have no events this day! Do you want to{" "}
        <span style={{ textDecoration: "underline", color: "black" }} href="#">
          add a new event?
        </span>
      </CardText>
    );
  }

  //kanske formattera om date -> 10/7
  let dateText = <div className="float-left">{date}</div>;

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader className="bg-secondary">
            <div className="float-left">{date}</div>
            <div>
              <span href="#" id="addEventHover">
                <Button className="float-right" color="primary">
                  <FontAwesomeIcon
                    className="sidebar-icon mr-1"
                    id="addEventPlus"
                    icon={faPlus}
                  />
                  <UncontrolledTooltip placement="right" target="addEventHover">
                    Add new event
                  </UncontrolledTooltip>
                </Button>{" "}
              </span>
            </div>
          </CardHeader>

          <CardBody>
            {/* ETT event, event-komponent */}
            {eventDetails}
            {/* en lista på olika events */}
            {eventList}
            {/* om det inte finns några events på vald dag */}
            {defaultText}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Infobox;
