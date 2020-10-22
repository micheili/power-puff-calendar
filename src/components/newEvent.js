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
        
           
            let { title, description, userId, startDate, startTime, stopDate, stopTime } = formData;

            

            let startdate = startDate;
            let starttime = startTime;
            let stopdate = stopDate;
            let stoptime = stopTime;

           

            const dateTimeStart = moment(startdate + ' ' + starttime);
            const dateTimeStop = moment(stopdate + ' ' + stoptime);
            
            const start = dateTimeStart.format('YYYY-MM-DD HH:mm')
            const stop = dateTimeStop.format('YYYY-MM-DD HH:mm')

            console.log("start: " + start);
            console.log("stop: " + stop);

            console.log(formData); 

          async function save(e) { 
            // the default behavior of a form submit is to reload the page
            // stop that - we are not barbarians, we ar SPA developers!
            e.preventDefault();
            console.log(formData);
            // Send the data to the REST api
            let result = await (await fetch('/api/Event', {
              method: 'POST',
              body: JSON.stringify({title, description, start, stop, userId }),
              headers: { 'Content-Type': 'application/json' }
            })).json(); 
            setFormData({ done: true });
            console.log(result);
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
                <FormGroup>
                    <Label for="eventUserId">UserId</Label>
                    <Input type="tex" name="userId" id="eventUserId"  onChange={handleInputChange} value={userId} 
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
                            onChange={handleInputChange} value={startDate}                     
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
                            onChange={handleInputChange} value={startTime}   
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
                            name="stopdate"
                            id="eventEndDate"
                            placeholder="date placeholder"
                            onChange={handleInputChange}
                            value= {stopDate}                            
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup xs="12" lg="6">                            
                            <Input
                            type="time"
                            name="stoptime"
                            id="eventEndTime"                            
                            placeholder="time placeholder"    
                            onChange={handleInputChange} value={stopTime}                            
                            />
                        </FormGroup>
                    </Col>                    
                </Row>
                <Button type="submit" value="save">Submit</Button>
            </Form>
                
        );      
        }
export default NewEvent;