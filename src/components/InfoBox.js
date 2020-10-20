import React from 'react';
import Event from './Event';
import EventList from './EventList';
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
 
const Infobox = (props, date) => {
  props = [{ 
    id: '',
    eventTitle: '',
    eventDescription: '',
    start: '',
    ends: '',
    invitedGuests: '',
  }];

  date = Date.today();
  let events = props;
  
  let eventDetails = null;
  let eventList = null;
  let defaultText = null;
 
    //visa detaljvy om bara ett event finns vald dag
  if (events === 1) {
    eventDetails = <Event key = {events.id} {...events} />
  } //ifall det finns flera event
  else if (events.val > 1) {
    //skapa en komponent för att visa en lista
    //info för alla events eller id? 
    eventList = events.map(event => (
      <EventList
        key={event.id} {...event} />
    ))
} else {
    defaultText = <CardText>You have no events this day!</CardText>
  }
 
  //kanske formattera om date -> 10/7
  let dateText = <div className="float-left">{date}</div>;
 
  return (
    <Row>
      <Col sm="6" lg="12">
        <Card>
          <CardHeader>
            {date}
            <div>
              <span href="#" id="addEventHover">
                <Button className="float-right" color="warning">
                  +
                  <UncontrolledTooltip placement="right" target="addEventHover">
                    Add new event
                  </UncontrolledTooltip>
                </Button>{" "}
              </span>
            </div>
          </CardHeader>
          {/* ETT event, event-komponent */}
          {eventDetails}
          {/* en lista på olika events */}
          {eventList}
          {/* om det inte finns några events på vald dag */}
          {defaultText}
          <CardBody>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
 
export default Infobox;