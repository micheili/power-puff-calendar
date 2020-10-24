import React from 'react';
    import {
      Col,
      Row,
      Form,
      FormGroup,
      Label,
      Input,
      Button
    } from "reactstrap";

export default function MyInvite (props){
    let {eventId, title, description, start, stop} = props
          return (
            <Form>
              <h3>{title}</h3>
              <FormGroup>
                <Label for="eventDescription">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="eventDescription"
                  disabled
                  placeholder={description}
                />
              </FormGroup>
              <FormGroup>
                <Label for="eventUserId">Going</Label>
                <Input
                  type="text"
                  name="userId"
                  id="eventUserId"
                  disabled
                />
              </FormGroup>
              <Label>Start:</Label>
              <Row>
                <Col xs="12" lg="12">
                  <FormGroup xs="12" lg="12">
                    <Input
                      type="text"
                      name="startTime"
                      id="eventStartTime"
                      placeholder="time placeholder"
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" lg="12">
                    <Label>End:</Label>
                    <FormGroup xs="12" lg="12">
                        <Input
                        type="text"
                        name="stopTime"
                        id="eventEndTime"
                        placeholder="time placeholder"
                        disabled
                        />
                    </FormGroup>
                </Col> 
              </Row>
              <Row>
                <Button color="danger float-rightf mr-2">No, cant make it</Button>
                <Button color="primary  float-right">Yes, count me in!</Button> 
              </Row>
            </Form>
    )
}