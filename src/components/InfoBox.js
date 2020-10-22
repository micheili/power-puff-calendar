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
  let date = "22/10";
  let year = "2020";

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
        You have no events this day! <br></br>
        Do you want to{" "}
        <a
          href="#"
          onClick={addNewEvent}
          className="text-dark font-weight-bolder link"
        >
          add a new event?
        </a>
      </CardText>
    );
  }

  function addNewEvent() {
    console.log("render add-new-event-form");
  }

  //kanske formattera om date -> 10/7
  let dateText = <div className="float-left" id="dateText">{date}</div>;

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader className="bg-secondary">
            {dateText}
            <div className="float-left ml-3" id="yearText">
              {year}
            </div>
            <div>
              <span id="addEventHover">
                <FontAwesomeIcon
                  className="sidebar-icon mr-1 float-right link"
                  id="addEventPlus"
                  icon={faPlus}
                  size="2x"
                  onClick={addNewEvent}
                />
              </span>
                <UncontrolledTooltip placement="right" target="addEventHover">
                  Add new event
                </UncontrolledTooltip>
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
