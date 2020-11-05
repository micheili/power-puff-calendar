import React, { useContext, useState, useEffect } from "react";
import Event from "./Event";
import EventList from "./EventList";
import NewEvent from "./NewEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../App";
import { getMonthDay, getDayOfMonth } from "../calendar/utils/MomentUtils";
import moment from "moment";
import { CardTitle } from "reactstrap";

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
  const [info, setInfo] = useState({});
  let { myEvents, invitedEvents, selectDate } = props;

  const getdayInfo = async() =>{
  const dateQuery = moment(selectDate).format("M/D")
    const response = await fetch
    (`https://cors-anywhere.herokuapp.com/http://history.muffinlabs.com/date/${dateQuery}`);
    const data = await response.json();
    setInfo(data);
    console.log('data from api', data);
  };

  useEffect(()=>{
    getdayInfo();
  }, [selectDate]);

  let ev = {info};
  console.log('the day', info.date, 'info', info.data)
  console.log({ev});

  let date = moment(selectDate).format("DD/MM");
  let year = moment(selectDate).format("YYYY");

  const addNewEvent = () => {
    updateContext({ showNewEvent: true });
  };

  let combinedEvents = [...myEvents, ...invitedEvents];
  let filterCombinedEvents = combinedEvents.filter(
    (t) =>
      moment(t.start).format("YYYY-MM-DD") ===
      moment(selectDate).format("YYYY-MM-DD")
  );
  combinedEvents = filterCombinedEvents;

  let eventDetails = (
    <>
      <CardHeader className="single-event" tag="h3">
        {combinedEvents.length ? combinedEvents[0].title : ""}
      </CardHeader>
      <Event combinedEvents={combinedEvents[0]} />
    </>
  );
  let eventList = <EventList combinedEvents={combinedEvents} />;
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

          <Row>
         
           
          </Row>

          <CardBody>
            {context.showNewEvent ? (
              <NewEvent showNewEvent />
            ) : combinedEvents.length === 0 ? (
              defaultText
            ) : combinedEvents.length === 1 ? (
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
