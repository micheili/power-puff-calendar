import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Infobox from './components/InfoBox';

export default function CalendarPage() {
  
  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12 mt-2" lg="8">
          {/*<CalenderView /> */}
        </Col>
        <Col sm="12 mt-2" lg="4">
          <Infobox />
        </Col>
      </Row>
  </Container>
);

}