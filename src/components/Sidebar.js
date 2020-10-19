import React from "react";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";


const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>    
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p>Welcome Blossom!</p>
        <NavItem>
          <NavLink tag={Link} to={"/"}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/register"}>
            Register
          </NavLink>
        </NavItem>        
        <NavItem>
          <NavLink tag={Link} to={"/calendar"}>
            Calendar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/invitation"}>
            Invitation
          </NavLink>
        </NavItem>       
      </Nav>
    </div>
  </div>
);



export default SideBar;