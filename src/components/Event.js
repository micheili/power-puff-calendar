import React from "react";
import {
  CardTitle,
  CardSubtitle,
  ButtonToggle,
  Button,
  CardText,
  Alert,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";

export default function Event(props) {
  //let { id, title, eventCreator, description, start, stop } = props;

  // if (invitedGuests === 0) {
  //   showInviteButton()
  // }

  // let loggedInUser;

  // let hostName;
  // if (eventCreator !== loggedInUser) {
  //   hostName = <p>{eventCreator}</p>;
  // }

  //gör fetch från en view eller invite?
  // async function fetchInvitees() {
  //   const data = await fetch('api/invite' + id);  men eventId?
  //   setInvitees(await data.json());

  // if (invitedPeople > 0) {
  //   //skapa en komponent med en lista
  //   //på invited people som visar accepted-status
  //   invitees = <InvitedList key="" />;
  // } else {
  //   invitees = null;
  // }
  let { title, description, start, stop } = props.myEvent;

  return (
    <div className="sm-6">
      <CardTitle>{title}</CardTitle>
      <CardSubtitle>{description}</CardSubtitle>
      <CardSubtitle>Starts: {start}</CardSubtitle>
      <CardSubtitle>Ends: {stop}</CardSubtitle>
      <CardText>{/** invitees **/}</CardText>
      {/* show if userId is mine, I created the event */}
      <ButtonToggle color="primary">Invite</ButtonToggle>{" "}
      {/* edit if userId is mine, I created event */}
      <ButtonToggle color="secondary">Edit</ButtonToggle>{" "}
      {/* onClick: Are you Sure? delete event from loggedInUsers calendar */}
      <Button outline color="primary">
        Delete
      </Button>{" "}
      <hr></hr>
      <div className="p-3 bg-success my-2 rounded">
        <Toast>
          <ToastHeader>I am invited for:</ToastHeader>
          <ToastBody>
            {props.invitedEvents.map((event) => (
              <Alert key={event.id}>{event.title}</Alert>
            ))}
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}
