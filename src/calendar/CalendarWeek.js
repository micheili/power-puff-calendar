import React, { useState, useContext } from 'react';
import moment from "moment";
import WeekdayIndicator from './indicators/WeekdayIndicator';
import DateWeekIndicator from './indicators/DateWeekIndicator';
import GoToCalendarButtons from './GoToCalendarButtons';
import WeekIndicator from './indicators/WeekIndicator';
import { Context } from "../App";
import Infobox from "../components/InfoBox";
import { Container, Row, Col } from "reactstrap";
import '../sass/_calendar.scss';


export default function CalendarWeek() {

  const [context, updateContext] = useContext(Context);
  const [selectDate, setSelectDate] = useState(moment().toDate());

  return (
    <Container fluid={true}>
    <Row>
      <Col className="mb-5" sm="12" lg="8">
    <div className="container">
      <GoToCalendarButtons />
      <WeekIndicator
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />

      <div className="calendar-container">
        <WeekdayIndicator />

        <DateWeekIndicator
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