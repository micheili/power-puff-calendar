import React, { useContext } from "react";
import {
  CardTitle,
  CardSubtitle,
  ButtonToggle,
  Button,
  CardText,
  UncontrolledTooltip, CardFooter, CardBody
} from "reactstrap";
import moment from "moment";
import {
  getDayWithoutZero,
  getReadableWeekday,
  getReadableMonth,
  getYear,
} from "../calendar/utils/MomentUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "../App";

export default function Event(props) {
 
  let { id, userId, title, description, start, stop } = props.combinedEvents;

  console.log('I EVENT ', props.combinedEvents);
  
  let [context, updateContext] = useContext(Context);

  const loggedInUser = context.user.id;

  if (!loggedInUser === userId) {
    //hide buttons for edit & invite
  }
  
  let startMoment = moment(start);
  let stopMoment = moment(stop);

  let startTime = start.split(" ")[1];
  let weekDay = getReadableWeekday(start);
  let startDateNr = getDayWithoutZero(start);
  let startMonth = getReadableMonth(start);
  let startYear = getYear(start);

  let stopTime = stop.split(" ")[1];
  let stopDateNr = getDayWithoutZero(stop);
  let stopMonth = getReadableMonth(stop);
  let stopWeekday = getReadableWeekday(stop);
  let stopYear = getYear(stop);

  async function deleteEvent() {
    const deleteInvitations = await (
      await fetch("/api/delete_invitations/" + id, {
        method: "DELETE",
      })
    ).json();
    console.log("delete from Invite: ", deleteInvitations);

    const deleteEvent = await (
      await fetch("/api/Event/" + id, {
        method: "DELETE",
      })
    ).json();
    console.log("delete from Event: ", deleteEvent);

    //if you're not creator of event
    //and you delete the event you're invited for
    //put -> accepted: false

    let events = await (await fetch("/api/myEvents/" + context.user.id)).json();
    if (events.error) {
      events = [];
    }

    let invitedEvents = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=true")
    ).json();
    if (invitedEvents.error) {
      invitedEvents = [];
    }

    let declinedInvitations = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=false")
    ).json();
    if (declinedInvitations.error) {
      declinedInvitations = [];
    }

    updateContext({
      myEvents: events,
      invitedEvents: invitedEvents,
      declinedInvitations: declinedInvitations
    });
  }

  return (
    <div className="mb-3 pb-5 sm-6"> 
      <CardBody className="event-card-body">
      <CardSubtitle tag="h5"><span className="mr-1"><strong>Description:</strong> </span></CardSubtitle>
      <CardSubtitle tag="h5" className="mt-1">{description}</CardSubtitle>
      <span className="mt-5 p-5"></span>
      <CardSubtitle className="mt-3 ">
       <strong>from</strong> {startTime} {weekDay}, {startDateNr} {startMonth} {startYear}
      </CardSubtitle>
      <CardSubtitle>
        <strong>to</strong> {stopTime}
        {startMoment.isSameOrAfter(stopMoment)
          ? null
          : " " + stopWeekday + ", " + stopDateNr}
        {startMoment.isSameOrAfter(stopMoment, "month")
          ? null
          : " " + stopMonth + " "}
        {startMoment.isSameOrAfter(stopMoment, "year") ? null : +" " + stopYear}
      </CardSubtitle>
      <CardText>{/** invitees **/}</CardText>
      {/* show if userId is mine, I created the event */}
      </CardBody>
      <CardFooter>      
        {loggedInUser === userId ? <ButtonToggle outline color="lightpink" id="inviteButton">
          <FontAwesomeIcon icon={faUserPlus} />
          <UncontrolledTooltip placement="bottom" target="inviteButton">
            Invite people
          </UncontrolledTooltip>
        </ButtonToggle>: null}{" "}
        {/* edit if userId is mine, I created event */}
        {loggedInUser === userId ? <ButtonToggle outline color="lightpink" id="editButton">
          <FontAwesomeIcon icon={faPen} />
          <UncontrolledTooltip placement="bottom" target="editButton">
            Edit
          </UncontrolledTooltip>
        </ButtonToggle>
          : null}{" "}
        {/* onClick: Are you Sure? delete event from loggedInUsers calendar */}
        <Button
          onClick={deleteEvent}
          outline          
          color="lightpink"
          id="deleteButton"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          <UncontrolledTooltip placement="bottom" target="deleteButton">
            Delete event
          </UncontrolledTooltip>
        </Button>{" "}
        
      </CardFooter>
    </div>
  );
}
