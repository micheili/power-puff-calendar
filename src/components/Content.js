import React from "react";
import classNames from "classnames";
import { Container, Row } from "reactstrap";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CalendarMonth from "../calendar/CalendarMonth";
import CalendarWeek from "../calendar/CalendarWeek";
import CalendarDay from "../calendar/CalendarDay";
import Invitation from "./Invitation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import { Button } from "reactstrap";
//import { Context } from "../App";

export default function Content({ sidebarIsOpen, toggleSidebar, logout }) {
  //const [context, updateContext] = useContext(Context);

  return (
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
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
        </Button>
      </Row>

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/calendar" component={CalendarView} />
        <Route exact path="/calendarweek" component={CalendarWeek} />
        <Route exact path="/calendarday" component={CalendarDay} />
        <Route exact path="/invitation" component={Invitation} />
      </Switch>
    </Container>
  );
}
