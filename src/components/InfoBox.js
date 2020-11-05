import React, { useContext, useState, useEffect } from "react";
import Event from "./Event";
import EventList from "./EventList";
import NewEvent from "./NewEvent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../App";
import moment from "moment";


import {
  CardHeader,
  Card,
  CardText,
  CardBody,
  Row,
  Col,
  UncontrolledTooltip,
  Container,
} from "reactstrap";

const Infobox = (props) => {
  const [context, updateContext] = useContext(Context);
  const [info, setInfo] = useState([]);
  let { myEvents, invitedEvents, selectDate } = props;

  const getdayInfo = async () => {
    const month = moment(selectDate).format("M") - 1;
    const day = moment(selectDate).format("D") - 1;
    const dateQuery = `${month}/${day}`;

    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/http://history.muffinlabs.com/date/${dateQuery}`
    );
    const data = await response.json();
    setInfo(data.data.Events[0]);
    console.log("data from api", data);
  };

  useEffect(() => {
    getdayInfo();
  }, [selectDate]);

  console.log(info.text);

  let date = moment(selectDate).format("DD/MM");
  let year = moment(selectDate).format("YYYY");

  const addNewEvent = () => {
    updateContext({ showNewEvent: true });
  };
  function getDates(startDate, stopDate) {
    let dateArray = [];
    let currentDate = moment(startDate);
    let endDate = moment(stopDate);
    while (currentDate <= endDate) {
      dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
      currentDate = moment(currentDate).add(1, "days");
    }
    return dateArray;
  }
  // let dates = getDates("2020-11-04 12:36", "2020-11-04 12:38");
  // console.log("dates", dates);

  let combinedEvents = [...myEvents, ...invitedEvents];
  let filterCombinedEvents = [];

  for (let i in combinedEvents) {
    let dates = getDates(combinedEvents[i].start, combinedEvents[i].stop);
    for (let d in dates) {
      if (dates[d] === moment(selectDate).format("YYYY-MM-DD")) {
        filterCombinedEvents.push(combinedEvents[i]);
      }
    }
  }

  combinedEvents = filterCombinedEvents;

  let eventDetails = (
    <>
      <CardHeader className={`single-event ${context.colorTheme}`} tag="h3">
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
          <CardHeader className={`bg-info ${context.colorTheme}`}>
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

          {context.showNewEvent !== true && context.showEditEvent !== true ? (
            <Alert
              className="container-fun-fact mt-3"
              color="whitee"
              isOpen={funFactVisible}
              toggle={onDismissFunFact}
            >
              <Row>
                <Col className="fun-fact">Fun fact about today: </Col>
              </Row>
              <Row>
                <Col className="mb-2">
                  <span className="fun-fact">Year {info.year} : </span>{" "}
                  {info.text}
                </Col>{" "}
              </Row>
            </Alert>
          ) : null}

          <CardBody>
            {context.showNewEvent != true && context.showEditEvent != true ? (
              <Container className="container-fun-fact">
                <Row>
                  <Col className="fun-fact">Fun fact about today: </Col>
                </Row>
                <Row>
                  <Col className="mb-2">{info.text}</Col>
                </Row>
              </Container>
            ) : null}

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
