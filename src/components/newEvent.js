import React, { useState, useEffect } from "react";
import moment from "moment";

import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";

const NewEvent = () => {
  const [formData, setFormData] = useState({});
  let {
    title,
    description,
    start,
    stop,
    starttime,
    endtime,
    userId,
  } = formData;

  const handleInputChange = (e) =>
    setFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const startdateTime = new Date(start + " " + starttime);
  const endDateTime = new Date(stop + " " + endtime);

  const start = moment(startdateTime).format("YYYY-MM-DD HH:mm");
  const stop = moment(endDateTime).format("YYYY-MM-DD HH:mm");

  console.log("start: ", dateTimeStart, "  stop: ", dateTimeStop);

  async function save(e) {
    // the default behavior of a form submit is to reload the page
    // stop that - we are not barbarians, we ar SPA developers!
    e.preventDefault();
    console.log(formData);
    // Send the data to the REST api
    let result = await (
      await fetch("/api/Event", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    setFormData({ done: true });
    console.log(result);
    return result;
  }

  return (
    <Form onSubmit={save}>
      <h1>NewEvent</h1>
      <FormGroup>
        <Label for="eventTitle">Title</Label>
        <Input
          type="text"
          name="title"
          id="eventTitle"
          onChange={handleInputChange}
          value={title}
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
      <FormGroup>
        <Label for="eventUserId">UserId</Label>
        <Input
          type="tex"
          name="userId"
          id="eventUserId"
          onChange={handleInputChange}
          value={userId}
        />
      </FormGroup>
      <Label>Start:</Label>
      <Row>
        <Col xs="12" lg="6">
          <FormGroup>
            <Input
              type="date"
              name="start"
              id="eventStartDate"
              placeholder="date placeholder"
              format="yyyy/MM/dd"
              onChange={handleInputChange}
              value={start}
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
              onChange={handleInputChange}
              value={starttime}
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
              name="stop"
              id="eventEndDate"
              placeholder="date placeholder"
              onChange={handleInputChange}
              value={stop}
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
              onChange={handleInputChange}
              value={endtime}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" value="save">
        Submit
      </Button>
    </Form>
  );
};
export default NewEvent;
