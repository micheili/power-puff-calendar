import React from 'react';
import { Link } from "react-router-dom";
 

import { 
    Nav,
    NavItem,
    NavLink,
     }
    from 'reactstrap';

    export default function NavInvites (){
        return(
            <Nav className="navLinks justify-content-center">
            <NavItem className="navLinks">
                <NavLink className="navLinks" tag={Link} to={"/invitation"}  activeClassName="activeItem">New invitations</NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="navLinks" tag={Link} to={"/invitations_declined"} activeClassName="activeItem" >Declined invitations</NavLink>
            </NavItem>
        </Nav>

        )
    }
