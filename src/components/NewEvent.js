import React, { useState, useContext } from "react";
import moment from "moment";
import { Context } from "../App";
import Select from "react-select";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";

const NewEvent = params => {
  const [formData, setFormData] = useState({});
  const [alert, setAlert] = useState(false); 
  const [invitesList, setinvitesList] = useState([]);
  const [context, updateContext] = useContext(Context);


  const userId = context.user.id;
  const usersData = context.allUsers.filter((u) => u.id !== userId);
  
  

  const handleInputChange = (e) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const options = usersData.map((user) => ({
    value: user.id,
    label: user.email,
  }));

  const handleInvites = (e) => {
    setinvitesList(e);
  };

  const cancel = () => {    
    updateContext({ showNewEvent: false });
  }

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


  const validate = () => {
    let isValid = true;

    if (start && stop !== undefined) {
      let startParse = Date.parse(start);
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
    

    if (validate()) {
      let result = await (
        await fetch("/api/Event", {
          method: "POST",
          body: JSON.stringify({ userId, title, description, start, stop }),
          headers: { "Content-Type": "application/json" },
        })
      ).json();

      //error msg handling
      if (result.error === 403) {
        setAlert("Sorry, the date and time interval you entered is invalid!");        
        return;
      } else if (result.error) {
        setAlert("You are not logged in ");        
        return;
      }

      if (!result.error && invitesList.length) {
        const eventId = result.lastInsertRowid;
        for (var i = 0; i < invitesList.length; i++) {
          const invitedUser = invitesList[i].value;
          let inviteresult = await (
            await fetch("/api/Invite", {
              method: "POST",
              body: JSON.stringify({ eventId, invitedUser }),
              headers: { "Content-Type": "application/json" },
            })
          ).json();
        }        
      }

      if(!result.error){
        let events = await (await fetch("/api/myEvents/" + userId)).json();        
        updateContext({ showNewEvent: false, myEvents: events });        
      }
      
      setinvitesList("");
      setFormData({
        title: "",
        description: "",
        startDate: "",
        stopDate: "",
        startTime: "",
        stopTime: "",
      });

      
      return result;
    }
  }

  

  return (
    <Form onSubmit={save}>
      <Breadcrumb>
        <BreadcrumbItem active>New Event</BreadcrumbItem>
      </Breadcrumb>
      <Alert
        color="danger"
        isOpen={alert}
        toggle={() => {
          setAlert(false);
        }}
      >
        {alert}
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
        />
      </FormGroup>
      <Row>
        <Col xs="12" lg="7">
          <FormGroup>
            <Label for="eventStartDate">Start Date:</Label>
            <Input
              type="date"
              min={new Date().toISOString().split("T")[0]}
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
              min={new Date().toISOString().split("T")[0]}
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
      <FormGroup>
      
        <Select  options={options} onChange={handleInvites} isMulti />
      </FormGroup>

      <Button color="danger" onClick={cancel}>
        Cancel
      </Button>

      <Button className="button-submit" type="submit" value="save">
        Submit
      </Button>
    </Form>
  );
};
export default NewEvent;
