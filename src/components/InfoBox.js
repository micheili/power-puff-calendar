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

const Infobox = (events) => {

  //let events = props;
  //just for testing
  //should come from calendar
  //depending on chosen date
  let date = "22/10";
  let year = "2020";

  let eventDetails = null;
  let eventList = null;
  let defaultText = null;

  console.log("eventlist: " , events)
  console.log(events.events.length);

  if (events.events.length === 1) {
    //eventDetails = <Event key={events.id} {...events} />;
    console.log('ETT event');
  }
  else if (events.events.length > 1) {
    console.log('FLERA event');
    eventList = <EventList events />
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
