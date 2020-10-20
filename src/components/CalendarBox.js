import React from "react";
import CalendarMonth from '../calendar/CalendarMonth';
import newEvent from './newEvent';

import { 
    Container,
    Row, 
    Col    
     }
    from 'reactstrap';



const CalendarBox = (props) => {
    
        return(
            <Container>                
                <Row>
                    <Col>
                        <CalendarMonth/>
                    </Col>
                    <Col>
                        <newEvent/>
                    </Col>
                 </Row>   
            </Container>        
        );      
}

export default CalendarBox;