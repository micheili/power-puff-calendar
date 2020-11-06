import React, { useContext, useEffect, useState } from "react";
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
  Alert,
} from "reactstrap";

const Infobox = (props) => {
  const [context, updateContext] = useContext(Context);
  const [info, setInfo] = useState([]);
  let { myEvents, invitedEvents, selectDate } = props;

  const [funFactVisible, setVisible] = useState(true);
  const onDismissFunFact = () => setVisible(false);
  const onSeeFunFact = () => setVisible(true);

  const getdayInfo = async () => {
    const month = moment(selectDate).format("M") - 1;
    const day = moment(selectDate).format("D") - 1;    
    const dateQuery = `${month}` + `/` + `${day}`;

    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/http://history.muffinlabs.com/date/${dateQuery}`
    );
    const data = await response.json();
    setInfo(data.data.Events[0]);
  };

  useEffect(() => {
    getdayInfo();
    setVisible(true);
  }, [selectDate]);

  
  let date = moment(selectDate).format("DD/MM");
  let year = moment(selectDate).format("YYYY");

  const addNewEvent = () => {
    updateContext({ showNewEvent: true });
  };

  function getDates(startDate, stopDate) {
    let dates = [];
    //to avoid modifying the original date
    const theDate = new Date(startDate);
    while (theDate < new Date(stopDate)) {
      dates = [...dates, new Date(theDate)];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, new Date(stopDate)];
    return dates;
  }

  let combinedEvents = [...myEvents, ...invitedEvents];
  let filterCombinedEvents = [];

  for (let i in combinedEvents) {
    let startDate = moment(combinedEvents[i].start).format("YYYY-MM-DD");
    let stopDate = moment(combinedEvents[i].stop).format("YYYY-MM-DD");

    let dates = getDates(startDate, stopDate);
    for (let d in dates) {
      if (
        moment(dates[d]).format("YYYY-MM-DD") ===
        moment(selectDate).format("YYYY-MM-DD")
      ) {
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

          {funFactVisible ? null : (
            <a
              href="#"
              onClick={onSeeFunFact}
              className="text-dark font-weight-bolder link m-3"
              id="funFactShowText"
            >
              Show me fun fact of the day...
            </a>
          )}

          {context.showNewEvent != true && context.showEditEvent != true ? (
            <Alert
              className={`fun-btn ${context.colorTheme} m-3`}
              color="whitee"
              isOpen={funFactVisible}
              toggle={onDismissFunFact}
            >
              <Row>
                <Col className="fun-fact">Fun fact of the day: </Col>
              </Row>
              <Row>
                <Col className="my-2">
                  <span className="fun-fact">Year {info.year} : </span>{" "}
                  {info.text}
                </Col>{" "}
              </Row>
            </Alert>
          ) : null}

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
