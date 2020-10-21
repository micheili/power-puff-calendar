import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Infobox from './components/InfoBox';
import CalenderView from './calendar/CalendarView'

export default function CalendarPage() {
  
  return (
    <Container>
      <Row>
        <Col sm="12" lg="8">
          <CalenderView /> 
        </Col>
        <Col sm="12" lg="4">
          <Infobox />
        </Col>
      </Row>
  </Container>
);

}