import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CalendarView from "../calendar/CalendarView";
import Invitation from "./Invitation";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons";

import {
    Button    
  } from "reactstrap";


const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
   <Button className="toogleSidebarButton" onClick={toggleSidebar}>
   <FontAwesomeIcon  className="icon" icon={faBars} />
    </Button>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/calendar" component={CalendarView} />
      <Route exact path="/invitation" component={Invitation} />
    </Switch>
  </Container>
);

export default Content;
