import React, { useState, useContext, useEffect } from "react";
import WeekdayIndicator from "./indicators/WeekdayIndicator";
import DateIndicator from "./indicators/DateIndicator";
import MonthIndicator from "./indicators/MonthIndicator";
import GoToCalendarButtons from "./GoToCalendarButtons";
import moment from "moment";
import { Context } from "../App";
import Infobox from "../components/InfoBox";
import { Container, Row, Col } from "reactstrap";
import "../sass/_calendar.scss";

export default function CalendarMonth() {
  const [context] = useContext(Context);
  const [selectDate, setSelectDate] = useState(moment().toDate());
  

  return (
    <Container fluid={true}>
      <Row>
        <Col className="month-container mb-5" sm="12" lg="8">
          <div className="container month-container">
            <GoToCalendarButtons />
            <MonthIndicator
              selectDate={selectDate}
              setSelectDate={setSelectDate}
            />
            <div className={`calendar-container ${context.colorTheme}`}>
              <WeekdayIndicator />
              <DateIndicator
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
