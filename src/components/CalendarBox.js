import React from "react";
import {
    Col, Container,
    Row
} from 'reactstrap';
import CalendarMonth from '../calendar/CalendarMonth';
import NewEvent from './NewEvent'




const CalendarBox = (props) => {
    
        return(
            
            <Container>   
                <Row>
                    <Col xs="12" lg="8">
                        <CalendarMonth/>
                    </Col>
                    <Col xs="12" lg="4">
                        <NewEvent></NewEvent>
                    </Col>
                 </Row>   
            </Container>        
        );      
}

export default CalendarBox;