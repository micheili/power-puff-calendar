import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { CardText } from "reactstrap";

export default function GuestList(props) {
  const [allGuestsAccept, setInvitedUsersAccept] = useState([]);

  useEffect(() => {
    fetchInvitedUsersAccepted();
  }, []);

  async function fetchInvitedUsersAccepted() {
    setInvitedUsersAccept(
      await (await fetch("api/invitedUsers/" + props.id + "?accepted=1")).json()
    );
  }

  return (
    <div className="mt-3">
      <CardText>{allGuestsAccept.length} attending: </CardText>
      {allGuestsAccept.length > 0 ? (
        allGuestsAccept.map((guestAccept) => (
          <CardText key={guestAccept.id}>
            <FontAwesomeIcon icon={faCheck} /> {guestAccept.firstName}{" "}
            {guestAccept.lastName}
          </CardText>
        ))
      ) : (
        <p>No one has accepted yet</p>
      )}
    </div>
  );
}
