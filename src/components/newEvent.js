import React, { useState, useEffect } from 'react';
import moment from 'moment';

import {     
    Col, Row, Button, Form, FormGroup, Label, Input, FormText    
     }
    from 'reactstrap';

    

    const NewEvent = () => {

    const [formData, setFormData]= useState({});

        

        
        const handleInputChange = e => setFormData({
            ...formData,
            [e.currentTarget.name]: e.currentTarget.value
          });


          
          let { title, description,   userId = 1 } = formData;

          async function save(e) {
            // the default behavior of a form submit is to reload the page
            // stop that - we are not barbarians, we ar SPA developers!
            e.preventDefault();
            // Send the data to the REST api
            let result = await (await fetch('/api/event/', {
              method: ('POST'),
              body: JSON.stringify(formData),
              headers: { 'Content-Type': 'application/json' }
            })).json(); 
            setFormData({ done: true });
            return result;           
          }

        return(                
            <Form onSubmit={save}
            >
                <h1>NewEvent</h1>    
                <FormGroup>
                    <Label for="eventTitle">Title</Label>
                    <Input type="text" name="title" id="eventTitle" onChange={handleInputChange} value={title}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="eventDescription">Description</Label>
                    <Input type="textarea" name="description" id="eventDescription"  onChange={handleInputChange} value={description} 
                    />
                </FormGroup>
                <Label>Start:</Label>
                <Row>
                    <Col xs="12" lg="6">
                        <FormGroup>                            
                            <Input
                            type="date"
                            name="startdate"
                            id="eventStartDate"
                            placeholder="date placeholder"
                            format="yyyy/MM/dd"
                            //onChange={handleChangeStartDateTime} value={startdate}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup xs="12" lg="6">                            
                            <Input
                            type="time"
                            name="starttime"
                            id="eventStartTime"
                            placeholder="time placeholder"
                            //onChange={handleChangeStartDateTime} value={starttime}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Label>End:</Label>
                <Row>
                    <Col xs="12" lg="6">
                        <FormGroup>                            
                            <Input
                            type="date"
                            name="enddate"
                            id="eventEndDate"
                            placeholder="date placeholder"
                            //onChange={handleChangeEndDateTime} value={enddate}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup xs="12" lg="6">                            
                            <Input
                            type="time"
                            name="endtime"
                            id="eventEndTime"
                            placeholder="time placeholder"
                            //onChange={handleChangeEndDateTime} value={endtime}
                            />
                        </FormGroup>
                    </Col>                    
                </Row>
                <Button value="save">Submit</Button>
            </Form>
                
        );      
        }
export default NewEvent;