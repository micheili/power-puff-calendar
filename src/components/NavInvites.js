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
                <NavLink active={true} className="navLinks" active tag={Link} to={"/invitation"}>New invitations</NavLink>
            </NavItem>
            <NavItem active>
                <NavLink active={true} className="navLinks" tag={Link} to={"/invitations_declined"} >Declined invitations</NavLink>
            </NavItem>
        </Nav>

        )
    }
