import React, { useState, useContext } from "react";
import moment from "moment";
import { Context } from "../App";

import { Col, Row, Button, Form, FormGroup, Label, Input, Alert, Breadcrumb, BreadcrumbItem } from "reactstrap";

const NewEvent = () => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(false);
  const [context] = useContext(Context);

  const handleInputChange = (e) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  let {
    title,
    description,
    startDate,
    stopDate,
    startTime,
    stopTime,
  } = formData;

 
    const getStart = new Date(startDate + " " + startTime);
    const start = moment(getStart).format("YYYY-MM-DD HH:mm");
     
    const getStop = new Date(stopDate + " " + stopTime);
    const stop = moment(getStop).format("YYYY-MM-DD HH:mm");
    
   

  const userId = context.user.userId;
  
  

  const validate = () => {
    let isValid = true;

    if (start && stop  !== undefined) {
      console.log("start stop right")
      let startParse = Date.parse(start)
      let stopParse = Date.parse(stop);
      let diff = (stopParse - startParse) / 1000;
      
     if (!(diff >= 900 && diff < 604800)) {
        isValid = false;
        setAlert("Sorry, the date and time interval you entered is invalid!");
      }
    }

    return isValid;
  };

  async function save(e) {
    
      e.preventDefault();
      console.log(formData);
      
      if (validate()) {
      let result = await (
        await fetch("/api/Event", {
          method: "POST",
          body: JSON.stringify({ userId, title, description, start, stop }),
          
          headers: { "Content-Type": "application/json" },
        })
      ).json();

      console.log("body" , result.body)
      //error msg handling
      if (result.error === 403){
        setAlert("Sorry, the date and time interval you entered is invalid!");
        console.log("error" + result.error)
        return;
      } else if(result.error) {
        setAlert("You are not logged in ");
        console.log("error", result.error)
        return;
      }

      setFormData({ title: '',
        description: '',
        startDate: '',
        stopDate: '',
        startTime: '',
        stopTime:'' });

      console.log(result);
      return result;
    }
  }

  return (
    <Form onSubmit={save}>
       <Breadcrumb>
        <BreadcrumbItem active>New Event</BreadcrumbItem>
      </Breadcrumb>
        <Alert color="danger" isOpen={alert} 
        toggle={() => {
          setAlert(false);
        }}>{alert}
        </Alert>
      <FormGroup>
        <Label for="eventTitle" className="event_label">Title</Label>
        <Input
          type="text"
          name="title"
          id="eventTitle"          
          onChange={handleInputChange}
          value={title}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="eventDescription">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="eventDescription"
          onChange={handleInputChange}
          value={description}
          required
        />
      </FormGroup>      
      <Row>
        <Col xs="12" lg="7">          
          <FormGroup>
          <Label for="eventStartDate">Start Date:</Label>
            <Input
              type="date"
              name="startDate"
              id="eventStartDate"
              placeholder="date placeholder"
              format="yyyy/MM/dd"
              onChange={handleInputChange}
              value={startDate}
              required
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="5">
          <Label for="eventStartTime">Start Time:</Label>
            <Input
              type="time"
              name="startTime"
              id="eventStartTime"
              placeholder="time placeholder"
              onChange={handleInputChange}
              value={startTime}
              required
            />
          </FormGroup>
        </Col>
      </Row>      
      <Row>
        <Col xs="12" lg="7">
          <FormGroup>
          <Label for="eventEndDate">End Date:</Label>
            <Input
              type="date"
              name="stopDate"
              id="eventEndDate"
              placeholder="date placeholder"
              onChange={handleInputChange}
              value={stopDate}
              required
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="5">
          <Label for="eventEndTime">End Time:</Label>
            <Input
              type="time"
              name="stopTime"
              id="eventEndTime"
              placeholder="time placeholder"
              onChange={handleInputChange}
              value={stopTime}
              required
            />
          </FormGroup>
        </Col>
      </Row>
      <Button className="button-submit" type="submit" value="save">
        Submit
      </Button>
    </Form>
  );
};
export default NewEvent;
