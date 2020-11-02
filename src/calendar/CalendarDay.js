import React, { useState, useContext } from "react";
import moment from "moment";
import GoToCalendarButtons from "./GoToCalendarButtons";
import DateDayIndicator from "./indicators/DateDayIndicator";
import DayIndicator from "./indicators/DayIndicator";
import { getReadableWeekday } from "./utils/MomentUtils";
import { Context } from "../App";
import Infobox from "../components/InfoBox";
import { Container, Row, Col } from "reactstrap";
import "../sass/_calendar.scss";

export default function CalendarDay() {
  const [context] = useContext(Context);
  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <Container fluid={true}>
      <Row>
        <Col className="mb-5" sm="12" lg="8">
          <div className="container">
            <GoToCalendarButtons />
            <DayIndicator
              selectDate={selectDate}
              setSelectDate={setSelectDate}
            />
            <div className="calendar-container">
              <div className="weekday-indicator">
                {getReadableWeekday(selectDate)}
              </div>

              <DateDayIndicator
                selectDate={selectDate}
                setSelectDate={setSelectDate}
              />
            </div>
          </div>
        </Col>
        <Col sm="12" lg="4">
          <Infobox
            myEvents={context.myEvents}
            invitedEvents={context.invitedEvents}
            selectDate={selectDate}
            setSelectDate={setSelectDate}
          />
        </Col>
      </Row>
    </Container>
  );
}
