import React, {useEffect} from 'react';
import { Redirect} from 'react-router-dom';

    import {
      Col,
      Row,
      Form,
      FormGroup,
      Label,
      Input,
      Button,
    } from "reactstrap";


export default function MyInvite (props){
  let {id, inviteId, title, description, start, stop} = props;


  async function Decline() {
    let result = await(await fetch("/api/invite/" + inviteId,  {
        method: "PUT",
        body: JSON.stringify({
          accepted: 0,
        } 
        ),
        headers: { "Content-Type": "application/json" },
      }))
    .json();
    console.log('result and id ' , result, inviteId)
    
  };

  async function Accept() {
    let result = await(await fetch("/api/invite/" + inviteId,  {
      method: "PUT",
      body: JSON.stringify({
        accepted: 1,
      } 
      ),
      headers: { "Content-Type": "application/json" },
    }))
  .json();
  console.log('result and id ' , result, inviteId)
 
};
          return (
            <Form>
              <h3>{title}</h3>
              <FormGroup>
                <Label for="eventDescription"></Label>
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
                  placeholder="invited users"
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
                      placeholder={start}
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
                        placeholder={stop}
                        disabled
                        />
                    </FormGroup>
                </Col> 
              </Row>
              <Row>
                <Button onClick={Decline}  color="danger float-rightf mr-2">No, cant make it</Button>
                <Button onClick={Accept}  color="primary  float-right">Yes, count me in!</Button> 
              </Row>
            </Form>
    )
}