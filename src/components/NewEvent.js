import React, { useState, useContext } from "react";
import moment from "moment";
import { Context } from "../App";

import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";

const NewEvent = () => {
  const [formData, setFormData] = useState({});
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
  const getStop = new Date(stopDate + " " + stopTime);

  const userId = context.user.userId;
  const start = moment(getStart).format("YYYY-MM-DD HH:mm");
  const stop = moment(getStop).format("YYYY-MM-DD HH:mm");

  async function save(e) {
    // the default behavior of a form submit is to reload the page
    // stop that - we are not barbarians, we ar SPA developers!
    e.preventDefault();
    console.log(formData);
    // Send the data to the REST api
    let result = await (
      await fetch("/api/Event", {
        method: "POST",
        body: JSON.stringify({ userId, title, description, start, stop }),
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
      <Label>Start:</Label>
      <Row>
        <Col xs="12" lg="6">
          <FormGroup>
            <Input
              type="date"
              name="startDate"
              id="eventStartDate"
              placeholder="date placeholder"
              format="yyyy/MM/dd"
              onChange={handleInputChange}
              value={startDate}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="6">
            <Input
              type="time"
              name="startTime"
              id="eventStartTime"
              placeholder="time placeholder"
              onChange={handleInputChange}
              value={startTime}
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
              name="stopDate"
              id="eventEndDate"
              placeholder="date placeholder"
              onChange={handleInputChange}
              value={stopDate}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup xs="12" lg="6">
            <Input
              type="time"
              name="stopTime"
              id="eventEndTime"
              placeholder="time placeholder"
              onChange={handleInputChange}
              value={stopTime}
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
