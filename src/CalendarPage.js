import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Infobox from './components/InfoBox';

export default function CalendarPage() {
  
  const [events, setEvents] = useState([]);

  async function fetchEvents() {
    const events = (await (await fetch("api/event")).json());
    setEvents(events);
    console.log('har hämtat events ', events);
  }

  useEffect(() => {
    fetchEvents();
  }, []);
  
  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12 mt-2" lg="8">
          {/*<CalenderView /> */}
        </Col>
        <Col sm="12 mt-2" lg="4">
          <Infobox {...events} />
        </Col>
      </Row>
  </Container>
);

}