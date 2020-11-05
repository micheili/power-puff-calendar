import React, { useContext, useState, useEffect } from "react";
import {
  CardSubtitle,
  ButtonToggle,
  Button,
  UncontrolledTooltip,
  CardFooter,
  CardBody,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
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
import GuestList from "./GuestList";
import EditEvent from "./EditEvent";
import Select from "react-select";

export default function Event(props) {
  let {
    id,
    userId,
    inviteId,
    description,
    start,
    stop,
    className,
    name,
    ownerFirstName,
    ownerLastName,
  } = props.combinedEvents;

  let [context, updateContext] = useContext(Context);

  const loggedInUser = context.user.id;

  let userIsCreator = true;

  if (loggedInUser !== userId) {
    userIsCreator = false;
  }

  const editEvent = () => {
    updateContext({ showEditEvent: true });
  };

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
    //delete if it's your event
    if (loggedInUser === userId) {
      const deleteEvent = await (
        await fetch("/api/Event/" + id, {
          method: "DELETE",
        })
      ).json();
      fetchAndUpdate();
    } else {
      declineEvent();
    }
  }
  //decline if invited to event
  async function declineEvent() {
    let result = await (
      await fetch("/api/invite/" + inviteId, {
        method: "PUT",
        body: JSON.stringify({
          accepted: 0,
        }),
        headers: { "Content-Type": "application/json" },
      })
    ).json();
    console.log("FETCH & UPDATE IN DECLINE ");
    fetchAndUpdate();
  }

  async function fetchAndUpdate() {
    let events = await (await fetch("/api/myEvents/" + context.user.id)).json();
    if (events.error == 404) {
      events = [];
    }

    let invitedEvents = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=true")
    ).json();
    if (invitedEvents.error == 404) {
      invitedEvents = [];
    }

    let declinedInvitations = await (
      await fetch("/api/invitedEvents/" + context.user.id + "?accepted=false")
    ).json();
    if (declinedInvitations.error == 404) {
      declinedInvitations = [];
    }

    updateContext({
      myEvents: events,
      invitedEvents: invitedEvents,
      declinedInvitations: declinedInvitations,
    });
  }
  const [allGuestsAccept, setInvitedUsersAccept] = useState([]);
  const [inviteList, setInviteList] = useState([]);
  const [allGuests, setAllGuests] = useState([]);
  const [options, setOptions] = useState([]);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  async function fetchInvitedUsersAccepted() {
    let guest = await (
      await fetch("/api/invitedUsers/" + id + "?accepted=1")
    ).json();
    setInvitedUsersAccept(guest);
  }

  let usersData = context.allUsers.filter((u) => u.id !== context.user.id);
  //const [filteredUser, setFilteredUser] = useState(usersData);

  async function fetchAllInvited() {
    let allInvited = await (await fetch("/api/allInvited/" + id)).json();
    if (allInvited.error === 404) {
      allInvited = [];
    }
    setAllGuests(allInvited);
  }

  useEffect(() => {
    fetchInvitedUsersAccepted();
    fetchAllInvited();
  }, [id]);

  function openModal(e) {
    e.preventDefault();
    toggle();
    if (allGuests.length) {
      usersData = usersData.filter(
        (u) => !allGuests.find((a) => a.id === u.id)
      );
    }
    console.log("filtered", usersData);
    let o = usersData.map((u) => ({
      value: u.id,
      label: u.email,
    }));
    setOptions(o);
  }

  const handleInvites = (e) => {
    setInviteList(e);
  };

  async function invite(e) {
    e.preventDefault();
    if (inviteList.length) {
      for (let i in inviteList) {
        let invitedUser = inviteList[i].value;
        let res = await (
          await fetch("/api/Invite", {
            method: "POST",
            body: JSON.stringify({ eventId: id, invitedUser }),
            headers: { "Content-Type": "application/json" },
          })
        ).json();
      }
    }
    fetchAllInvited();
    toggle();
  }

  const getSuffix = (dateNr) => {
    let j = dateNr % 10,
      k = dateNr % 100;

    if (j == 1 && k != 11) {
      return dateNr + "st";
    }
    if (j == 2 && k != 12) {
      return dateNr + "nd";
    }
    if (j == 3 && k != 13) {
      return dateNr + "rd";
    }
    return dateNr + "th";
  };

  return (
    <div className="mb-3 pb-5 sm-6">
      {context.showEditEvent ? (
        <EditEvent editEvent={props.combinedEvents} />
      ) : (
        <div>
          <CardBody className="event-card-body">
            <CardSubtitle tag="h5">
              <span className="mr-1">
                <strong>Description:</strong>{" "}
              </span>
            </CardSubtitle>
            <CardSubtitle tag="h5" className="mt-1">
              {description}
            </CardSubtitle>
            <span className="mt-5 p-5"></span>
            <CardSubtitle className="mt-3 ">
              <strong>from</strong> {startTime} {weekDay},{" "}
              {getSuffix(startDateNr) + " of "} {startMonth} {startYear}
            </CardSubtitle>
            <CardSubtitle>
              <strong>to</strong> {stopTime}
              {startMoment.isBefore(stopMoment, "day")
                ? " " + stopWeekday + ", " + getSuffix(stopDateNr)
                : null}
              {startMoment.isSameOrAfter(stopMoment, "month")
                ? null
                : " of " + stopMonth + " "}
              {startMoment.isSameOrAfter(stopMoment, "year")
                ? null
                : +" " + stopYear}
            </CardSubtitle>
            <GuestList
              allGuestsAccept={allGuestsAccept}
              ownerFirstName={
                userIsCreator ? context.user.firstName : ownerFirstName
              }
              ownerLastName={
                userIsCreator ? context.user.lastName : ownerLastName
              }
            />
          </CardBody>

          <CardFooter className={`card-footer ${context.colorTheme}`}>
            {userIsCreator ? (
              <>
                <ButtonToggle
                  onClick={openModal}
                  outline
                  color="lightpink"
                  id="inviteButton"
                >
                  <FontAwesomeIcon className={`card-footer-icon ${context.colorTheme}`} icon={faUserPlus} />
                  {/* <Select options={options} onChange={handleInvites} isMulti /> */}
                  <UncontrolledTooltip placement="bottom" target="inviteButton">
                    Invite people
                  </UncontrolledTooltip>
                </ButtonToggle>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>
                    Select friends to invite
                  </ModalHeader>
                  <ModalBody>
                    <Select
                      className={`s ${context.colorTheme}`}
                      options={options}
                      onChange={handleInvites}
                      isMulti
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      className={`inv-btn ${context.colorTheme}`}
                      color="info"
                      onClick={invite}
                    >
                      Invite
                    </Button>{" "}
                  </ModalFooter>
                </Modal>
              </>
            ) : null}{" "}
            {userIsCreator ? (
              <Button
                outline
                color="lightpink"
                id="editButton"
                onClick={editEvent}
              >
                <FontAwesomeIcon className={`card-footer-icon ${context.colorTheme}`} icon={faPen} />
                <UncontrolledTooltip placement="bottom" target="editButton">
                  Edit
                </UncontrolledTooltip>
              </Button>
            ) : null}{" "}
            {/* onClick: Are you Sure? delete event from loggedInUsers calendar */}
            <Button
              onClick={(e) =>
                window.confirm("Are you sure you want to delete the event?") &&
                deleteEvent()
              }
              outline
              color="lightpink"
              id="deleteButton"
            >
              <FontAwesomeIcon className={`card-footer-icon ${context.colorTheme}`} icon={faTrashAlt} />
              <UncontrolledTooltip placement="bottom" target="deleteButton">
                Delete event
              </UncontrolledTooltip>
            </Button>{" "}
            <Badge
              pill
              className={`${
                className
                  ? `p-2 mt-1 float-right category-box ${className}`
                  : ""
              }`}
            >
              {name}
            </Badge>
          </CardFooter>
        </div>
      )}
    </div>
  );
}
