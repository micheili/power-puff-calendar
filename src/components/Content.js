import React, { useContext } from "react";
import classNames from "classnames";
import { Container, Row } from "reactstrap";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import ProtectedRoute from '../ProtectedRoute';
import Login from "./Login";
import Register from "./Register";
import CalendarMonth from "../calendar/CalendarMonth";
import CalendarWeek from "../calendar/CalendarWeek";
import CalendarDay from "../calendar/CalendarDay";
import Invitation from "./Invitation";
import CalendarPage from "../CalendarPage";
import Invitations_declined from "./Invitations_declined";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { Button } from "reactstrap";
import { Context } from "../App";

export default function Content({ sidebarIsOpen, toggleSidebar, logout }) {
  const [context, updateContext] = useContext(Context);

 
  return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      
        {context.user ? (
        <Row className="justify-content-between mb-3">
        <Button className="toogleSidebarButton ml-4" onClick={toggleSidebar}>
          <FontAwesomeIcon className="icon" icon={faBars} />
        </Button>
          <Button
            tag={Link}
            to="/"
            color="info"
            className="text-light"
            onClick={logout}
          >
            <div className="mt-2">
              <FontAwesomeIcon className="mr-2" icon={faSignOutAlt} />
              Logout
            </div>
          </Button></Row>
        ) : (
          <></>
        )}
      
      
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/calendar" user={context.user}  component={CalendarMonth} />
        <ProtectedRoute exact path="/calendarweek" user={context.user} component={CalendarWeek} />
        <ProtectedRoute exact path="/calendarday" user={context.user} component={CalendarDay} />
        <ProtectedRoute exact path="/invitation" user={context.user} component={Invitation} />
        <ProtectedRoute exact path="/home" user={context.user} component={CalendarPage}/>        
        <ProtectedRoute exact path="/invitations_declined" user={context.user} component={Invitations_declined}/>
      </Switch>
    </Container>
  );
}
