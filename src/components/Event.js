import React from "react";
import {
  CardTitle,
  CardSubtitle,
  ButtonToggle,
  Button,
  CardText,
  UncontrolledTooltip,
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

  return (
    <div className="sm-6">
      <CardTitle tag="h3">{title}</CardTitle>
      <CardSubtitle tag="h5">{description}</CardSubtitle>
      <CardSubtitle className="mt-3">
        from {startTime} {weekDay}, {startDateNr} {startMonth} {startYear}
      </CardSubtitle>
      <CardSubtitle>
        to {stopTime}
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
      <div className="float-right">
        <ButtonToggle outline color="lightpink" id="inviteButton">
          <FontAwesomeIcon icon={faUserPlus} />
          <UncontrolledTooltip placement="bottom" target="inviteButton">
            Invite people
          </UncontrolledTooltip>
        </ButtonToggle>{" "}
        {/* edit if userId is mine, I created event */}
        <ButtonToggle outline color="lightpink" id="editButton">
          <FontAwesomeIcon icon={faPen} />
          <UncontrolledTooltip placement="bottom" target="editButton">
            Edit
          </UncontrolledTooltip>
        </ButtonToggle>{" "}
        {/* onClick: Are you Sure? delete event from loggedInUsers calendar */}
        <Button outline color="lightpink" id="deleteButton">
          <FontAwesomeIcon icon={faTrashAlt} />
          <UncontrolledTooltip placement="bottom" target="deleteButton">
            Delete event
          </UncontrolledTooltip>
        </Button>{" "}
      </div>
    </div>
  );
}
