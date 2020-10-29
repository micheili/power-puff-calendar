import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Infobox from "./components/InfoBox";
import { Context } from "./App";
import CalendarMonth from './calendar/CalendarMonth';

export default function CalendarPage() {
  const [context, updateContext] = useContext(Context);
 

  return (
    <Container fluid={true}>
      
       
          <CalendarMonth/>
     
      
      
    </Container>
  );
}
