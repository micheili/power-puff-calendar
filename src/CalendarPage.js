import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Infobox from "./components/InfoBox";
import { Context } from "./App";
import CalendarMonth from './calendar/CalendarMonth';

export default function CalendarPage() {
  const [context, updateContext] = useContext(Context);
 

  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12" lg="8">
          <CalendarMonth/>
        </Col>
        <Col sm="12" lg="4">
          <Infobox
            myEvents={context.myEvents}
            invitedEvents={context.invitedEvents}
          />
        </Col>
      </Row>
    </Container>
  );
}
