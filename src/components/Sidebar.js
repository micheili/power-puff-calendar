import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFemale, faCalendar, faInbox } from "@fortawesome/free-solid-svg-icons";


const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>    
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <h3>Welcome Blossom!</h3>
        <NavItem>
          <NavLink  tag={Link} to={"/"}>
          <FontAwesomeIcon  className="sidebar-icon mr-2" icon={faHome} />
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink  tag={Link} to={"/register"}>
          <FontAwesomeIcon  className="sidebar-icon mr-2" icon={faFemale} />
            Register
          </NavLink>
        </NavItem>        
        <NavItem>
          <NavLink  tag={Link} to={"/calendar"}>
          <FontAwesomeIcon  className="sidebar-icon mr-2" icon={faCalendar} />
            Calendar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink  tag={Link} to={"/invitation"}>
          <FontAwesomeIcon  className="sidebar-icon mr-2" icon={faInbox} />
            Invitation
          </NavLink>
        </NavItem>       
      </Nav>
    </div>
  </div>
);



export default SideBar;