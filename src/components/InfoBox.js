import React, { useContext } from "react";
import Event from "./Event";
import EventList from "./EventList";
import NewEvent from "./NewEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../App";
import {
  CardHeader,
  Card,
  CardText,
  CardBody,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

const Infobox = (props) => {

  const [context, updateContext] = useContext(Context);

  let { myEvents, acceptedEvents } = props;
  let combined = { ...myEvents, ...acceptedEvents };
  let eventDetails;

  if (combined.length === 1) {
    eventDetails = (
      <Event oneEvent={combined[0]} />
    );
  }

  let date = "22/10";
  let year = "2020";

  const addNewEvent = () => {
    updateContext({ showNewEvent: true });
  };

   
  let eventList = (
    <EventList myEvents={myEvents} acceptedEvents={acceptedEvents} />
  );
  let defaultText = (
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
            {context.showNewEvent ? (
              <NewEvent showNewEvent />
            ) : myEvents.length === 0 ? (
              defaultText
            ) : myEvents.length === 1 ? (
              eventDetails
            ) : (
              eventList
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Infobox;
