import React, {  useState }  from "react";
import Event from "./Event";
import EventList from "./EventList";
import NewEvent from "./NewEvent";
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
  // props = [
  //   {
  //     id: "",
  //     eventTitle: "",
  //     eventDescription: "",
  //     start: "",
  //     ends: "",
  //     invitedGuests: "",
  //   },
  // ];

  const [showNewEvent, setshowNewEvent] = useState(false);

  let { myEvents, invitedEvents } = props;
  let date = "22/10";
  let year = "2020";

  let eventDetails = null;
  let eventList = null;
  let defaultText = null;

  const addNewEvent = (e) => {
    setshowNewEvent(true);
  }


  //visa detaljvy om bara ett event finns vald dag

  if (myEvents.length === 1) {
    eventDetails = (
      <Event myEvent={myEvents[0]} invitedEvents={invitedEvents} />
    );
  } //ifall det finns flera event
  else if (myEvents.length > 1) {
    //skapa en komponent för att visa en lista
    //info för alla events eller id?
    eventList = <EventList myEvents={myEvents} invitedEvents={invitedEvents} />;
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

  
  //kanske formattera om date -> 10/7
  let dateText = (
    <div className="float-left" id="dateText">
      {date}
    </div>
  );

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader className="bg-info">
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
          {showNewEvent ? <NewEvent showNewEvent/> : myEvents.length === 0
              ? defaultText
              : myEvents.length === 1
              ? eventDetails
              : eventList}            
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Infobox;
