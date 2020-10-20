import React from "react";

import {     
    Button, Form, FormGroup, Label, Input, FormText    
     }
    from 'reactstrap';

    const newEvent = (props) => {
        return(                
                 <Form>
                     <h1>Heloj</h1>    
                <FormGroup>
                    <Label for="eventTitle">Title</Label>
                    <Input type="text"/>
                </FormGroup>
                <FormGroup>                    
                    <Label for="exampleDate">Date</Label>
                    <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"/>                
                    <Label for="exampleTime">Time</Label>
                    <Input
                    type="time"
                    name="time"
                    id="exampleTime"
                    placeholder="time placeholder"
                    />
                </FormGroup>
            </Form>
                
        );      
}

export default newEvent;

