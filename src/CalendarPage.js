import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Infobox from "./components/InfoBox";
import { Context } from "./App";

export default function CalendarPage() {
  const [context, updateContext] = useContext(Context);
  console.log(context.myEvents);

  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12 mt-2" lg="8">
          {/*<CalenderView /> */}
        </Col>
        <Col sm="12 mt-2" lg="4">
          <Infobox
            myEvents={context.myEvents}
            invitedEvents={context.invitedEvents}
          />
        </Col>
      </Row>
    </Container>
  );
}
